/*
 * PARSER
 */

import { toDictOn } from "./utils.js";

function parseLine(line) {
  const tokens = line.matchAll(/[A-Z0-9_=\[\]\']+/g).map(([name]) => name)
    .toArray();
  const eq = tokens.indexOf("=");
  const name = tokens.at(eq - 1);
  const args = tokens.slice(0, eq - 1);
  const subroutine = tokens.slice(eq + 1).map((token) =>
    /^\d+$/.test(token) ? parseInt(token) : token
  );
  return { args, name, subroutine };
}

export function parse(file) {
  return toDictOn(
    file.replace(/\n+/g, "\n").trim().split(/\n/).map(parseLine),
    "name",
  );
}
