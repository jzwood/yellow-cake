export const MAX = {
  instructions: "",
  program: `
100 FUEL

A B MAX = A A B LT [ DROP B 0 ]

MAIN = 8 2 MAX
`,
};

export const IS_EVEN = {
  instructions: "",
  program: `
100 FUEL

REM = DIV SWAP DROP
IS_EVEN = 2 REM 0 EQ

MAIN = 321 IS_EVEN
`,
};

export const RANGE = {
  instructions: "",
  program: `
100 FUEL

N RANGE = 1 N [ DUP INCR DUP N LT ]
`,
};

export const REPLICATE = {
  instructions: "",
  program: `
500 FUEL

FALSE = 0
A N REPLICATE = N N [ A SWAP DECR DUP ] [ FALSE ]

MAIN = 3 7 REPLICATE
`,
};

export const FIZZBUZZ = {
  instructions: "",
  program: `
4877 FUEL

A B REM = A B DIV SWAP DROP
A NEG = 0 A -
A B DIVISIBLE = A B REM 0 EQ

N IS_FIZZ = N 3 DIVISIBLE
N IS_BUZZ = N 5 DIVISIBLE

N FIZZ_OR_BUZZ = 1 (N IS_FIZZ N IS_BUZZ AND) [ DROP 35 NEG 0 0 ] [ 1 N IS_FIZZ [ DROP 3 NEG 0 0 ] [ 1 N IS_BUZZ [ DROP 5 NEG 0 0 ] [ N 0 ] 0 ] 0 ]
N FIZZBUZZ = 1 N [ DUP FIZZ_OR_BUZZ SWAP INCR DUP N LT ]

MAIN = 22 FIZZBUZZ
`,
};

export const FIBONACCI = {
  instructions: "",
  program: `
1000 FUEL

A B N NEXT = A B (A B +) (N DECR) DUP

N FIB = 1 1 N N [ NEXT ] DROP

MAIN = 15 FIB
`,
};

export const DOUBLE_DOUBLE = { instructions: "", program: "" };
export const HELLO_WORLD = { instructions: "", program: "" };
export const POWER = { instructions: "", program: "" };
export const HAILSTONE = { instructions: "", program: "" };
export const REVERSE = { instructions: "", program: "" };

/*
 * IDEAS:
 * is memory between P1 and P2 a palendrome?
 * reverse memory between P1 and P2
 * smallest value between P1 and P2
 * produce all collatz numbers starting from N
 */
