import ImagePlaceholder from "./ImagePlaceholder";
import MediaViewer from "./MediaViewer";

type MediaItem = {
  label: string;
  imageSrc?: string;
  videoSrc?: string;
  posterSrc?: string;
};

type Gallery = { title: string; items: MediaItem[] };

type ProjectCardProps = {
  title: string;
  tags: string[];
  description: string;
  media?: MediaItem[];
  galleries?: Gallery[];
  layout?: "carousel" | "grid" | "collage";
};

export default function ProjectCard({
  title,
  tags,
  description,
  media = [],
  galleries = [],
  layout = "carousel",
}: ProjectCardProps) {
  return (
    <article className="rounded-lg border border-border bg-surface p-6">
      <h3 className="font-heading text-2xl text-foreground">{title}</h3>
      <p className="mt-1 font-body text-xs text-muted">{tags.join(" | ")}</p>
      <p className="mt-3 max-w-2xl font-body text-base text-muted">
        {description}
      </p>

      {layout === "collage" ? (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {galleries.map((gallery) => (
            <div key={gallery.title}>
              <h4 className="font-heading text-lg text-foreground">
                {gallery.title}
              </h4>
              {gallery.items.length > 0 ? (
                <MediaViewer
                  items={gallery.items}
                  className="mt-2 h-72 w-full md:h-96"
                />
              ) : (
                <div className="mt-2 flex h-72 w-full items-center justify-center rounded-lg border border-dashed border-border md:h-96">
                  <span className="font-body text-sm text-muted">
                    Coming soon!
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : layout === "grid" ? (
        <div className="mt-6 grid grid-cols-3 gap-2">
          {media.map((item) => (
            <ImagePlaceholder
              key={item.label}
              label={item.label}
              className="h-40 w-full md:h-64"
            />
          ))}
        </div>
      ) : (
        <MediaViewer items={media} className="mt-6 h-64 w-full md:h-96" />
      )}
    </article>
  );
}
