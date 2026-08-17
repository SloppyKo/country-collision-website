import type { Metadata } from "next";
import Image from "next/image";
import ContactButton from "@/components/ContactButton";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Portfolio — Country Collision | Hanford, CA",
  description:
    "See our collision repair, custom paint, and restoration work from Country Collision in Hanford, California.",
};

const projects = [
  {
    title: "Dodge Cummins Full Restoration",
    tags: ["Custom Paint", "Body Work", "Color Matching"],
    description: "Brought a totaled second gen Dodge Cummins back to life with a ground up restoration and custom build.",
    layout: "collage" as const,
    galleries: [
      {
        title: "Totaled",
        items: [
          {
            label: "dodge wrecked",
            imageSrc: "/images/dodge restoration/dodge wrecked.PNG",
          },
        ],
      },
      {
        title: "Prep",
        items: [
          {
            label: "dodge restoration 3",
            imageSrc: "/images/dodge restoration/dodge restoration  3.png",
          },
          {
            label: "dodge restoration 4",
            imageSrc: "/images/dodge restoration/dodge restoration  4.png",
          },
          {
            label: "dodge restoration 2",
            imageSrc: "/images/dodge restoration/dodge restoration  2.png",
          },
          {
            label: "dodge restoration 5",
            imageSrc: "/images/dodge restoration/dodge restoration  5.png",
          },
          {
            label: "dodge restoration 1",
            imageSrc: "/images/dodge restoration/dodge restoration  1.png",
          },
        ],
      },
      {
        title: "Restored",
        items: [
          {
            label: "dodge final 1",
            imageSrc: "/images/dodge restoration/dodge final 1.jpeg",
          },
          {
            label: "dodge final 2",
            imageSrc: "/images/dodge restoration/dodge final 2.png",
          },
        ],
      },
    ],
  },
  {
    title: "Chevy Impala Restoration + Paint Refresh",
    tags: ["Custom Paint", "Rust Restoration", "Body Work"],
    description:
      "Repaired a busted bumper and rusted quarter panels, added a custom antenna, and repainated a 1963 Chevy Impala.",
    layout: "collage" as const,
    galleries: [
      {
        title: "Bumper/Rust Repair",
        items: [
          {
            label: "impala bumper prep",
            videoSrc: "/images/impala/impala bumper prep.mp4",
            posterSrc: "/images/impala/impala bumper prep_poster.jpg",
          },
        ],
      },
      {
        title: "Antenna Prep",
        items: [
          {
            label: "impala antenna prep",
            videoSrc: "/images/impala/impala atenna prep.mp4",
            posterSrc: "/images/impala/impala atenna prep_poster.jpg",
          },
        ],
      },
      {
        title: "Restored",
        items: [
          {
            label: "impala bumper final",
            videoSrc: "/images/impala/impala bumper final.mp4",
            posterSrc: "/images/impala/impala bumper final_poster.jpg",
          },
        ],
      },
    ],
  },
  {
    title: "OBS Chevy, Peterbilt, and Trailer Paint Job",
    tags: ["Custom Paint", "Rust Repair", "Color matching"],
    description:
      "Minor body work and restored the orignal baby blue paint on a 1989 Chevy OBS short bed pickup truck + colormatched custom paint on Peterbilt semi-truck and trailer.",
    layout: "collage" as const,
    galleries: [
      {
        title: "OBS Before",
        items: [
          {
            label: "OBS before",
            videoSrc: "/images/obs repaint/OBS before_square.mp4",
            posterSrc: "/images/obs repaint/OBS before_square_poster.jpg",
          },
        ],
      },
      {
        title: "OBS Prep",
        items: [
          {
            label: "OBS prep",
            videoSrc: "/images/obs repaint/OBS prep_square.mp4",
            posterSrc: "/images/obs repaint/OBS prep_square_poster.jpg",
          },
        ],
      },
      {
        title: "OBS Restored",
        items: [
          {
            label: "OBS final",
            videoSrc: "/images/obs repaint/OBS final_square.mp4",
            posterSrc: "/images/obs repaint/OBS final_square_poster.jpg",
          },
        ],
      },
    ],
    imageRowTitle: "OBS, Peterbilt, & Trailer Fully Restored",
    imageRow: [
      {
        label: "peterbilt full",
        imageSrc: "/images/obs repaint/peterbilt full.jpg",
      },
      {
        label: "OBS on trailer",
        imageSrc: "/images/obs repaint/OBS on trailer.jpg",
      },
      {
        label: "peterbilt side",
        imageSrc: "/images/obs repaint/peterbilt side.jpg",
      },
      {
        label: "OBS side",
        imageSrc: "/images/obs repaint/OBS side.jpg",
      },
    ],
  },
];

export default function Portfolio() {
  return (
    <>
      <section className="relative h-[380px] overflow-hidden md:h-[480px]">
        <Image
          src="/images/auto-restoration.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-background" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-16">
          <h1 className="font-heading text-3xl text-white md:text-5xl">
            Featured Work
          </h1>
          <p className="mt-3 max-w-2xl font-body text-base text-white/80">
            Our most memorable bodywork, custom paint, and restoration projects
            from Country Collision in Hanford, California.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-16">
        <div className="flex flex-col gap-20">
          {projects.map((project, i) => (
            <ProjectCard key={`${project.title}-${i}`} {...project} />
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <ContactButton
            label="Contact Us!"
            variant="primary"
            className="px-10 py-5 text-xl"
          />
        </div>
      </section>
    </>
  );
}
