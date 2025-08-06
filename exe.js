import { run } from "./src/interpreter.js?v=AC7AB60D-32B3-4276-9088-CC824C9C5E2D";

const USAGE = "USAGE: deno run --allow-read exe.js <program.yc>";

async function main() {
  const [filepath, ...rest] = Deno.args;
  if (
    rest.length !== 0 || typeof filepath !== "string" ||
    !filepath.endsWith(".yc")
  ) {
    return Promise.reject({});
  }

  const program = await Deno.readTextFile(filepath);
  return run({ program }).reduce((_, env) => env);
}

main().then(({ stack, memory, fuel }) => {
  console.log(stack);
  console.warn({ fuel });
}).catch(() => {
  console.info(USAGE);
});
