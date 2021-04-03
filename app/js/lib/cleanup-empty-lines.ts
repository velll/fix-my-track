function cleanupEmptyLines(original: string) {
  return original.replace(/^\s*\n/gm, "");
}

export { cleanupEmptyLines };
