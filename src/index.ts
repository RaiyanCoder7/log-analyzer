import fs from "fs";

const filePath = process.argv[2];

if (!filePath) {
  console.log("Please provide log file path");
  process.exit(1);
}

const content = fs.readFileSync(filePath, "utf-8");

const lines = content.split("\n");

let parsed = 0;
let malformed = 0;

const endpointCount: Record<string, number> = {};

for (const line of lines) {
  if (!line.trim()) {
    continue;
  }

  const parts = line.split(" ");

  if (parts.length < 6) {
    malformed++;
    continue;
  }

  const endpoint = parts[3];

  endpointCount[endpoint] =
    (endpointCount[endpoint] || 0) + 1;

  parsed++;
}

console.log("Parsed lines:", parsed);
console.log("Malformed lines:", malformed);

console.log("\nEndpoint counts:");
console.log(endpointCount);