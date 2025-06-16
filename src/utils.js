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

export function isInt(str) {
  return /^\d+$/.test(str);
}

export function findBracket(arr, { pointer, bracket }) {
  const step = bracket === "]" ? +1 : -1;
  let balance = 0;
  const coalgebra = (cell) => {
    switch (cell) {
      case "]":
        balance++;
        break;
      case "[":
        balance--;
        break;
      default:
        break;
    }
    return cell === bracket && balance === 0;
  };

  return scan({
    arr,
    pointer,
    step,
    coalgebra,
    err: `index out of bounds scanning for "${bracket}"`,
  });
}

export function scan({ arr, pointer, coalgebra, step, err }) {
  while (true) {
    panic(pointer < 0 || pointer >= arr.length, err);

    const cell = arr[pointer];

    const halt = coalgebra(cell);

    if (halt) break;

    pointer += step;
  }
  return pointer;
}
