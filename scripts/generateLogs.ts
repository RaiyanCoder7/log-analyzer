import fs from "fs";

const methods = ["GET", "POST", "PUT"];
const paths = [
  "/api/users",
  "/api/login",
  "/api/upload",
  "/api/products"
];
const statuses = ["200", "201", "401", "404", "500"];

let logs = "";

for (let i = 0; i < 100; i++) {

  const timestamp = new Date().toISOString();

  const ip =
    `192.168.1.${Math.floor(Math.random() * 255)}`;

  const method =
    methods[Math.floor(Math.random() * methods.length)];

  const path =
    paths[Math.floor(Math.random() * paths.length)];

  const status =
    statuses[Math.floor(Math.random() * statuses.length)];

  const responseTime =
    `${Math.floor(Math.random() * 500)}ms`;

  // NORMAL LOG
  logs +=
`${timestamp} ${ip} ${method} ${path} ${status} ${responseTime}\n`;

  // MALFORMED LOG
  if (Math.random() < 0.1) {
    logs += `INVALID LOG LINE\n`;
  }

  // MISSING STATUS
  if (Math.random() < 0.1) {
    logs +=
`${timestamp} ${ip} ${method} ${path} - ${responseTime}\n`;
  }

  // JSON LOG
  if (Math.random() < 0.1) {

    const jsonLog = {
      timestamp,
      ip,
      method,
      path,
      status,
      responseTime
    };

    logs += JSON.stringify(jsonLog) + "\n";
  }
}

fs.writeFileSync(
  "logs/generated.log",
  logs
);

console.log(
  "generated.log created successfully"
);