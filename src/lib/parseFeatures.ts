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
const input = `4” x 40” thin film composite membranes provide maximum contaminant rejection
while achieving high product flow and low energy use.
High pressure stainless steel membrane housings with quick connects enable fast
and efficient membrane replacement.
Disinfection is quick and easy with a simple push of the keypad, the MROZ can be
disinfected with PAA and rinsed in 2 hours.
High efficiency quiet submersible pump with integral motor starter and motor
protection keeps system running smoothly and protects the motor from overload.
The microprocessor controller with backlit LCD display shows: product and feed water
conductivity, product water temperature, operating hours, percent rejection, and
a variety of operating status messages.
The programmable flush for storage tank or direct feed keeps RO fresh between uses
The product divert feature diverts water to the drain when the conductivity exceeds
the set point for added patient safety.
`;
console.log(
  JSON.stringify(parseRecursiveString(input.replace(/[\n]+/g, ",,")), null, 2),
);
