"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function LogoReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="flex justify-center overflow-hidden pb-10 pt-28">
      <style>{`
        @keyframes logo-throb {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
      <div
        ref={ref}
        className={`relative p-10 transition-all duration-1000 ease-out md:p-16 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at center, #000000 40%, rgba(0,0,0,0) 75%)",
          ...(visible
            ? { animation: "logo-throb 3.5s ease-in-out infinite" }
            : {}),
        }}
      >
        <Image
          src="/images/logo_final.png"
          alt="Country Collision logo"
          width={640}
          height={640}
          className="h-auto w-96 mix-blend-screen md:w-[36rem]"
        />
      </div>
    </section>
  );
}
