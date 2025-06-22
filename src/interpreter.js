import { parse } from "./parser.js";
import { BUILT_INS } from "./core.js";
import { panic } from "./utils.js";

export function run(program) {
  const { fuel, funcMap } = parse(program);
  const { subroutine } = funcMap["MAIN"];
  const stack = [];
  const memory = [];

  const args = {
    fuel: { used: 0, max: fuel },
    funcMap,
    subroutine,
    stack,
    memory,
  };
  return evaluate(args);
}

function* evaluate({ fuel, funcMap, subroutine, stack, memory }) {
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
    if (typeof instruction === "number") {
      env.stack.push(instruction);
    } else if (instruction in BUILT_INS) {
      reduce(env, BUILT_INS[instruction]);
    } else if (instruction in funcMap) {
      const { args, subroutine } = funcMap[instruction];
      yield* evaluate({
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
    yield env;
    panic(++env.fuel.used > env.fuel.max, `All ${env.fuel.max} FUEL exhausted`);
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
