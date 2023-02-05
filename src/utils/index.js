export function slugify(str) {
  return str.replaceAll(' ', '-').toLowerCase();
}