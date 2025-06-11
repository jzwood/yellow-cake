import { panic } from "./utils.js";

const PLUS = ({ stack }, a, b) => stack.push(a + b);
const X = ({ stack }, a, b) => stack.push(a * b);
const SUB = ({ stack }, a, b) => stack.push(a - b);
const DIV = ({ stack }, a, b) => stack.push(Math.floor(a / b), a % b);
const GT = ({ stack }, a, b) => stack.push(a > b);
const LT = ({ stack }, a, b) => stack.push(a < b);
const EQ = ({ stack }, a, b) => stack.push(a === b);
const NAND = ({ stack }, a, b) => stack.push(+!(!!a && !!b));
const READ = ({ memory }, p) => memory.at(p);
const WRITE = ({ memory }, p, x) => {
  memory[p] = x;
};
const PRINT = ({ stack }, a) => console.log(a);
const LEFT_BRACKET = (env, a) => {
  if (a === 0) {
    env.pointer = env.subroutine.indexOf("]", env.pointer);
    panic(env.pointer < 0, "matching ] not found");
  } else {
    env.pointer += 1;
  }
};
const RIGHT_BRACKET = (env, a) => {
  if (a === 0) {
    env.pointer += 1;
  } else {
    env.pointer = env.subroutine.lastIndexOf("[", env.pointer);
    panic(env.pointer < 0, "matching [ not found]");
  }
};

//const DUP = (env, a) => run({...env, subroutine: [a, a], pointer: 0})
//const NEG = (env, a) => run({...env, subroutine: [0, a], pointer: 0})

export const BUILT_INS = {
  "+": PLUS,
  "-": SUB,
  [X.name]: X,
  [DIV.name]: DIV,
  [GT.name]: GT,
  [LT.name]: LT,
  [EQ.name]: EQ,
  [NAND.name]: NAND,
  [READ.name]: READ,
  [WRITE.name]: WRITE,
  [PRINT.name]: PRINT,
  "[": LEFT_BRACKET,
  "]": RIGHT_BRACKET,
};

//const PROGRAM = [9, 1, 2, 3, 4, PLUS, MULT, PLUS];

//console.log(run(PROGRAM));
