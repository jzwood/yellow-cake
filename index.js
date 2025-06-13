import { parse } from "./src/parser.js";
import { panic } from "./src/utils.js";
import { BUILT_INS } from "./src/core.js";
import { evaluate } from "./src/interpreter.js";

//export function evaluate({ funcMap, subroutine, stack, memory }) {

const PROGRAM = `
FALSE = 0
TRUE  = 1
A  DUP   = A A
A B  SWAP  = B A
A  INCR  = A 1 +
A  DECR  = A 1 -
A N  REPLICATE  = N [ N N DECR ]

MAIN = 7 10 REPLICATE
`;

const funcMap = parse(PROGRAM);
const { subroutine } = funcMap["MAIN"];
const stack = [];
const memory = [];

const args = { funcMap, subroutine, stack, memory };
evaluate(args);
console.log(args);
