const PLUS = ({ stack }, a, b) => stack.push(a + b);
const MULT = ({ stack }, a, b) => stack.push(a * b);
const SUB = ({ stack }, a, b) => stack.push(a - b);
const DIV = ({ stack }, a, b) => stack.push(Math.floor(a / b), a % b);
const PRINT = ({ stack }, a) => console.log(a);
const LEFT_BRACKET = (env, a) => {
  if (a === 0) {
    env.pointer = env.subroutine.indexOf("]", env.pointer);
  } else {
    env.pointer += 1;
  }
};
const RIGHT_BRACKET = (env, a) => {
  if (a === 0) {
    env.pointer += 1;
  } else {
    env.pointer = env.subroutine.lastIndexOf("[", env.pointer);
  }
};

//const DUP = (env, a) => run({...env, subroutine: [a, a], pointer: 0})
//const NEG = (env, a) => run({...env, subroutine: [0, a], pointer: 0})

export const BUILT_INS = {
  "+": PLUS,
  "*": MULT,
  [DIV.name]: DIV,
  "[": LEFT_BRACKET,
  "]": RIGHT_BRACKET,
  [PRINT.name]: PRINT,
};

//A  DUP   = A A
//A B  SWAP  = B A

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
//A [     =
//A ]     =

//const PROGRAM = [9, 1, 2, 3, 4, PLUS, MULT, PLUS];

//console.log(run(PROGRAM));
