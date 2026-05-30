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

        // STOP CHILD LOOP: Returning explicitly stops this function execution.
        // Control drops backward to the parent function that called it.
        return nodes;
      }
      // Parse a standard 'Label: Value' string fragment
      // const separatorIdx = token.indexOf(":");
      // if (separatorIdx === -1) {
      //   throw new Error(
      //     `Syntax Error: Missing ':' key-value separator in token: "${token}"`,
      //   );
      // }

      // const label = token.substring(0, separatorIdx).trim();
      // const rawValue = token.substring(separatorIdx + 1).trim();

      nodes.push({
        // label: label,
        value: parsePrimitiveValue(token),
      });

      index++;
    }

    return nodes;
  }
  return parseList();
}
const input = `
Carbon Pre-Filter for Chlorine Removal
Sediment Pre-Filter for Particulate Removal
Anti-Scalant Injection Feed to Prevent Hard Water Scale on Reverse Osmosis Membranes
AWRO System with:@@
 Smart monitoring with real-time alarms and system shutdowns
 Programable standby flush
 High-efficiency membranes for top-tier water quality
 Open frame design for ease of serviceability$$
Polish DI with Either Silex Deionizer or DI Exchange Tanks Handled by Local DI Exchange Provider
RO and DI Bypass Headers for Continuous Operation During Maintenance or System Shutdown
Storage Tank with Sealed Lid@@
 Distribution pump sized to meet system requirements with shut down on empty storage tank
 Submicron vent filter
 Distribution loop return manifold
 Pressure relief valve
 Distribution loop return flow meter
 Sample port
 Distribution loop to drain valve
 Internal spray nozzle$$
Ultraviolet Light@@
 Controls bacteria proliferation in purified water storage and distribution systems
 Equipped with an online monitor to measure output intensity and alarms when lamp needs replaced$$
Endotoxin Ultrafiltration@@
 0.2 Submicron Endotoxin Cartridge
 Installed post UV to remove endotoxins from the purified water storage and distribution system$$
Alarm Panel@@
 Monitors system operating conditions
 Includes RO alarm, low storage tank, and water conductivity
 Remote alarm included for continuous system monitoring outside water room$$
Included Installation Kit, Water System Label Kit, and AAMI ST108 Validation Water Testing
System can be easily disinfected
`;
console.log(
  JSON.stringify(parseRecursiveString(input.replace(/[\n]+/g, ",,")), null, 2),
);
