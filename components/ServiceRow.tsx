"use client";

import { useState } from "react";
import Image from "next/image";
import ImagePlaceholder from "./ImagePlaceholder";

type ServiceRowProps = {
  title: string;
  description: string;
  imageLabel: string;
  imageSrc?: string;
};

function detectSupportsHover() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export default function ServiceRow({
  title,
  description,
  imageLabel,
  imageSrc,
}: ServiceRowProps) {
  const [open, setOpen] = useState(false);
  const [supportsHover] = useState(detectSupportsHover);

  return (
    <button
      type="button"
      onClick={() => {
        if (!supportsHover) setOpen((v) => !v);
      }}
      aria-expanded={open}
      className={`group flex w-full flex-col items-start gap-6 text-left transition-[padding] duration-300 md:flex-row md:items-center md:justify-between md:group-hover:py-8 ${
        open ? "py-8" : "py-5"
      }`}
    >
      <div className="max-w-sm">
        <div className="flex items-center gap-2">
          <h3 className="font-heading text-2xl text-foreground md:text-3xl">
            {title}
          </h3>
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-4 w-4 shrink-0 text-muted transition-transform duration-300 md:group-hover:rotate-180 ${
              open ? "rotate-180" : ""
            }`}
          >
            <path d="M5 7.5 10 12.5 15 7.5" />
          </svg>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 md:group-hover:max-h-56 md:group-hover:opacity-100 ${
            open ? "max-h-56 opacity-100" : "max-h-0 opacity-0 md:max-h-0"
          }`}
        >
          <p className="mt-2 font-body text-base text-muted">{description}</p>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 md:group-hover:h-64 md:group-hover:w-[36rem] md:group-hover:opacity-100 ${
          open
            ? "h-56 w-full opacity-100"
            : "h-0 w-full opacity-0 md:h-0 md:w-0"
        }`}
      >
        {imageSrc ? (
          <div className="relative h-full w-full">
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="(min-width: 768px) 36rem, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <ImagePlaceholder label={imageLabel} className="h-full w-full" />
        )}
      </div>
    </button>
  );
}
