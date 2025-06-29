/*
 * PARSER
 */

import {
  isInt,
  panic,
  toDictOn,
} from "./utils.js?v=D09FF355-831D-4A0F-A88B-EC6E32185BED";

export function parseLine(line) {
  const tokens = line.matchAll(/[A-Z0-9_*+-=\[\]\']+/g).map(([name]) => name)
    .toArray();
  const eq = tokens.indexOf("=");
  const name = tokens.at(eq - 1);
  const args = tokens.slice(0, eq - 1);
  const subroutine = tokens.slice(eq + 1).map((token) =>
    /^\d+$/.test(token) ? parseInt(token) : token
  );
  return { args, name, subroutine };
}

function parseFuel(line) {
  const [fuel, label] = line.split(/\s+/);
  panic(
    label !== "FUEL" || !isInt(fuel),
    'The first line of a program must be "<INT> FUEL"',
  );
  return parseInt(fuel, 10);
}

export function parse(file) {
  const [fuel, ...functions] = file.replace(/\n+/g, "\n").trim().split(/\n/);
  return {
    fuel: parseFuel(fuel),
    funcMap: toDictOn(
      functions.map(parseLine),
      "name",
    ),
  };
}
