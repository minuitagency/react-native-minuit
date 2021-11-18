// Ratings

export const calcNbOfRating = (rating) => rating?.reduce((t, n) => t + n);
export const calcRating = (rating) => {
  if (rating && calcNbOfRating(rating) > 0) {
    return (
      rating?.reduce((t, n, i) => t + n * i, 0) / calcNbOfRating(rating)
    ).toFixed(1);
  } else {
    return 0;
  }
};
