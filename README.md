# YELLOW CAKE

A concatenative, stack based, interpreted, RPN language

### THEME

    The end is not the end

### FUEL

YELLOW CAKE programs must specify how much `FUEL` (integer) they are allowed to consume. Each operation decrements `FUEL`, halting the program once `FUEL` reaches 0. Thus the end is not when the program has finished evaluating, but rather when `FUEL` is depleted.
