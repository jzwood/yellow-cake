# YELLOW CAKE

An RPN stack language with manual memory management

### THEME

    The end is not the end

### LANG DESC

#### FUEL

YELLOW CAKE (YC) programs need `FUEL` to run. Every operation decrements the program's `FUEL`, ultimately halting once `FUEL` reaches 0.
Thus "the end is not the end", `FUEL` depletion is.

#### DATA

YC operates exclusively on 64 bit signed integers which can be pushed onto the stack or written to memory. Memory consists of 3,750 consecutive 8 byte cells.

#### OPERATORS

    <OP> := { <PARAM> } <IDENT> "=" { <DATA> | <OP> }

#### BUILT-INS
      X FUEL  =
    A B PLUS  = _
    A B MULT  = _
    A B SUB   = _
    A B DIV   = _
    A B REM   = _
    A B GT    = _
    A B LT    = _
    A B EQ    = _
    A B AND   = _
    A B OR    = _
      P READ  = _
    P X WRITE =
      B [     =
      B ]     =

#### PROGRAM

### EXAMPLES
      A  DUP     = A A
    A B  DUP2    = A B A B
    A B  SWAP    = B A
    P P' CP      = P' P READ WRITE
    A B  SWAP*   = (A READ) (A (B READ) WRITE) B WRITE
    I W  REVERSE = I (I W +) W 1 GT [SWAP* (I 1 -) (W 2 -) DUP2 GT]
