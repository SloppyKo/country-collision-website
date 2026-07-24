import type { Metadata } from "next";
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
    title: "OBS Chevy Paint Job",
    tags: ["Custom Paint", "Rust Repair", "Color matching"],
    description:
      "Minor body work and restored the orignal baby blue paint on a 1989 Chevy OBS short bed pickup truck.",
    layout: "collage" as const,
    galleries: [
      {
        title: "Before",
        items: [
          {
            label: "OBS before",
            videoSrc: "/images/obs repaint/OBS before_square.mp4",
            posterSrc: "/images/obs repaint/OBS before_square_poster.jpg",
          },
        ],
      },
      {
        title: "Prep",
        items: [
          {
            label: "OBS prep",
            videoSrc: "/images/obs repaint/OBS prep_square.mp4",
            posterSrc: "/images/obs repaint/OBS prep_square_poster.jpg",
          },
        ],
      },
      {
        title: "Restored",
        items: [
          {
            label: "OBS final",
            videoSrc: "/images/obs repaint/OBS final_square.mp4",
            posterSrc: "/images/obs repaint/OBS final_square_poster.jpg",
          },
        ],
      },
    ],
  },
];

export default function Portfolio() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-16">
        <h1 className="font-heading text-3xl text-foreground md:text-5xl">
          Featured Work
        </h1>
        <p className="mt-3 max-w-2xl font-body text-base text-muted">
          Our most memorable bodywork, custom paint, and restoration projects
          from Country Collision in Hanford, California.
        </p>

        <div className="mt-16 flex flex-col gap-20">
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
