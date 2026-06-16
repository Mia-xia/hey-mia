export function MediaVideo({
  src,
  poster,
  caption,
}: {
  src: string;
  poster?: string;
  caption?: string;
}) {
  return (
    <figure className="my-10">
      <video
        className="w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-black"
        src={src}
        poster={poster}
        controls
        playsInline
      />
      {caption ? (
        <figcaption className="mt-3 text-center text-sm text-[var(--color-text-muted)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
