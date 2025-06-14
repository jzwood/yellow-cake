import { parse } from "./src/parser.js";
import { panic } from "./src/utils.js";
import { BUILT_INS } from "./src/core.js";
import { evaluate } from "./src/interpreter.js";

//export function evaluate({ funcMap, subroutine, stack, memory }) {

const PROGRAM = `
A B SWAP = B A
A B AND = (A B NAND) (A B NAND) NAND
A B OR = (A A NAND) (B B NAND) NAND
A B NOR = A B OR NOT
A NOT = A A NAND
A B REM = A B DIV SWAP [ 0 ]
A DUP = A A
P B IF = P [ B 0 ]
A NEG = 0 A -
A B DUP2 = A B A B
A B DIVISIBLE = A B REM 0 EQ
N IS_FIZZ = N 3 DIVISIBLE
N IS_BUZZ = N 5 DIVISIBLE
N FIZZ_OR_BUZZ = ((N IS_FIZZ N IS_BUZZ AND) (35 NEG) IF) ((N IS_FIZZ (N IS_BUZZ NOT) AND) (3 NEG) IF) (((N IS_FIZZ NOT) N IS_BUZZ AND) (5 NEG) IF) ((N IS_FIZZ NOT N IS_BUZZ NOT AND) N IF)

P N FIZZBUZZ = 1 N [ 5 REPLICATE 3 DIVISIBLE SWP 5 DIVISIBLE DUP2 AND F_OR_B WRITE DECR ]

MAIN = 16 FIZZ_OR_BUZZ`;

const funcMap = parse(PROGRAM);
const { subroutine } = funcMap["MAIN"];
const stack = [];
const memory = [];

const args = { funcMap, subroutine, stack, memory };
evaluate(args);
console.log(args);
