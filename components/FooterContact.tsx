"use client";

import { useState } from "react";
import { EMAIL_DISPLAY, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";

const linkClasses =
  "font-body text-sm text-foreground underline underline-offset-4 transition-transform duration-150 hover:scale-105";

export default function FooterContact() {
  const [copied, setCopied] = useState(false);

  function handleEmailClick() {
    navigator.clipboard?.writeText(EMAIL_DISPLAY).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-3 flex flex-col items-center gap-1">
      <a href={PHONE_HREF} className={linkClasses}>
        {PHONE_DISPLAY}
      </a>
      <a href={EMAIL_HREF} onClick={handleEmailClick} className={`${linkClasses} break-all`}>
        {EMAIL_DISPLAY}
      </a>
      <p
        className={`font-body text-xs text-muted transition-opacity ${
          copied ? "opacity-100" : "opacity-0"
        }`}
        aria-live="polite"
      >
        Copied to clipboard
      </p>
    </div>
  );
}
