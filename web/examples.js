export const DOUBLE_DOUBLE = {
  instructions: `
100 FUEL

todo: implement double_double subroutine

A DOUBLE_DOUBLE = your code here

MAIN = 3 DOUBLE_DOUBLE

after main runs the top of the stack should be 12
`,
  program: `
20 FUEL

A DOUBLE_DOUBLE = A 4 *

MAIN = 32 DOUBLE_DOUBLE
`,
};

export const IS_EVEN = {
  instructions: `
100 FUEL

todo: implement is_even subroutine

A IS_EVEN = your code here

MAIN = 5 IS_EVEN

after main runs the top of the stack should be 0
`,
  program: `
100 FUEL

REM = DIV SWAP DROP
IS_EVEN = 2 REM 0 EQ

MAIN = 321 IS_EVEN
`,
};

export const HELLO_WORLD = {
  instructions: `
100 FUEL

todo: implement hello_world subroutine

N HELLO_WORLD = your code here

MAIN = HELLO_WORLD

after main runs the console should have printed "hello world"
`,
  program: "no implemenation yet",
};

export const MAX = {
  instructions: `
100 FUEL

todo: implement max subroutine

A B MAX = your code here

MAIN = 8 2 MAX

after main runs the top of the stack should be 8
`,
  program: `
100 FUEL

A B MAX = A A B LT [ DROP B 0 ]

MAIN = 8 2 MAX
`,
};

export const RANGE = {
  instructions: `
100 FUEL

todo: implement range subroutine

A RANGE = your code here

MAIN = 6 RANGE

after main runs the top of the stack should be 1, 2, 3, 4, 5, 6
`,
  program: `
100 FUEL

N RANGE = 1 N [ DUP INCR DUP N LT ]
`,
};

export const REPLICATE = {
  instructions: `
100 FUEL

todo: implement replicate subroutine

A REPLICATE = your code here

MAIN = 2 3 REPLICATE

after main runs the top of the stack should be 2, 2, 2
`,
  program: `
500 FUEL

FALSE = 0
A N REPLICATE = N N [ A SWAP DECR DUP ] [ FALSE ]

MAIN = 3 7 REPLICATE
`,
};

export const FIZZBUZZ = {
  instructions: `
100 FUEL

todo: implement fizzbuzz subroutine

N FIZZ_OR_BUZZ = your code here

MAIN = 7 FIZZ_OR_BUZZ

after main runs the top of the stack should be 1, 2, -3, 4, -5, -3, 7
`,
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
  instructions: `
100 FUEL

todo: implement fibonacci subroutine

N FIBONACCI = your code here

MAIN = 5 FIZZBUZZ

after main runs the top of the stack should be 1, 1, 2, 3, 5, 8, 13
`,
  program: `
1000 FUEL

A B N NEXT = A B (A B +) (N DECR) DUP

N FIB = 1 1 N N [ NEXT ] DROP

MAIN = 15 FIB
`,
};

export const POWER = {
  instructions: `
100 FUEL

todo: implement power subroutine

B E POWER = your code here

MAIN = 7 2 POWER

after main runs the top of the stack should be 49
`,
  program: `
100 FUEL

BASE ACC EXP POW = BASE (ACC BASE *) EXP DECR DUP
B E POWER = B 1 E B [ POW ] CLEAN
_ X _ CLEAN = X

MAIN = 9 2 POWER
`,
};
export const HAILSTONE = {
  instructions: `
100 FUEL

todo: implement hailstone subroutine

N HAILSTONE = your code here

MAIN = 3 HAILSTONE

after main runs the top of the stack should be 3, 5, 1
`,
  program: "no implemenation yet",
};
export const REVERSE = {
  instructions: `
100 FUEL

todo: implement reverse subroutine

P W REVERSE = your code here

MAIN = 0 0 WRITE 1 1 WRITE 2 2 WRITE 3 3 WRITE 0 4 HAILSTONE

after main runs memory should be 3, 2, 1, 0
`,
  program: "no implemenation yet",
};

/*
 * IDEAS:
 * is memory between P1 and P2 a palendrome?
 * reverse memory between P1 and P2
 * smallest value between P1 and P2
 * produce all collatz numbers starting from N
 */
