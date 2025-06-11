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

MAIN = 1 DUP + DUP *
`;

const funcMap = parse(PROGRAM);
const { subroutine } = funcMap["MAIN"];
const stack = [];
const memory = [];

const args = {funcMap, subroutine, stack, memory}
evaluate(args)
console.log(args)
