import { run } from "./src/interpreter.js?v=FB851F9B-4CAC-499C-B39F-49185DE10EE2";

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
