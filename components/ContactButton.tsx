"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { EMAIL_DISPLAY, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";

type ContactButtonProps = {
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function ContactButton({
  label,
  variant = "primary",
  className = "",
}: ContactButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  function handleEmailClick() {
    navigator.clipboard?.writeText(EMAIL_DISPLAY).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  useEffect(() => {
    if (!open) return;

    function handleClick(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <Button variant={variant} className={className} onClick={() => setOpen((v) => !v)}>
        {label}
      </Button>

      {open && (
        <div
          role="dialog"
          className="absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 rounded-md border border-border bg-surface p-4 text-center shadow-lg"
        >
          <p className="font-heading text-sm text-foreground">Shoot us a text or call</p>
          <a
            href={PHONE_HREF}
            className="mt-2 inline-block font-body text-base font-medium text-brand underline-offset-4 hover:underline"
          >
            {PHONE_DISPLAY}
          </a>

          <p className="mt-3 font-heading text-sm text-foreground">Or send an email</p>
          <a
            href={EMAIL_HREF}
            onClick={handleEmailClick}
            className="mt-2 inline-block break-all font-body text-sm font-medium text-brand underline-offset-4 hover:underline"
          >
            {EMAIL_DISPLAY}
          </a>
          <p
            className={`mt-1 font-body text-xs text-muted transition-opacity ${
              copied ? "opacity-100" : "opacity-0"
            }`}
            aria-live="polite"
          >
            Copied to clipboard
          </p>
        </div>
      )}
    </div>
  );
}
