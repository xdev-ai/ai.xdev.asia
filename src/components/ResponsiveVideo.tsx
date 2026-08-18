"use client";

/**
 * ResponsiveVideo — embed video thân thiện mọi thiết bị.
 *
 * Hỗ trợ 3 nguồn:
 *  - youtube: ID video YouTube (hoặc URL đầy đủ) → iframe 16:9, nocookie
 *  - vimeo:    ID video Vimeo (hoặc URL đầy đủ) → iframe 16:9
 *  - selfhost: URL trực tiếp (.mp4/.webm) → <video> với controls + poster
 *
 * Mobile/tablet/desktop đều full-width, không tràn ngang,
 * iframe nằm trong khung 16:9 (aspect-ratio) với rounded border.
 */

import { Youtube } from "lucide-react";

type VideoSource =
  | { kind: "youtube"; id: string }
  | { kind: "vimeo"; id: string }
  | { kind: "selfhost"; url: string; poster?: string };

export function parseVideoInput(raw: string): VideoSource | null {
  const s = raw.trim();
  if (!s) return null;
  if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)/i.test(s)) {
    let id = s;
    const ytId = s.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
    if (ytId) id = ytId[1];
    return { kind: "youtube", id };
  }
  if (/^(https?:\/\/)?(www\.)?vimeo\.com/i.test(s)) {
    const vId = s.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return { kind: "vimeo", id: vId ? vId[1] : s.replace(/\D/g, "") };
  }
  return { kind: "selfhost", url: s };
}

export function ResponsiveVideo({
  src,
  title = "Video",
  poster,
}: {
  src: string;
  title?: string;
  poster?: string;
}) {
  const source = parseVideoInput(src);
  if (!source) return null;

  return (
    <div className="w-full overflow-hidden rounded-lg border border-[#1d3a5c] bg-[#081a30]">
      <div className="relative aspect-video w-full">
        {source.kind === "youtube" && (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(source.id)}?rel=0`}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
        {source.kind === "vimeo" && (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://player.vimeo.com/video/${encodeURIComponent(source.id)}?badge=0&autopause=0&player_id=0&app_id=58479`}
            title={title}
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        )}
        {source.kind === "selfhost" && (
          <video
            className="absolute inset-0 h-full w-full bg-black"
            src={source.url}
            poster={poster}
            controls
            playsInline
            preload="metadata"
            aria-label={title}
          />
        )}
      </div>
    </div>
  );
}

/** Dải video kèm nhãn — dùng trong section video. */
export function VideoBlock({
  src,
  title,
  description,
}: {
  src: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="w-full">
      <ResponsiveVideo src={src} title={title} />
      <div className="mt-3 flex items-start gap-2.5">
        <Youtube className="mt-0.5 size-4 shrink-0 text-cyan-300/70" />
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
          {description && <p className="mt-1 text-[13px] leading-relaxed text-[#9db3c1]">{description}</p>}
        </div>
      </div>
    </div>
  );
}
