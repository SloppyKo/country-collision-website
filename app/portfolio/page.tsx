import type { Metadata } from "next";
import Image from "next/image";
import ContactButton from "@/components/ContactButton";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Auto Body & Paint Work in Hanford, CA | Country Collision",
  description:
    "Before-and-after collision repair, paint matching, and restoration work from Hanford, CA, including a totaled Dodge Cummins rebuild and a Ford Bronco color match.",
};

const projects = [
  {
    title: "Ford Bronco Paint Matching",
    tags: ["Paint Matching", "Car Painting", "Body Work"],
    description:
      "Full paint color match on a 6th-gen Ford Bronco, from bodywork prep to final finish.",
    layout: "single" as const,
    image: {
      label: "6th-gen Ford Bronco paint color match",
      imageSrc: "/images/bronco/collage.JPG",
    },
  },
  {
    title: "Totaled Dodge Cummins Collision Repair & Restoration",
    tags: ["Collision Repair", "Auto Restoration", "Custom Paint"],
    description:
      "Brought a totaled 2nd-gen Dodge Cummins back to life with collision repair, a ground-up restoration, and a custom build.",
    layout: "collage" as const,
    galleries: [
      {
        title: "Totaled",
        items: [
          {
            label: "Totaled 2nd-gen Dodge Cummins before collision repair",
            imageSrc: "/images/dodge restoration/dodge wrecked.PNG",
          },
        ],
      },
      {
        title: "Prep",
        items: [
          {
            label: "Dodge Cummins body and paint prep, photo 1",
            imageSrc: "/images/dodge restoration/dodge restoration  3.png",
          },
          {
            label: "Dodge Cummins body and paint prep, photo 2",
            imageSrc: "/images/dodge restoration/dodge restoration  4.png",
          },
          {
            label: "Dodge Cummins body and paint prep, photo 3",
            imageSrc: "/images/dodge restoration/dodge restoration  2.png",
          },
          {
            label: "Dodge Cummins body and paint prep, photo 4",
            imageSrc: "/images/dodge restoration/dodge restoration  5.png",
          },
          {
            label: "Dodge Cummins body and paint prep, photo 5",
            imageSrc: "/images/dodge restoration/dodge restoration  1.png",
          },
        ],
      },
      {
        title: "Restored",
        items: [
          {
            label: "Restored Dodge Cummins with custom paint, photo 1",
            imageSrc: "/images/dodge restoration/dodge final 1.jpeg",
          },
          {
            label: "Restored Dodge Cummins with custom paint, photo 2",
            imageSrc: "/images/dodge restoration/dodge final 2.png",
          },
        ],
      },
    ],
  },
  {
    title: "1963 Chevy Impala Rust Repair & Repaint",
    tags: ["Rust Repair", "Bumper Repair", "Car Painting"],
    description:
      "Repaired a damaged bumper and rusted quarter panels, added a custom antenna, and repainted a classic 1963 Chevy Impala.",
    layout: "collage" as const,
    galleries: [
      {
        title: "Bumper/Rust Repair",
        items: [
          {
            label: "1963 Chevy Impala bumper and rust repair",
            videoSrc: "/images/impala/impala bumper prep.mp4",
            posterSrc: "/images/impala/impala bumper prep_poster.jpg",
          },
        ],
      },
      {
        title: "Antenna Prep",
        items: [
          {
            label: "1963 Chevy Impala custom antenna prep",
            videoSrc: "/images/impala/impala atenna prep.mp4",
            posterSrc: "/images/impala/impala atenna prep_poster.jpg",
          },
        ],
      },
      {
        title: "Restored",
        items: [
          {
            label: "Restored 1963 Chevy Impala bumper after repaint",
            videoSrc: "/images/impala/impala bumper final.mp4",
            posterSrc: "/images/impala/impala bumper final_poster.jpg",
          },
        ],
      },
    ],
  },
  {
    title: "1989 Chevy OBS, Peterbilt & Trailer Paint Matching",
    tags: ["Paint Matching", "Truck Painting", "Rust Repair"],
    description:
      "Minor body work and restored the original baby blue paint on a 1989 Chevy OBS short bed pickup, plus color-matched custom paint on a Peterbilt semi-truck and trailer.",
    layout: "collage" as const,
    galleries: [
      {
        title: "OBS Before",
        items: [
          {
            label: "1989 Chevy OBS pickup before paint restoration",
            videoSrc: "/images/obs repaint/OBS before_square.mp4",
            posterSrc: "/images/obs repaint/OBS before_square_poster.jpg",
          },
        ],
      },
      {
        title: "OBS Prep",
        items: [
          {
            label: "1989 Chevy OBS pickup body and paint prep",
            videoSrc: "/images/obs repaint/OBS prep_square.mp4",
            posterSrc: "/images/obs repaint/OBS prep_square_poster.jpg",
          },
        ],
      },
      {
        title: "OBS Restored",
        items: [
          {
            label: "1989 Chevy OBS pickup restored in original baby blue",
            videoSrc: "/images/obs repaint/OBS final_square.mp4",
            posterSrc: "/images/obs repaint/OBS final_square_poster.jpg",
          },
        ],
      },
    ],
    imageRowTitle: "OBS, Peterbilt, & Trailer Fully Restored",
    imageRow: [
      {
        label: "Peterbilt semi-truck with color-matched custom paint",
        imageSrc: "/images/obs repaint/peterbilt full.jpg",
      },
      {
        label: "Restored 1989 Chevy OBS on color-matched trailer",
        imageSrc: "/images/obs repaint/OBS on trailer.jpg",
      },
      {
        label: "Peterbilt semi-truck custom paint, side view",
        imageSrc: "/images/obs repaint/peterbilt side.jpg",
      },
      {
        label: "Restored 1989 Chevy OBS pickup, side view",
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
            Auto Body & Paint Projects in Hanford
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
