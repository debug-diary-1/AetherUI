/**
 * Shared helpers for array-valued reactive properties.
 *
 * Components must never store a caller's array by reference (external
 * mutation would corrupt internal state without an update cycle) and must
 * never hand internal arrays back by reference. Every array-valued property
 * setter/getter should copy through these helpers so equality and copy
 * semantics stay consistent across components.
 */

/** Copy an unknown input into a fresh array, treating non-arrays as empty. */
export const toArrayCopy = <T>(value: unknown): T[] => (Array.isArray(value) ? [...value] : []);

/** Order-sensitive shallow equality for arrays. */
export const arraysShallowEqual = <T>(left: readonly T[], right: readonly T[]): boolean =>
  left.length === right.length && left.every((entry, index) => entry === right[index]);
