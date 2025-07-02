import { run } from "./src/interpreter.js?v=6AAD7C37-4DF8-408F-97B5-DD1C822C45E9";

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
  return run({ program }).reduce((_, env) => env);
}

const { stack, memory, fuel } = await main();
console.log(stack);
console.warn({ fuel });
