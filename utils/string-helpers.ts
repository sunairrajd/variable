export const safeSlice = (text: any, start: number, end?: number): string => {
  if (text === undefined || text === null) return '';
  return String(text).slice(start, end);
};

export const truncate = (text: any, maxLength: number): string => {
  if (text === undefined || text === null) return '';
  const str = String(text);
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
}; 