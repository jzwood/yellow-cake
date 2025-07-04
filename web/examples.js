export const DOUBLE_DOUBLE = {
  instructions: `
100 FUEL

todo: implement double_double subroutine

A DOUBLE_DOUBLE = your code here

MAIN = 3 DOUBLE_DOUBLE

after main runs the stack should be [12]
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

after main runs the stack should be [0]
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
500 FUEL

todo: implement hello_world subroutine

HELLO_WORLD = your code here

MAIN = HELLO_WORLD

after main runs the console should have printed "hello world"
`,
  program: `
100 FUEL

HELLO_WORLD = 0 72 WRITE, 1 101 WRITE, 2 108 WRITE, 3 108 WRITE, 4 111 WRITE, 5 32 WRITE , 6 119 WRITE, 7 111 WRITE, 8 114 WRITE, 9 108 WRITE, 10 100 WRITE, 0 11 PRINT

MAIN = HELLO_WORLD
`,
};

export const MAX = {
  instructions: `
100 FUEL

todo: implement max subroutine

A B MAX = your code here

MAIN = 8 2 MAX

after main runs the stack should be [8]
`,
  program: `
100 FUEL

A B MAX = A A B LT [ DROP B 0 ]

MAIN = 8 2 MAX
`,
};

export const RANGE = {
  instructions: `
500 FUEL

todo: implement range subroutine

A RANGE = your code here

MAIN = 6 RANGE

after main runs the stack should be [1, 2, 3, 4, 5, 6]
`,
  program: `
500 FUEL

N RANGE = 1 N [ DUP INCR DUP N LT ]

MAIN = 13 RANGE
`,
};

export const REPLICATE = {
  instructions: `
1000 FUEL

todo: implement replicate subroutine

A REPLICATE = your code here

MAIN = 2 3 REPLICATE

after main runs the stack should be [2, 2, 2]
`,
  program: `
1000 FUEL

FALSE = 0
A N REPLICATE = N N [ A SWAP DECR DUP ] [ FALSE ]

MAIN = 3 7 REPLICATE
`,
};

export const FIZZBUZZ = {
  instructions: `
10000 FUEL

todo: implement fizzbuzz subroutine

N FIZZBUZZ = your code here

MAIN = 7 FIZZBUZZ

after main runs the stack should be [1, 2, -3, 4, -5, -3, 7]
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
1000 FUEL

todo: implement fibonacci subroutine

N FIBONACCI = your code here

MAIN = 5 FIBONACCI

after main runs the stack should be [1, 1, 2, 3, 5, 8, 13]
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
1000 FUEL

todo: implement power subroutine

B E POWER = your code here

MAIN = 7 2 POWER

after main runs the stack should be [49]
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
1000 FUEL

todo: implement hailstone sequence starting with N and ending with 1

N HAILSTONE = your code here

MAIN = 9 HAILSTONE

after main runs the stack should be [9, 28, 14, 7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1]
`,
  program: "no implemenation yet",
};
export const REVERSE = {
  instructions: `
100 FUEL

todo: implement reverse subroutine

P W REVERSE = your code here

SETUP = 2 77 WRITE 3 78 WRITE 4 79 WRITE 5 80 WRITE
MAIN = SETUP 2 4 REVERSE

after main runs memory should be [,,80, 79, 78, 77]
`,
  program: `
100 FUEL

P P' CP_SWAP  = P' (P READ) P (P' READ) WRITE WRITE
A B  DUP2 = A B A B
A B  CONSTRICT = A INCR B DECR

I W REVERSE = I (I W + DECR) W [ DUP2 CP_SWAP CONSTRICT DUP2 LT ]

SETUP = 4 100 WRITE 5 101 WRITE 6 102 WRITE 7 103 WRITE
MAIN = SETUP 4 4 REVERSE
`,
};

/*
 * IDEAS:
 * is memory between P1 and P2 a palendrome?
 * smallest value between P1 and P2
 */
