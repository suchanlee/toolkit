export function hashString(s: string) {
  let h: number = 0;
  // tslint:disable-next-line: no-increment-decrement
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }

  return h;
}
