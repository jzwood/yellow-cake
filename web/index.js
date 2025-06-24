import { run } from "../src/interpreter.js";

function main() {
  const input = document.getElementById("input");
  const output = document.getElementById("output");
  const load = document.getElementById("load");
  const evaluate = document.getElementById("eval");
  const step = document.getElementById("step");

  const writeOut = (env) => {
    output.firstChild.nodeValue = envToString(env);
  };

  let program;

  load.addEventListener("click", (e) => {
    program = run(input.value);
    const { done, value } = program.next();
    output.firstChild.nodeValue = envToString(value);
  });

  evaluate.addEventListener("click", (e) => {
    try {
      const program = run(input.value);
      const result = program.reduce((_, x) => x);
      writeOut(result);
    } catch (err) {
      alert(err);
    }
  });

  step.addEventListener("click", (e) => {
    try {
      const { done, value } = program.next();
      if (!done) {
        writeOut(value);
      }
    } catch (err) {
      // DO NOTHING
    }
  });
}

function envToString({ fuel, pointer, stack, subroutine, memory }) {
  const padLeft = subroutine.slice(0, pointer + 1).reduce(
    (padding, op) => padding + op.toString().length,
    pointer,
  );
  return [
    `  FUEL: ${fuel.used}`,
    `MEMORY: [${memory.toString()}]`,
    ` STACK: [${stack.toString()}]`,
    `  FUNC: ${subroutine.join(" ")}`,
    `        ${"▲".padStart(padLeft, " ")}`,
  ].join("\n");
}

document.addEventListener("DOMContentLoaded", main);
