import { run } from "./src/interpreter.js?v=BAB626E1-88E4-423B-9A19-22DA9B3AB6B8";

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
