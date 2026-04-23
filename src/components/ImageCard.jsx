export default function ImageCard({ title, image, priority = false }) {
  return (
    <figure className="galleryCard">
      <div className="galleryCardMedia">
        {/* Using <img> keeps this working with any remote host without next/image config */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title || "Gallery image"}
          className="galleryCardImg"
          loading={priority ? "eager" : "lazy"}
        />
        <div className="galleryCardOverlay" />
      </div>
      <figcaption className="galleryCardCaption">
        <div className="galleryCardTitle">{title || "Untitled"}</div>
      </figcaption>
    </figure>
  );
}

