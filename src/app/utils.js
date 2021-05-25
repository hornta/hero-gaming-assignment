const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * 1000;
const MS_PER_HOUR = 3600 * 1000;

export const formatDuration = (from, to) => {
  let diffMs = to - from;

  let hours = Math.floor(diffMs / MS_PER_HOUR);
  diffMs -= hours * MS_PER_HOUR;

  let minutes = Math.floor(diffMs / MS_PER_MINUTE);
  diffMs -= minutes * MS_PER_MINUTE;

  let seconds = Math.floor(diffMs / MS_PER_SECOND);
  diffMs -= seconds * MS_PER_SECOND;

  let milliseconds = diffMs;

  hours = String(hours).padStart(2, 0);
  minutes = String(minutes).padStart(2, 0);
  seconds = String(seconds).padStart(2, 0);
  milliseconds = String(milliseconds).padStart(3, 0);

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const ensureSuccessfulHttpStatus = (status) => {
  const isSuccessful = status >= 200 && status < 300;
  if (!isSuccessful) {
    throw new Error("Bad http status");
  }
};
