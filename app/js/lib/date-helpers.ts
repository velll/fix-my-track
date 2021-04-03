function differenceSeconds(start: Date, finish: Date): number {
  const startTime = start.getTime();
  const finishTime = finish.getTime();

  const diff = finishTime - startTime;

  return Math.abs(diff / 1000);
}

function addSeconds(date: Date, seconds: number) {
  return new Date(date.getTime() + seconds * 1000);
}

export { differenceSeconds, addSeconds };
