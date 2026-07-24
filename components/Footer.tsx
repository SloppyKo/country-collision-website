import Image from "next/image";

const linkClasses =
  "inline-flex items-center gap-1.5 font-body text-sm text-foreground underline underline-offset-4 transition-transform duration-150 hover:scale-105";

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M13.5 21v-8.06h2.7l.4-3.14h-3.1V7.9c0-.91.25-1.53 1.56-1.53h1.66V3.56C15.87 3.5 14.98 3.4 13.9 3.4c-2.36 0-3.98 1.44-3.98 4.08v2.32H7.2v3.14h2.72V21z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="h-px w-full bg-border" />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 pb-12 pt-20 text-center sm:grid-cols-3">
        <div className="flex flex-col items-center">
          <h3 className="font-heading text-lg text-foreground">Location</h3>
          <p className="mt-3 font-body text-sm text-muted">
            We&apos;re located in Hanford, California, and we serve clients in
            the Kings County area.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="font-heading text-lg text-foreground">Hours</h3>
          <p className="mt-3 font-body text-sm text-muted">
            Monday - Friday 9am-7pm
            <br />
            Saturday - Sunday 9am-5pm
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="font-heading text-lg text-foreground">
            Follow Us on Social Media
          </h3>
          <div className="mt-3 flex flex-col items-center gap-2">
            <a
              href="https://www.instagram.com/country_collision/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClasses}
            >
              <InstagramIcon />
              Instagram
            </a>
            <a
              href="https://facebook.com/countrycollision"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClasses}
            >
              <FacebookIcon />
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 pb-5 pt-6">
        <a href="https://www.sloppyko.com" target="_blank" rel="noopener noreferrer">
          <Image
            src="/images/bs_white.png"
            alt="SloppyKo Creative Studio"
            width={24}
            height={32}
            className="h-8 w-auto opacity-[0.32]"
          />
        </a>
        <p className="text-center font-body text-[0.55rem] tracking-[0.04em] text-[#5c5c5c]">
          Built by SloppyKo. Creative Studio © 2026 All rights reserved&nbsp;&nbsp;|&nbsp;&nbsp;0.1.1&nbsp;&nbsp;|&nbsp;&nbsp;July 23, 2026
        </p>
      </div>
    </footer>
  );
}
