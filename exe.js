import { run } from "./src/interpreter.js?v=41E092C3-2F06-402D-8C9A-AD90AA557383";

const USAGE = "USAGE: deno run --allow-read exe.js <program.yc>";

async function main() {
  const [filepath, ...rest] = Deno.args;
  if (
    rest.length !== 0 || typeof filepath !== "string" ||
    !filepath.endsWith(".yc")
  ) {
    return Promise.reject("invalid filepath");
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
