"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ImagePlaceholder from "./ImagePlaceholder";

type MediaItem = {
  label: string;
  imageSrc?: string;
  videoSrc?: string;
  posterSrc?: string;
};

type MediaViewerProps = {
  items: MediaItem[];
  className?: string;
};

export default function MediaViewer({ items, className = "" }: MediaViewerProps) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const hasMultiple = items.length > 1;
  const videoRef = useRef<HTMLVideoElement>(null);

  function goTo(delta: number) {
    setIndex((current) => (current + delta + items.length) % items.length);
  }

  const current = items[index];

  useEffect(() => {
    if (!expanded) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setExpanded(false);
      if (e.key === "ArrowLeft") goTo(-1);
      if (e.key === "ArrowRight") goTo(1);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.play().catch(() => {});
        } else {
          node.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [current.videoSrc]);

  return (
    <div className={`relative ${className}`}>
      {current.videoSrc ? (
        <video
          ref={videoRef}
          src={current.videoSrc}
          poster={current.posterSrc}
          preload="none"
          className="h-full w-full rounded-lg object-cover"
          controls
          loop
          muted
          playsInline
        />
      ) : current.imageSrc ? (
        <button
          type="button"
          aria-label={`Expand ${current.label}`}
          onClick={() => setExpanded(true)}
          className="block h-full w-full cursor-zoom-in"
        >
          <Image
            src={current.imageSrc}
            alt={current.label}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="rounded-lg object-cover"
          />
        </button>
      ) : (
        <ImagePlaceholder label={current.label} className="h-full w-full" />
      )}

      {hasMultiple && (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => goTo(-1)}
            className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground transition-transform hover:scale-110"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => goTo(1)}
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground transition-transform hover:scale-110"
          >
            ›
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {items.map((item, i) => (
              <span
                key={item.label}
                className={`h-1.5 w-1.5 rounded-full ${
                  i === index ? "bg-brand" : "bg-border"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {expanded && current.imageSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10"
          onClick={() => setExpanded(false)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setExpanded(false)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-xl text-foreground transition-transform hover:scale-110"
          >
            ×
          </button>

          {hasMultiple && (
            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                goTo(-1);
              }}
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-xl text-foreground transition-transform hover:scale-110 md:left-6"
            >
              ‹
            </button>
          )}

          <div
            className="relative h-full w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.imageSrc}
              alt={current.label}
              fill
              sizes="100vw"
              quality={90}
              className="object-contain"
            />
          </div>

          {hasMultiple && (
            <button
              type="button"
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                goTo(1);
              }}
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-xl text-foreground transition-transform hover:scale-110 md:right-6"
            >
              ›
            </button>
          )}
        </div>
      )}
    </div>
  );
}
