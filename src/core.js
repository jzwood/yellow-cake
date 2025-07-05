import {
  findBracket,
  isPrintable,
  panic,
  toDictOn,
} from "./utils.js?v=353FF136-949D-499C-9639-BE4ED76DFEE7";
import { parseLine } from "./parser.js?v=353FF136-949D-499C-9639-BE4ED76DFEE7";

const PLUS = ({ stack }, a, b) => stack.push(a + b);
const MULT = ({ stack }, a, b) => stack.push(a * b);
const SUB = ({ stack }, a, b) => stack.push(a - b);
const DIV = ({ stack }, a, b) => stack.push(Math.floor(a / b), a % b);
const GT = ({ stack }, a, b) => stack.push(+(a > b));
const LT = ({ stack }, a, b) => stack.push(+(a < b));
const EQ = ({ stack }, a, b) => stack.push(+(a === b));
const NAND = ({ stack }, a, b) => stack.push(+!(!!a && !!b));
const READ = ({ stack, memory }, p) => stack.push(memory.at(p) ?? 0);
const WRITE = ({ memory }, p, x) => {
  memory[p] = x;
};
const PRINT = ({ memory }, p, w) => {
  const bin = memory.slice(p, p + w);
  const output = bin.every(isPrintable)
    ? bin.map((i) => String.fromCharCode(i)).join("")
    : bin.join(" ");
  console.info(output);
};
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
    "INCR = 1 +",
    "DECR = 1 -",
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
  "*": MULT,
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
