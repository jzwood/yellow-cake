import { BUILT_INS } from "./core.js";
import { panic } from "./utils.js";

const DEBUG = false;

function debug(...args) {
  if (DEBUG) console.log(...args);
}

export function evaluate({ fuel, funcMap, subroutine, stack, memory }) {
  const eop = subroutine.length;
  const env = {
    fuel,
    pointer: 0,
    stack,
    subroutine,
    memory,
  };
  while (env.pointer < eop) {
    const instruction = subroutine.at(env.pointer);
    debug({ instruction, stack, subroutine, pointer: env.pointer });
    if (typeof instruction === "number") {
      env.stack.push(instruction);
    } else if (instruction in BUILT_INS) {
      reduce(env, BUILT_INS[instruction]);
    } else if (instruction in funcMap) {
      const { args, subroutine } = funcMap[instruction];
      evaluate({
        fuel,
        funcMap,
        subroutine: substitueArgs({ args, stack, subroutine }),
        stack,
        memory,
      });
    } else {
      panic(true, `Unrecognized instruction: ${instruction}`);
    }
    env.pointer++;
    panic(++env.fuel.used > env.fuel.max, `All ${env.fuel.max} FUEL exhausted`);
    debug("END", { instruction, stack });
    debug("---------------------------");
  }
}

function popStack(stack, n) {
  return n === 0 ? [] : stack.splice(-n);
}

function reduce(env, operator) {
  const arity = operator.length - 1;
  panic(
    env.stack.length < arity,
    `Not enough values in stack ${
      JSON.stringify(env.stack)
    } for operator ${operator.name}.`,
  );
  const args = popStack(env.stack, arity);
  operator(env, ...args);
}

function substitueArgs({ args, stack, subroutine }) {
  const transformToken = args.reduce(
    (acc, arg, index) =>
      Object.assign(acc, { [arg]: stack.at(index - args.length) }),
    {},
  );
  popStack(stack, args.length);
  return subroutine.map((token) => transformToken[token] ?? token);
}
