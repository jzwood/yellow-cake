import { run } from "../src/interpreter.js";

function main() {
  const input = document.getElementById("input");
  const output = document.getElementById("output");

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      try {
        const program = run(input.value);
        const result = program.reduce((_, x) => x);
        output.textContent = envToString(result);
      } catch (err) {
        alert(err)
      }
    }
  });

  // READ PROGRAM FROM TEXTAREA
  // GET GENERATOR
  //const program = run(program);

  // ADD EVENT HANDLER TO THE STEP FUNCTION
  // ON CLICK CALL program.next() and UPDATE UI
}

//const { stack, memory, fuel } = await main();
//console.log(stack);
//console.warn({ fuel });

function envToString({ fuel, pointer, stack, subroutine, memory }) {
  return [
    `  FUEL: ${fuel.used}`,
    `MEMORY: ${JSON.stringify(memory)}`,
    ` STACK: ${JSON.stringify(stack)}`,
  ].join("\n");
}

document.addEventListener("DOMContentLoaded", main);
