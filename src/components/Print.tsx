import type { PrintImage } from "@/hooks/useRollImages";


/**
 * A photo print resting on the light table. While the image loads the print
 * hatches; if it
 * fails (or no photo was found), the caption and description stand in as a
 * typographic print so the question still plays.
 */
const Print = ({
  image,
  caption,
  frame,
  alt,
}: {
  image: PrintImage;
  caption: string;
  frame: number;
  alt: string;
}) => (
  <div className="mx-auto w-full max-w-[min(380px,calc((100dvh-16.5rem)/1.45))] max-md:max-w-[260px] short:max-w-[180px]">
    <figure className="relative w-full -rotate-[1.2deg] bg-print px-[4%] pt-[4%] pb-[17%] shadow-print">
      <div className="relative aspect-[3/4] overflow-hidden bg-empty">
        {image.status === "ready" && (
          // eslint-disable-next-line @next/next/no-img-element -- plain <img> so useRollImages can preload the same file
          <img src={image.url} alt={alt} decoding="async" className="absolute inset-0 size-full object-cover animate-develop" />
        )}

        {image.status === "loading" && (
          <div
            role="img"
            aria-label={`Developing. ${alt}`}
            className="hatched absolute inset-0 grid place-items-center animate-pulse-soft"
          >
            <span className="rounded-full bg-ink/80 px-3 py-1 text-[0.8125rem] text-card">
              Developing…
            </span>
          </div>
        )}

        {image.status === "failed" && (
          <div
            role="img"
            aria-label={alt}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-strip p-6 text-center"
          >
            <span className="font-hand text-[clamp(1.375rem,3vw,1.875rem)] leading-tight text-ink">
              {caption}
            </span>
            {/* Without the image, the description stands in for it. */}
            <span aria-hidden="true" className="text-[0.875rem] leading-snug text-ink">
              {alt}
            </span>
            <span className="text-[0.8125rem] text-muted">
              No photo for this one
            </span>
          </div>
        )}
      </div>

      <figcaption
        aria-hidden="true"
        className="absolute bottom-[3.5%] left-[5%] max-w-[75%] truncate font-hand text-[clamp(0.9375rem,1.6vw,1.25rem)] text-ink/85"
      >
        {caption}
      </figcaption>

      <span aria-hidden="true" className="absolute right-[5%] bottom-[4.5%] font-mono text-[0.75rem] text-muted">
        {String(frame).padStart(2, "0")}A
      </span>
    </figure>
  </div>
);

export default Print;
