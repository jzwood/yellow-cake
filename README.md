# YELLOW CAKE

An RPN stack language with manual memory management

### THEME

    The end is not the end

### OVERVIEW

#### FUEL

YELLOW CAKE (YC) programs need `FUEL` to run. Every operation decrements the program's `FUEL`, ultimately halting once `FUEL` reaches 0.
Thus "the end is not the end", `FUEL` depletion is.

#### DATA

YC operates exclusively on 64 bit signed integers which can be pushed onto the stack or written to memory. Memory consists of 3,750 consecutive 64 bit cells.

#### OPERATORS

#### PROGRAM

#### COMMENTS

YC programs may only contain
- integers `[0-9]`
- capital characters `[A-Z]`
- straight single quotes `'`
- underscores `_`
- equals `=`

All other characters are considered comments and ignored.

#### GRAMMAR

    <WORD> := { <A-Z> | "_" } "'"
    <INT> := { <0-9> }
    <OP> := { <WORD> } <WORD> "=" { <INT> | <OP> } <EOL>


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
      B [     =
      B ]     =
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
    P P' CP    = P' P READ WRITE

### EXAMPLES
      A  TRIP    = A A A
    A B  TRIP2   = A B A B A B
    A B  DUP2    = A B A B
    P P' MEMSWAP = (P READ) (P (P' READ) WRITE) P' WRITE
    I W  REVERSE = I (I W +) W 1 GT [MEMSWAP (I 1 -) (W 2 -) DUP2 GT]

    P N PRINT'   = P N [ DUP PRINT 1 - ]
      A INCR     = A 1 +
      A NOT      = A A A + =
    N F B FB FBZ = FB [ 35 FALSE ] B NOT F AND [ 3 FALSE ] F NOT B AND [ 5 FALSE ] NOT B NOT F OR [ N FALSE ]
    P N FIZZBUZZ = 1 N [   ]
      N FIZZBUZZ = 1 N [ TRIP 3 REM SWP 5 REM TRIP2 ]

      [3, 3 % 3, 3 % 5]
      [3, 1, 0, 1, 0, 1, 0]
      [3, 0, 1, 0]
