import { run } from "../src/interpreter.js?v=9F9E3EA7-DDDD-40E1-A8AF-950D91B5539F";
import {
  FIZZBUZZ,
  MAX,
  REPLICATE,
} from "./examples.js?v=9F9E3EA7-DDDD-40E1-A8AF-950D91B5539F";

function main() {
  const input = document.getElementById("input");
  const output = document.getElementById("output");
  const load = document.getElementById("load");
  const evaluate = document.getElementById("eval");
  const step = document.getElementById("step");
  const max = document.getElementById("max");
  const replicate = document.getElementById("replicate");
  const fizzbuzz = document.getElementById("fizzbuzz");

  const writeOut = (env) => {
    output.firstChild.nodeValue = envToString(env);
  };

  const hook = () => window._yellow_cake_hook;

  let program;

  max.addEventListener("click", (e) => {
    input.value = MAX;
  });

  replicate.addEventListener("click", (e) => {
    input.value = REPLICATE;
  });

  fizzbuzz.addEventListener("click", (e) => {
    input.value = FIZZBUZZ;
  });

  load.addEventListener("click", (e) => {
    program = run(input.value, hook());
    const { done, value } = program.next();
    writeOut(value);
  });

  evaluate.addEventListener("click", (e) => {
    try {
      const program = run(input.value, hook());
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
