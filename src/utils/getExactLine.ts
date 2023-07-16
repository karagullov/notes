export const getExactLine = (text: string, lineIndex: number): string => {
  const lines = text.split("\n");
  if (lines.length > lineIndex) {
    return lines[lineIndex];
  }
  return "";
};
