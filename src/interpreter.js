import { BUILT_INS } from "./core.js";

export function evaluate({ name, functions, stack, memory }) {
  const env = {
    subroutine,
    stack: [],
    memory: [],
    pointer: 0,
    eop: subroutine.length,
  };
  while (env.pointer < env.eop) {
    const instruction = subroutine.at(env.pointer++);
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
  return env;
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

function rewrite({ args, stack, subroutine }) {
  const transformToken = args.reduce(
    (acc, arg, index) =>
      Object.assign(acc, { [arg]: stack.at(index - args.length) }),
    {},
  );
  return subroutine.map((token) => transformToken[token] ?? token);
}
