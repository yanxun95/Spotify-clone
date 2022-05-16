export const convertSecondToMinutes = (duration: number) => {
  let minutes = Math.floor(duration / 60);
  let seconds = duration - minutes * 60;
  seconds.toString().length < 2 && (seconds *= 10);

  return `${minutes}:${seconds}`;
};
