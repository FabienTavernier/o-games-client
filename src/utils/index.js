export function slugify(str) {
  return str.replaceAll(' ', '-').toLowerCase();
}

/**
 * Get an unique ID
 *
 * @returns String - An ID of 8 chars from [0-9a-z] set
 */
export function getRandomID() {
  return Array.from(
    Array(8), // return X chars
    () => Math.floor(Math.random() * 36).toString(36), // digit from 0 (10) to z (26)
  ).join('');
}