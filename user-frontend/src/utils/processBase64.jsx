// Check if string is Base64
export const isBase64Image = (src) => {
  return (
    src &&
    (src.startsWith("data:image") ||
      src.startsWith("data:application/octet-stream;base64") ||
      (src.length > 100 && /^[A-Za-z0-9+/=]+$/.test(src)))
  );
};

// Convert Base64 to URL
export const getImageSrc = (image) => {
  if (!image) return "../avatarAdmin.png";

  if (isBase64Image(image)) {
    if (image.startsWith("data:")) {
      return image;
    }
    return `data:image/jpeg;base64,${image}`;
  }

  return image;
};
