function lastOf<T>(arr: T[]): T | null {
  if (arr.length == 0) { return null; }

  return arr[arr.length - 1];
}

function replaceAt<T>(arr: T[], index: number, value: T): T[] {
  const copy = arr.slice(0);
  copy[index] = value;

  return copy;
}

export { lastOf, replaceAt };