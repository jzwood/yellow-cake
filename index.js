import { parse } from "./src/parser.js";
import { panic } from "./src/utils.js";
import { BUILT_INS } from "./src/core.js";
import { evaluate } from "./src/interpreter.js";

//export function evaluate({ funcMap, subroutine, stack, memory }) {

const PROGRAM = `
FALSE = 0
TRUE  = 1
A DUP = A A
A B SWAP  = B A
A INCR = A 1 +
A DECR = A 1 -
A N REPLICATE = N N [ A SWAP DECR DUP ] [ FALSE ]
P B IF = P [ B 0 ]
P I E IF_ELSE = P I IF P NOT E IF

MAIN = 5 3 REPLICATE`;

const funcMap = parse(PROGRAM);
const { subroutine } = funcMap["MAIN"];
const stack = [];
const memory = [];

const args = { funcMap, subroutine, stack, memory };
evaluate(args);
console.log(args);
