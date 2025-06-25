import { parse } from "./parser.js?v=981B084C-5382-4F3D-AB58-A8D4684F3EAF";
import { BUILT_INS, STD_LIB } from "./core.js?v=981B084C-5382-4F3D-AB58-A8D4684F3EAF";
import { panic } from "./utils.js?v=981B084C-5382-4F3D-AB58-A8D4684F3EAF";

export function run(program, hook = undefined) {
  const { fuel, funcMap } = parse(program);
  Object.assign(funcMap, {...STD_LIB, ...funcMap});
  if (hook) hook(funcMap);
  // I think it makes a little more sense to pass function name to evaluate instead of subroutine
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
  yield env;
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
