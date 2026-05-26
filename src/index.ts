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
let missingStatus = 0;

const endpointCount: Record<string, number> = {};
const statusCount: Record<string, number> = {};

let totalResponseTime = 0;

for (const line of lines) {
  if (!line.trim()) {
    continue;
  }

  // variables for BOTH parsers
  let endpoint = "";
  let status = "";
  let responseTimeRaw = "";

  // JSON LOG PARSER
  if (line.trim().startsWith("{")) {

    try {
      const log = JSON.parse(line);

      endpoint = log.path;
      status = String(log.status);
      responseTimeRaw = log.responseTime;
    }
    catch {
      malformed++;
      continue;
    }

  }

  // NORMAL LOG PARSER
  else {

    const parts = line.trim().split(/\s+/);

    if (parts.length < 6) {
      malformed++;
      continue;
    }

    endpoint = parts[3];
    status = parts[4];
    responseTimeRaw = parts[5];
  }

  // missing status check
  if (status === "-") {
    missingStatus++;
  }

  endpointCount[endpoint] =
    (endpointCount[endpoint] || 0) + 1;

  statusCount[status] =
    (statusCount[status] || 0) + 1;

  let responseTime = 0;

  if (responseTimeRaw.endsWith("ms")) {

    responseTime = parseFloat(
      responseTimeRaw.replace("ms", "")
    );

  }
  else if (responseTimeRaw.endsWith("s")) {

    responseTime =
      parseFloat(responseTimeRaw.replace("s", "")) * 1000;

  }
  else {

    responseTime = parseFloat(responseTimeRaw);

  }

  totalResponseTime += responseTime;

  parsed++;
}

console.log("Parsed lines:", parsed);
console.log("Malformed lines:", malformed);
console.log("Missing status codes:", missingStatus);

console.log("\nEndpoint counts:");
console.log(endpointCount);

console.log("\nStatus counts:");
console.log(statusCount);

const averageResponseTime =
  totalResponseTime / parsed;

console.log(
  "\nAverage Response Time:",
  averageResponseTime.toFixed(2),
  "ms"
);