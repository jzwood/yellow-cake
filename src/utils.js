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

//export function findBalancedBracket({type, subroutine, })

export function findBracket(arr, bracket, pointer, step, err) {
  const balance = 0;
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
    return cell === bracket && data.balance === 0
  };

  return pointerWalk({arr, pointer, step, coalgebra, err: "Brackets are not balanced"});
}

export function pointerWalk({ arr, pointer, step, err, coalgebra }) {
  while (true) {
    if (pointer < 0 || pointer >= arr.length) panic(true, err);

    const cell = arr[pointer];

    const halt = coalgebra(cell);

    if (halt) break;

    pointer += step;
  }
  return pointer
}

//export function indexOfBalancedRightBracket(env) {

////env.subroutine.reduce(({index, count}, instruction) => , {index: })

//let balance = 0
//let index = env.pointer
//for (let i=env.pointer, i++, i < env.subroutine.) {

//}
//while (index++) {
//let instruction = env.subroutine[index]
//panic(env.pointer < 0, "matching ] not found");
//}

//subroutine[index] === ']'

//if (subroutine[index] === )
//env.pointer = env.subroutine.indexOf("]", env.pointer);
//}
//export function findBalancedLeftBracket() {}
