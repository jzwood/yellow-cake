import { run } from "./src/interpreter.js";

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
  return run(program).reduce((_, env) => env);
}

const { stack, memory, fuel } = await main();
console.log(stack);
console.warn({ fuel });
