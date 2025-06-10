const PLUS = (stack, a, b) => stack.push(a + b);
const MULT = (stack, a, b) => stack.push(a * b);
const SUB = (stack, a, b) => stack.push(a - b);
const DIV = (stack, a, b) => stack.push(Math.floor(a / b), a % b)
const PRINT = (stack, a) => console.log(a)

//A B DIV   = _ _
//A B GT    = _
//A B LT    = _
//A B EQ    = _
//A B NAND  = _
//P READ  = _
//P X WRITE =
//A [     =
//A ]     =
//P PRINT   =

const PROGRAM = [
  9,
  1,
  2,
  3,
  4,
  PRINT,
  PRINT,
  PRINT
];

console.log(run(PROGRAM));

function panic(err) {
  const msg = typeof err === "object" ? JSON.stringify(err) : err.toString();
  throw new Error(msg);
}

function run(program) {
  const stack = [];
  let pointer = 0;
  const eop = program.length;
  while (pointer < eop) {
    const instruction = program.at(pointer++);
    switch (typeof instruction) {
      case "number":
        stack.push(instruction);
        break;
      case "function":
        reduce(stack, instruction);
        break;
      default:
        panic(`Unrecognized instruction: ${instruction}`);
    }
  }
  return stack;
}

function reduce(stack, operator) {
  const arity = operator.length - 1;
  if (stack.length < arity) {
    panic(
      `Not enough values in stack ${
        JSON.stringify(stack)
      } for operator ${operator}.`,
    );
  }
  const args = stack.splice(-arity);
  operator(stack, ...args);
}
