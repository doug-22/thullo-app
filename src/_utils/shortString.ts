export function shortString(value: string) {
  if (value.length > 20) return value.substring(0, 15) + '...';
  return value;
}
