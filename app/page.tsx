import Image from "next/image";
import Button from "@/components/Button";
import ContactButton from "@/components/ContactButton";
import LogoReveal from "@/components/LogoReveal";
import ServiceRow from "@/components/ServiceRow";

const services = [
  {
    title: "Collision Repair & Body Work",
    description:
      "From dents and scratches to collision damage, Country Collision restores body lines, panels, and hard to reach components.",
    imageLabel: "white truck body work.png",
    imageSrc: "/images/white truck body work.png",
  },
  {
    title: "Custom Paint & Paint Repair",
    description: "Clean paintwork, accurate matching, and custom finishes.",
    imageLabel: "meyers max paint.png",
    imageSrc: "/images/meyers max paint.png",
  },
  {
    title: "Auto Restoration & Custom Builds",
    description:
      "Restoration and custom build work focused on bringing your vehicle back to life.",
    imageLabel: "truck bed.png",
    imageSrc: "/images/truck bed/truck bed.png",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <video
          src="/images/videoplaceholder.mp4"
          poster="/images/videoplaceholder_poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.7]"
        />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center">
          <h1 className="font-heading text-4xl leading-tight text-foreground md:text-6xl">
            Collision Repair, Custom Paint, and Auto Restoration in Hanford,
            California
          </h1>
          <p className="mt-8 max-w-2xl font-body text-lg font-bold uppercase text-white">
            Restored by Hand | Painted with Pride | Finished Like It&apos;s
            Our Own
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <ContactButton
              label="Contact"
              variant="primary"
              className="px-8 py-4 text-xl font-bold shadow-lg shadow-brand/50"
            />
            <Button
              variant="secondary"
              href="/#services"
              className="px-8 py-4 text-xl font-bold"
            >
              Services
            </Button>
          </div>
        </div>
      </section>

      <LogoReveal />

      <section
        id="services"
        className="mx-auto max-w-6xl scroll-mt-28 px-6 pb-16 pt-12"
      >
        <h2 className="font-heading text-4xl text-foreground md:text-6xl">
          Services
        </h2>
        <p className="mt-3 max-w-2xl font-body text-base text-muted">
          Custom auto body, paint, and restoration work for drivers and auto enthusiasts across
          Hanford and Kings County.
        </p>

        <div className="mt-12 divide-y divide-muted/30 border-y-2 border-muted/50">
          {services.map((service) => (
            <ServiceRow key={service.title} {...service} />
          ))}
        </div>

        <a
          href="#our-story"
          aria-label="Scroll to Our Story"
          className="mt-16 flex justify-center text-muted transition-transform duration-200 hover:scale-110 hover:text-foreground"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M12 4v16M6 14l6 6 6-6" />
          </svg>
        </a>
      </section>

      <section
        id="our-story"
        className="mx-auto max-w-4xl scroll-mt-28 px-6 pb-36 pt-40 text-center"
      >
        <h2 className="font-heading text-4xl text-foreground md:text-6xl">
          Our Story
        </h2>

        <p className="mx-auto mt-14 max-w-2xl font-heading text-xl text-foreground md:text-2xl">
          Country Collision is owned and operated by Levi Herman, a Central
          Valley local with a lifelong passion for custom builds.
        </p>

        <div className="mt-16 flex flex-col items-center gap-10 text-left md:flex-row md:items-start">
          <div className="flex flex-col gap-5">
            <p className="font-body text-base text-muted">
              What started as hands-on work for own vehicles grew into years
              of experience in a large collision and paint shop. After
              refining his skillset and developing his own standard for
              quality, Levi opened Country Collision to provide clients with
              his personal touch.
            </p>
            <p className="font-body text-base text-muted">
              Today, Levi runs the shop with a focus on honest service, clean
              bodywork, custom paint, and results that speak for themselves.
              As a husband and new father, he takes pride in building
              something local, personal, and lasting for Hanford and Kings
              County.
            </p>
          </div>

          <div className="relative h-64 w-full shrink-0 md:h-80 md:w-80">
            <Image
              src="/images/levi.PNG"
              alt="Levi Herman"
              fill
              sizes="(min-width: 768px) 320px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-20">
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
