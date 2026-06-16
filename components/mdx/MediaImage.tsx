import Image from "next/image";

export function MediaImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)]">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="h-auto w-full object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-sm text-[var(--color-text-muted)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
