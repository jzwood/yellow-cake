/*
 * UTILS
 */

export function toDictOn(arr, key) {
  return arr.reduce((acc, obj) => {
    acc[obj[key]] = obj;
    return acc;
  }, {});
}

export function panic(predicate, err) {
  if (predicate) {
    const msg = typeof err === "object" ? JSON.stringify(err) : err.toString();
    throw new Error(msg);
  }
}
