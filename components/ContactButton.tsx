"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";

const PHONE_DISPLAY = "(559) 670-5889";
const PHONE_HREF = "tel:+15596705889";

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
  const wrapperRef = useRef<HTMLDivElement>(null);

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
          className="absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 rounded-md border border-border bg-surface p-4 text-center shadow-lg"
        >
          <p className="font-heading text-sm text-foreground">Shoot us a text or call</p>
          <a
            href={PHONE_HREF}
            className="mt-2 inline-block font-body text-base font-medium text-brand underline-offset-4 hover:underline"
          >
            {PHONE_DISPLAY}
          </a>
        </div>
      )}
    </div>
  );
}
