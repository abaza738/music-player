/**
 * Runs the function every `time`ms _minimum_
 * @param callback - function to be throttled
 * @param time - throttling time
 */
export const throttle = (callback: CallableFunction, time: number) => {
  let throttlePause = false;
  if (throttlePause) return;

  throttlePause = true;
  setTimeout(() => {
    callback();
    throttlePause = false;
  }, time);
};

export const formatTime = (seconds: number) => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const minutes = `${(seconds / 60).toFixed()}`;
  const remainingSeconds = `${(seconds % 60).toFixed()}`;
  return `${minutes.padStart(2, "0")}:${remainingSeconds.padStart(2, "0")}`;
};
