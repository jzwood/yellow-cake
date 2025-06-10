const PLUS = ({ stack }, a, b) => stack.push(a + b);
const MULT = ({ stack }, a, b) => stack.push(a * b);
const SUB = ({ stack }, a, b) => stack.push(a - b);
const DIV = ({ stack }, a, b) => stack.push(Math.floor(a / b), a % b);
const PRINT = ({ stack }, a) => console.log(a);
const LEFT_BRACKET = (env, a) => {
  env.p++
  if (a === 0) {
    env.p = program.indexOf(']', env.p)
  }
}

const DUP = (env, a) => run({...env, program: [a, a], pointer: 0})
const NEG = (env, a) =>
      A  NEG   = 0 A -

const BUILT_INS = {
  '+': PLUS,
  '*': MULT,
  [DIV.name]: DIV,
  '[': LEFT_BRACKET,
}

const STD_LIB = {
  [DUP.name]: DUP
}


//A  DUP   = A A
//A B  SWAP  = B A

//A B DIV   = _ _
//A B GT    = _
//A B LT    = _
//A B EQ    = _
//A B NAND  = _
//P READ  = _
//P X WRITE =
//A [     =
//A ]     =
//P PRINT   =
//A [     =
//A ]     =

const PROGRAM = [9, 1, 2, 3, 4, PLUS, MULT, PLUS];

console.log(run(PROGRAM));

function panic(err) {
  const msg = typeof err === "object" ? JSON.stringify(err) : err.toString();
  throw new Error(msg);
}

var line = "    P N FIZZBUZZ    = 1 N [ 5 REPLICATE 3 DIVISIBLE SWP 5 DIVISIBLE DUP2 AND F_OR_B WRITE DECR ]"
function parseLine(line) {
  const tokens = line.matchAll(/[A-Z0-9_=\[\]\']+/g).map(([name]) => name).toArray()
  const eq = tokens.indexOf('=')
  const name = tokens.at(eq - 1)
  const args = tokens.slice(0, eq - 1)
  const program = tokens.slice(eq + 1)
  return { args, name, program}
}

function run({program, stack, memory, pointer}) {
  const env = {
    program,
    stack: [],
    memory: [],
    pointer: 0,
    eop: program.length,
  };
  while (env.pointer < env.eop) {
    const instruction = program.at(env.pointer++);
    switch (typeof instruction) {
      case "number":
        env.stack.push(instruction);
        break;
      case "function":
        reduce(env, instruction);
        break;
      default:
        panic(`Unrecognized instruction: ${instruction}`);
    }
  }
  return env
}

function reduce(env, operator) {
  const arity = operator.length - 1;
  if (env.stack.length < arity) {
    panic(
      `Not enough values in stack ${
        JSON.stringify(env.stack)
      } for operator ${operator.name}.`,
    );
  }
  const args = env.stack.splice(-arity);
  operator(env, ...args);
}
