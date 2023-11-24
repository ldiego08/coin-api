/**
 * Returns an UTC date with the time set to 00:00:00 for the current date.
 */
export function getCurrentUtcDate() {
  return getUtcDate(new Date());
}

/**
 * Returns an UTC date with the time set to 00:00:00 for the provided date.
 *
 * @param date The date to convert.
 */
export function getUtcDate(date: Date) {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
}
