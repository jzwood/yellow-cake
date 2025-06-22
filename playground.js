import { run } from "./src/interpreter.js";

function main() {
  // READ PROGRAM FROM TEXTAREA
  // GET GENERATOR
  const program = run(program);

  // ADD EVENT HANDLER TO THE STEP FUNCTION
  // ON CLICK CALL program.next() and UPDATE UI
}

//const { stack, memory, fuel } = await main();
//console.log(stack);
//console.warn({ fuel });
