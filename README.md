# YELLOW CAKE

An RPN stack language with manual memory management

### THEME

    The end is not the end

### OVERVIEW

#### FUEL

YELLOW CAKE (YC) programs need `FUEL` to run. Every built-in operation decrements the program's `FUEL`, ultimately halting once `FUEL` reaches 0.
Thus "the end is not the end", `FUEL` depletion is.

#### DATA

YC operates exclusively on 64 bit signed integers which can be pushed onto the stack or written to memory (ie consecutive 64 bit addresses).

#### OPERATORS

YC contains built-in "primitive" operators, standard lib operators which are defined in terms of native operators, and user defined operators. Only evaluating native operators decrements `FUEL`.
Consider the following operators:

    A B MAX = A A B GT IF B B A GT IF

Parentheses are not part of YC's grammar but if they were they would be grouped like this

    A B MAX = (A (A B GT) IF) (B (B A GT) IF)

When `MAX` is encountered on the top of the stack, `MAX` and the next 2 fully resolved expressions are popped off the stack and replaced with the definition of `MAX`.

```
| MAX |       | IF  |
|-----|       |-----|
| B   |       | GT  |
|-----|  ==>  |-----|
| A   |       | A   |
|-----|       |-----|
| ... |       | B   |
              |-----|
              | B   |
              |-----|
              | IF  |
              |-----|
              | GT  |
              |-----|
              | B   |
              |-----|
              | B   |
              |-----|
              | A   |
              |-----|
              | A   |
              |-----|
              | ... |
```

#### PROGRAM

A Program must start with `<INTEGER> "FUEL"`, followed by any number of user defined operators, and end with a zero parameter `MAIN` operator.

#### COMMENTS

YC programs may only contain
- integers `[0-9]`
- capital characters `[A-Z]`
- straight single quotes `'`
- underscores `_`
- equals `=`

All other characters are considered comments and ignored.

#### GRAMMAR

    <WORD>    := { <A-Z> | <0-9> | "_" } ["'" | <0-9>]
    <INT>     := { <0-9> }
    <PARAM>   := <WORD>
    <OPNAME>  := <WORD>
    <OPBODY>  := { <INT> | <OPNAME> } <EOL>
    <OP>      := { <PARAM> } <OPNAME> "=" <OPBODY>
    <MAIN>    := "MAIN =" <OPBODY>
    <PROGRAM> := <INTEGER> "FUEL" { <OP> } <MAIN>

#### BUILT-INS
    A B PLUS  = _
    A B MULT  = _
    A B SUB   = _
    A B DIV   = _ _
    A B REM   = _
    A B GT    = _
    A B LT    = _
    A B EQ    = _
    A B NAND  = _
      P READ  = _
    P X WRITE =
      A [     =
      A ]     =
    P PRINT   =

#### STD LIB
         FALSE = 0
         TRUE  = 1
      A  DUP   = A A
    A B  SWAP  = B A
      A  DROP  = [FALSE]
    A B  REM   = A B DIV SWAP DROP
    A B  AND   = (A B NAND) (A B NAND) NAND
    A B  OR    = (A A NAND) (B B NAND) NAND
    A B  NOR   = A B OR NOT
      A  NOT   = A A NAND
      A  NEG   = 0 A -
    P P' CP    = P' P READ WRITE
    A B  IF    = A [ B FALSE ]

### EXAMPLES
      A  DUP        = A A
    A N  REPLICATE  = N [ N N 1 - ]
    A B  DUP2       = A B A B
    P P' MEMSWAP    = (P READ) (P (P' READ) WRITE) P' WRITE
    I W  REVERSE    = I (I W +) W 1 GT [MEMSWAP (I 1 -) (W 2 -) DUP2 GT]
    P N PRINT'      = P N [ DUP PRINT 1 - ]
    P N WRITE'      = P N [ DUP PRINT 1 - ]
      A INCR        = A 1 +
    A B DIVISIBLE   = A B REM 0 EQ
    N F B FB F_OR_B = FB 35 NEG IF B NOT F AND 3 NEG IF F NOT B AND 5 NEG IF NOT B
    P N FIZZBUZZ    = 1 N [ 5 REPLICATE 3 DIVISIBLE SWP 5 DIVISIBLE DUP2 AND F_OR_B WRITE 1 - ]
