import { parse } from "./parser.js?v=A9A78456-D590-413B-9BAA-D40E1B01817C";
import {
  BUILT_INS,
  STD_LIB,
} from "./core.js?v=A9A78456-D590-413B-9BAA-D40E1B01817C";
import { panic } from "./utils.js?v=A9A78456-D590-413B-9BAA-D40E1B01817C";

export function run({ program, stack = [], memory = [], hook = undefined }) {
  const { fuel, funcMap } = parse(program);
  Object.assign(funcMap, { ...STD_LIB, ...funcMap });
  if (hook) hook(funcMap);

  const { subroutine } = funcMap["MAIN"];

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
    panic(++env.fuel.used > env.fuel.max, `All ${env.fuel.max} FUEL exhausted`);
    yield env;
  }
}

function pop(stack, n) {
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
  const args = pop(env.stack, arity);
  operator(env, ...args);
}

function substitueArgs({ args, stack, subroutine }) {
  const transformToken = args.reduce(
    (acc, arg, index) =>
      Object.assign(acc, { [arg]: stack.at(index - args.length) }),
    {},
  );
  pop(stack, args.length);
  return subroutine.map((token) => transformToken[token] ?? token);
}
