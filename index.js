import { parse } from "./src/parser.js";
import { panic } from "./src/utils.js";

var PROGRAM = `
FALSE = 0
TRUE  = 1
A  DUP   = A A
A B  SWAP  = B A

MAIN = 1 DUP + DUP *
`;

var parsed = parse(PROGRAM);
