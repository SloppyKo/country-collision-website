// Recompresses everything in public/images in place: downsizes oversized
// photos and re-encodes jpg/png/mp4 at a web-friendly quality. Originals are
// copied into .media-backups/ (untouched by Next.js and not served) before
// any file is overwritten, since this project has no git history to fall
// back on. Run with --dry-run to preview without writing anything.

import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const MEDIA_DIR = path.join(ROOT, "public", "images");
const BACKUP_DIR = path.join(ROOT, ".media-backups");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png"]);
const VIDEO_EXT = new Set([".mp4"]);

const IMAGE_MAX_DIMENSION = 2560;
const IMAGE_MIN_SIZE_BYTES = 200 * 1024;
const JPEG_QUALITY = 85;

const VIDEO_MAX_WIDTH = 1280;
const VIDEO_MIN_SIZE_BYTES = 400 * 1024;
const VIDEO_CRF = 26;

const MIN_SAVINGS_RATIO = 0.05;

const DRY_RUN = process.argv.includes("--dry-run");

async function* walk(dir) {
  for (const entry of await fsp.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

async function backup(file, contents) {
  const rel = path.relative(MEDIA_DIR, file);
  const dest = path.join(BACKUP_DIR, rel);
  if (fs.existsSync(dest)) return;
  await fsp.mkdir(path.dirname(dest), { recursive: true });
  if (contents) {
    await fsp.writeFile(dest, contents);
  } else {
    await fsp.copyFile(file, dest);
  }
}

function fmtKB(bytes) {
  return `${(bytes / 1024).toFixed(0)}KB`;
}

async function compressImage(file) {
  const stat = await fsp.stat(file);
  if (stat.size < IMAGE_MIN_SIZE_BYTES) return null;

  // Read into memory first: on Windows, sharp can keep the source file
  // handle open after reading from a path, which blocks writing the
  // compressed result back to that same path.
  const input = await fsp.readFile(file);

  const ext = path.extname(file).toLowerCase();
  const meta = await sharp(input, { failOn: "none" }).metadata();
  const needsResize =
    (meta.width ?? 0) > IMAGE_MAX_DIMENSION ||
    (meta.height ?? 0) > IMAGE_MAX_DIMENSION;

  let pipeline = sharp(input, { failOn: "none" }).rotate();
  if (needsResize) {
    pipeline = pipeline.resize({
      width: IMAGE_MAX_DIMENSION,
      height: IMAGE_MAX_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  if (ext === ".jpg" || ext === ".jpeg") {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  } else {
    pipeline = pipeline.png({ compressionLevel: 9, effort: 10 });
  }

  const buffer = await pipeline.toBuffer();
  if (buffer.length >= stat.size * (1 - MIN_SAVINGS_RATIO)) return null;

  if (!DRY_RUN) {
    await backup(file, input);
    await fsp.writeFile(file, buffer);
  }
  return { before: stat.size, after: buffer.length };
}

function probeWidth(file) {
  const out = execFileSync(
    "ffprobe",
    [
      "-v", "error",
      "-select_streams", "v:0",
      "-show_entries", "stream=width",
      "-of", "csv=p=0",
      file,
    ],
    { encoding: "utf8" }
  ).trim();
  return Number(out) || 0;
}

async function compressVideo(file) {
  const stat = await fsp.stat(file);
  if (stat.size < VIDEO_MIN_SIZE_BYTES) return null;

  const width = probeWidth(file);
  const tempOut = `${file}.tmp.mp4`;

  const args = ["-y", "-i", file];
  if (width > VIDEO_MAX_WIDTH) {
    args.push("-vf", `scale='min(${VIDEO_MAX_WIDTH},iw)':-2`);
  }
  args.push(
    "-c:v", "libx264",
    "-crf", String(VIDEO_CRF),
    "-preset", "medium",
    "-c:a", "aac",
    "-b:a", "96k",
    "-movflags", "+faststart",
    tempOut
  );

  execFileSync("ffmpeg", args, { stdio: "ignore" });

  const newStat = await fsp.stat(tempOut);
  if (newStat.size >= stat.size * (1 - MIN_SAVINGS_RATIO)) {
    await fsp.unlink(tempOut);
    return null;
  }

  if (DRY_RUN) {
    await fsp.unlink(tempOut);
  } else {
    await backup(file);
    await fsp.rm(file);
    await fsp.rename(tempOut, file);
  }
  return { before: stat.size, after: newStat.size };
}

async function main() {
  if (!fs.existsSync(MEDIA_DIR)) {
    console.error(`No such directory: ${MEDIA_DIR}`);
    process.exit(1);
  }

  let totalBefore = 0;
  let totalAfter = 0;
  let changed = 0;

  for await (const file of walk(MEDIA_DIR)) {
    const ext = path.extname(file).toLowerCase();
    let result = null;

    try {
      if (IMAGE_EXT.has(ext)) {
        result = await compressImage(file);
      } else if (VIDEO_EXT.has(ext)) {
        result = await compressVideo(file);
      }
    } catch (err) {
      console.error(`skip (error): ${path.relative(ROOT, file)} — ${err.message}`);
      continue;
    }

    if (result) {
      changed++;
      totalBefore += result.before;
      totalAfter += result.after;
      const pct = (100 * (1 - result.after / result.before)).toFixed(0);
      console.log(
        `${DRY_RUN ? "[dry-run] " : ""}${path.relative(ROOT, file)}: ${fmtKB(
          result.before
        )} -> ${fmtKB(result.after)} (-${pct}%)`
      );
    }
  }

  console.log(
    `\n${changed} file(s) ${DRY_RUN ? "would be" : ""} compressed. ${fmtKB(
      totalBefore
    )} -> ${fmtKB(totalAfter)} total${
      totalBefore ? ` (-${(100 * (1 - totalAfter / totalBefore)).toFixed(0)}%)` : ""
    }.`
  );
  if (!DRY_RUN && changed > 0) {
    console.log(`Originals backed up under ${path.relative(ROOT, BACKUP_DIR)}/`);
  }
}

main();
