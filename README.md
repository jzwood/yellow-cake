<div align="center">
  <img src="./logo.svg" width="150"/>
  <h1>YELLOW CAKE</h1>
</div>

A reverse polish notation stack language with manual memory management

### THEME

    The end is not the end

### OVERVIEW

#### FUEL

YELLOW CAKE (YC) programs need `FUEL` to run. Every built-in operation
decrements the program's `FUEL`, ultimately halting once `FUEL` reaches 0. Thus
"the end is not the end", `FUEL` depletion is.

#### DATA

YC operates exclusively on 64-bit signed integers which can be pushed onto the
stack or written to memory (consecutive 64-bit addresses).

#### OPERATORS

YC contains built-in "primitive" operators, standard lib operators which are
defined in terms of native operators, and user defined operators. Every
operation decrements `FUEL`. Consider the following operator:

    A 6_OR_7 = A 6 EQ A 7 EQ OR

Parentheses are not part of YC's grammar but if they were they would be grouped
like this

    A 6_OR_7 = (A 6 EQ) (A 7 EQ) OR

When `6_OR_7` is encountered on the top of the stack, the top value on the stack
is popped, evaluated by `6_OR_7` as a subroutine, and the result is pushed onto
the stack.

```
STACK: [7]
SUBROUTINE: 6_OR_7

STACK:      [7]
STACK:      [7, 6]
STACK:      [0]
STACK:      [0, 7]
STACK:      [0, 7, 7]
STACK:      [0, 1]
STACK:      [1]
```

The final final on the stack is 1 (truthy) so yes, 7 is indeed 6 or 7.

#### PROGRAM

A Program must start with `<INTEGER> "FUEL"`, followed by any number of user
defined operators, and end with a zero parameter `MAIN` operator (see grammar).

#### COMMENTS

YC programs treat all lowercase characters as comments.

#### GRAMMAR

    <WORD>    := { <A-Z> | <0-9> | "_" } ["'" | <0-9>]
    <INT>     := { <0-9> }
    <PARAM>   := <WORD>
    <OPNAME>  := <WORD>
    <OPBODY>  := { <INT> | <OPNAME> } <EOL>
    <OP>      := { <PARAM> } <OPNAME> "=" <OPBODY>
    <MAIN>    := "MAIN =" <OPBODY>
    <PROGRAM> := <INTEGER> "FUEL" { <OP> } <MAIN>

#### HOW TO USE CLI

- make sure you have
  [deno](https://docs.deno.com/runtime/getting_started/installation/) installed
  - examples tested with `deno 2.0.5 (stable, release, x86_64-apple-darwin)`
- usage: `deno run --allow-read exe.js <program.yc>`

#### BUILT-INS

    A B +     = _
    A B *     = _
    A B -     = _
    A B DIV   = _ _
    A B GT    = _
    A B LT    = _
    A B EQ    = _
    A B NAND  = _
    P   READ  = _
    P X WRITE =
    A   [     =
    A   ]     =
    P W PRINT =

#### STD LIB

    _   DROP      =
    A   DUP       = A A
    A   DECR      = A 1 -
    A   INCR      = A 1 +
    A   DROP      =
    A B SWAP      = B A
    A B AND       = (A B NAND) (A B NAND) NAND
    A B OR        = (A A NAND) (B B NAND) NAND
    A   NOT       = A A NAND

#### TESTED EXAMPLES

        T         = 1
        F         = 0
    A B NOR       = A B OR NOT
    A B REM       = A B DIV SWAP DROP
    A   NEG       = 0 A -
    P B IF        = P [ B 0 ]
    P A B IF_ELSE = P A IF P NOT B IF
    A B DIVISIBLE = A B REM 0 EQ
    A N REPLICATE = N N [ A SWAP DECR DUP ] [ F ]
    N IS_FIZZ     = N 3 DIVISIBLE
    N IS_BUZZ     = N 5 DIVISIBLE
    N FIZZ_OR_BUZZ = ((N IS_FIZZ N IS_BUZZ AND) (35 NEG) IF) ((N IS_FIZZ (N IS_BUZZ NOT) AND) (3 NEG) IF) (((N IS_FIZZ NOT) N IS_BUZZ AND) (5 NEG) IF) ((N IS_FIZZ NOT N IS_BUZZ NOT AND) N IF)

    N FIZZBUZZ    = 1 N [ DUP FIZZ_OR_BUZZ SWAP INCR DUP N LT ]

#### UNTESTED EXAMPLES

    P P' CP       = P' P READ WRITE
    A B  DUP2     = A B A B
    P P' MEMSWAP  = (P READ) (P (P' READ) WRITE) P' WRITE
    I W  REVERSE  = I (I W +) W 1 GT [MEMSWAP (I DECR) (W 2 -) DUP2 GT]
