"use client";

import { useEffect } from "react";

/**
 * Reveal-on-scroll: attaches a single IntersectionObserver to every
 * `.reveal` element in the page and flips `is-visible` once it enters
 * the viewport. Each element animates only the first time (one-way reveal).
 *
 * Usage: render once per page layout (placed in the shell or page root).
 * Elements to animate get the className `reveal` (optional `--reveal-delay`).
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;

    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
