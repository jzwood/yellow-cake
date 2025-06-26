export const MAX = `
400 FUEL

A B P IF_ELSE = 1 P [ DROP A 0 0 ] [ B 0 ]
A B MAX = A B A B GT IF_ELSE

MAIN = 24 13 MAX
`.trim();

export const RANGE = `
N RANGE = 1 N [ DUP INCR DUP N LT ]
`.trim();

export const REPLICATE = `
500 FUEL

FALSE = 0
A N REPLICATE = N N [ A SWAP DECR DUP ] [ FALSE ]

MAIN = 3 7 REPLICATE
`.trim();

export const FIZZBUZZ = `
4877 FUEL

A B REM = A B DIV SWAP DROP
A NEG = 0 A -
A B DIVISIBLE = A B REM 0 EQ

N IS_FIZZ = N 3 DIVISIBLE
N IS_BUZZ = N 5 DIVISIBLE

N FIZZ_OR_BUZZ = 1 (N IS_FIZZ N IS_BUZZ AND) [ DROP 35 NEG 0 0 ] [ 1 N IS_FIZZ [ DROP 3 NEG 0 0 ] [ 1 N IS_BUZZ [ DROP 5 NEG 0 0 ] [ N 0 ] 0 ] 0 ]
N FIZZBUZZ = 1 N [ DUP FIZZ_OR_BUZZ SWAP INCR DUP N LT ]

MAIN = 22 FIZZBUZZ
`.trim();

export const FIBONACCI = `
1000 FUEL

A B N NEXT = A B (A B +) (N DECR) DUP

N FIB = 1 1 N N [ NEXT ] DROP

MAIN = 15 FIB
`.trim();

/*
 * IDEAS:
 * is memory between P1 and P2 a palendrome?
 * reverse memory between P1 and P2
 * smallest value between P1 and P2
 * produce all collatz numbers starting from N
 */
