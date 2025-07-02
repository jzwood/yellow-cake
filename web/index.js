import { run } from "../src/interpreter.js?v=BEA1D562-1864-4942-B78E-1228C36F7D93";
import * as examples from "./examples.js?v=BEA1D562-1864-4942-B78E-1228C36F7D93";

function cheating() {
  const params = new URLSearchParams(location.search);
  return params.get("cheat") === "true";
}

function main() {
  console.log("VERSION BEA1D562-1864-4942-B78E-1228C36F7D93");

  const input = document.getElementById("input");
  const output = document.getElementById("output");
  const load = document.getElementById("load");
  const evaluate = document.getElementById("eval");
  const step = document.getElementById("step");
  const challenges = document.getElementById("challenges");

  const writeOut = (env) => {
    output.firstChild.nodeValue = envToString(env);
  };

  const hook = () => window._yellow_cake_hook;

  let program;

  challenges.addEventListener("input", (e) => {
    const value = e.target.value;
    if (value === "") return;
    const example = examples[value];
    if (example == null) {
      alert(`Example ${value} missing from corpus`);
    }
    const { program, instructions } = example;
    input.value = cheating() ? program.trim() : instructions.trim();
  });

  load.addEventListener("click", (e) => {
    program = run({ program: input.value, hook: hook() });
    const { done, value } = program.next();
    writeOut(value);
  });

  evaluate.addEventListener("click", (e) => {
    try {
      const program = run({ program: input.value, hook: hook() });
      const result = program.reduce((_, x) => x);
      writeOut(result);
    } catch (err) {
      alert(err);
    }
  });

  step.addEventListener("click", (e) => {
    if (program instanceof Iterator) {
      try {
        const { done, value } = program.next();
        if (!done) {
          writeOut(value);
        }
      } catch (err) {
        alert(err);
      }
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
