import {
  findBracket,
  panic,
  toDictOn,
} from "./utils.js?v=DEB78C5D-E367-4DA0-AD3C-721FAF15D8D6";
import { parseLine } from "./parser.js?v=DEB78C5D-E367-4DA0-AD3C-721FAF15D8D6";

const PLUS = ({ stack }, a, b) => stack.push(a + b);
const X = ({ stack }, a, b) => stack.push(a * b);
const SUB = ({ stack }, a, b) => stack.push(a - b);
const DIV = ({ stack }, a, b) => stack.push(Math.floor(a / b), a % b);
const GT = ({ stack }, a, b) => stack.push(+(a > b));
const LT = ({ stack }, a, b) => stack.push(+(a < b));
const EQ = ({ stack }, a, b) => stack.push(+(a === b));
const NAND = ({ stack }, a, b) => stack.push(+!(!!a && !!b));
const READ = ({ stack, memory }, p) => stack.push(memory.at(p));
const WRITE = ({ memory }, p, x) => {
  memory[p] = x;
};
const PRINT = ({ stack }, a) => console.info(a);
const LEFT_BRACKET = (env, a) => {
  if (a === 0) {
    env.pointer = findBracket(env.subroutine, {
      pointer: env.pointer,
      bracket: "]",
    });
  }
};
const RIGHT_BRACKET = (env, a) => {
  if (a !== 0) {
    env.pointer = findBracket(env.subroutine, {
      pointer: env.pointer,
      bracket: "[",
    });
  }
};

export const STD_LIB = toDictOn(
  [
    "A DROP =",
    "A DUP = A A",
    "A B SWAP = B A",
    "A B AND = (A B NAND) (A B NAND) NAND",
    "A B OR = (A A NAND) (B B NAND) NAND",
    "A NOT = A A NAND",
  ].map(parseLine),
  "name",
);

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
