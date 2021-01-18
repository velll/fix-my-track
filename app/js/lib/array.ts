function lastOf<T>(arr: T[]): T | null {
  if (arr.length == 0) { return null; }

  return arr[arr.length - 1];
}

export { lastOf };