export enum RandomIntError {
  INVALID_MAX = "Invalid max value",
}
export const getRandomInt = (max: number): number | RandomIntError => {
  if (max <= 0) {
    return RandomIntError.INVALID_MAX;
  }
  return Math.floor(Math.random() * max); // Entre 0 et max -1
};