/* Responsive image with webp (modern browsers) + jpg (legacy) fallback.
   Uses fixed 1200px-wide assets, explicit width/height to prevent CLS, and async decoding. */
export function ResponsiveImage({
  src,
  alt,
  loading = "lazy",
  className,
  sizes = "(max-width: 768px) 100vw, 760px",
  eager = false,
}: {
  src: string;
  alt: string;
  loading?: "lazy" | "eager";
  className?: string;
  sizes?: string;
  eager?: boolean;
}) {
  const webpSrc = src.replace(/\.jpg$/i, ".webp").replace(/^\/blog\//, "/blog/webp/");
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : loading}
        decoding="async"
        width={1200}
        height={675}
        sizes={sizes}
        className={className}
      />
    </picture>
  );
}
