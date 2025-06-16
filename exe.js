import { parse } from "./src/parser.js";
import { panic } from "./src/utils.js";
import { BUILT_INS } from "./src/core.js";
import { evaluate } from "./src/interpreter.js";

const USAGE = "USAGE: deno run --allow-read exe.js <program.yc>";

async function main() {
  const [filepath, ...rest] = Deno.args;
  if (
    rest.length !== 0 || typeof filepath !== "string" ||
    !filepath.endsWith(".yc")
  ) {
    console.info(USAGE);
    return null;
  }

  const program = await Deno.readTextFile(filepath);
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
  evaluate(args);
  return args;
}

const { stack, memory, fuel } = await main();
console.log(stack);
console.warn({ fuel });
