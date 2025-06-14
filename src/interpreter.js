import { BUILT_INS } from "./core.js";
import { panic } from "./utils.js";

export function evaluate({ funcMap, subroutine, stack, memory }) {
  //panic(name in functions === false, `unknown function ${name} not found`);
  //const { args, subroutine } = functions[name];
  const eop = subroutine.length;
  const env = {
    pointer: 0,
    stack,
    subroutine,
    memory,
  };
  while (env.pointer < eop) {
    const instruction = subroutine.at(env.pointer);
    console.log({ instruction, stack, subroutine, pointer: env.pointer });
    if (typeof instruction === "number") {
      env.stack.push(instruction);
    } else if (instruction in BUILT_INS) {
      reduce(env, BUILT_INS[instruction]);
    } else if (instruction in funcMap) {
      const { args, subroutine } = funcMap[instruction];
      evaluate({
        funcMap,
        subroutine: substitueArgs({ args, stack, subroutine }),
        stack,
        memory,
      });
    } else {
      panic(true, `Unrecognized instruction: ${instruction}`);
    }
    env.pointer++;
    console.log("END", { instruction, stack });
    console.log("---------------------------");
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
  // in addition to subsituting args we need to remove args from the top of stack.
  // TODO reconcile reduce and substitueArgs -- probably rename substitueArgs
  return subroutine.map((token) => transformToken[token] ?? token);
}
