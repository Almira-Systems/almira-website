interface SchemaNode {
  value: string | number | boolean;
  label?: string;
  children?: SchemaNode[];
}

const parsePrimitiveValue = (val: string) => {
  const clean = val.trim();
  if (clean.toLowerCase() === "true") return true;
  if (clean.toLowerCase() === "false") return false;
  if (clean !== "" && !isNaN(Number(clean))) return Number(clean);
  return clean;
};

export function parseRecursiveString(input: string): SchemaNode[] {
  const tokens = input
    .split(/(@@|,,|\$\$)/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  let index = 0;
  function parseList(): SchemaNode[] {
    const nodes: SchemaNode[] = [];

    while (index < tokens.length) {
      const token = tokens[index];

      if (!token) {
        continue;
      }

      if (token === ",,") {
        // Move past the sibling separator and continue parsing this level
        index++;
        continue;
      }

      if (token === "@@") {
        index++; // Step past "@@"
        const parentNode = nodes[nodes.length - 1];

        // START CHILD LOOP: This pauses the current level
        // and starts a completely fresh sub-list execution context
        parentNode!.children = parseList();
        continue;
      }

      if (token === "$$") {
        index++; // Step past "$$"
        return nodes;
      }

      nodes.push({
        value: parsePrimitiveValue(token),
      });

      index++;
    }

    return nodes;
  }
  return parseList();
}
const input = ``;
console.log(
  JSON.stringify(parseRecursiveString(input.replace(/[\n]+/g, ",,")), null, 2),
);
