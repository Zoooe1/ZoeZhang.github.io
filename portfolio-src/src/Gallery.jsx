// import PhotoAlbum from "react-photo-album";

// const photos = [
//   { src: "images/IMG_0001.JPG", width: 1600, height: 1067, alt: "Adventure", caption: "Adventure", mt: 0 },
//   { src: "images/work-2.jpg",   width: 1200, height: 1500, alt: "Work 2",   caption: "Work 2 — caption", mt: 24 },
//   { src: "images/work-3.jpg",   width: 1400, height: 933,  alt: "Work 3",   caption: "Work 3", mt: 12 },
//   { src: "images/work-4.jpg",   width: 1200, height: 800,  alt: "Work 4" },
// ];

// export default function Gallery() {
//   return (
//     <section className="portfolio-gallery">
//       <PhotoAlbum
//         layout="masonry"
//         spacing={16}
//         columns={(w) => (w < 600 ? 1 : w < 900 ? 2 : w < 1200 ? 5 : 6)}
//         renderPhoto={({ photo, imageProps, wrapperStyle }) => (
//           // ⬅️ critical: wrapperStyle sets the tile width & left margin
//           <figure className="card" style={{ ...wrapperStyle, marginTop: photo.mt ?? 0 }}>
//             <img {...imageProps} loading="lazy" />
//             {photo.caption && <figcaption className="overlay">{photo.caption}</figcaption>}
//           </figure>
//         )}
//         photos={photos}
//       />
//     </section>
//   );
// }
import React from "react";
import PhotoAlbum from "react-photo-album";

const photos = [
  { src: "images/IMG_0001.JPG", width: 1600, height: 1067, alt: "Adventure", caption: "Adventure", mt: 0 },
  { src: "images/work-2.jpg",   width: 1200, height: 1500, alt: "Work 2",   caption: "Work 2 — caption", mt: 24 },
  { src: "images/work-3.jpg",   width: 1400, height: 933,  alt: "Work 3",   caption: "Work 3", mt: 12 },
  { src: "images/work-4.jpg",   width: 1200, height: 800,  alt: "Work 4" },
];

export default function Gallery() {
  return (
    <section className="portfolio-gallery">
      <PhotoAlbum
        layout="masonry"
        spacing={16}
        columns={(w) => (w < 600 ? 1 : w < 900 ? 2 : w < 1200 ? 3 : 4)}
        renderPhoto={({ photo, imageProps, wrapperStyle }) => {
          // Debug: confirm wrapperStyle is received
          console.log("renderPhoto:", photo.src, wrapperStyle);
          return (
            <figure
              className="card"
              data-test="card"
              // IMPORTANT: wrapperStyle gives the column width & left offset
              style={{ ...(wrapperStyle || {}), marginTop: photo.mt ?? 0, outline: "1px dashed red" }}
            >
              <img {...imageProps} loading="lazy" />
              {photo.caption && <figcaption className="overlay">{photo.caption}</figcaption>}
            </figure>
          );
        }}
        photos={photos}
      />
    </section>
  );
}