# Log Analyzer

A CLI-based log analyzer written in TypeScript.

This tool parses mixed-format server logs and prints summary statistics for:

- endpoint usage counts
- HTTP status code counts
- average response time
- malformed log line detection
- missing status code detection
- JSON-formatted log support

The analyzer handles both plain text log lines and JSON log entries, and it ignores blank lines safely.

---

## Installation

1. Clone or download the repository.
2. Install dependencies:

```bash
npm install
```

---

## Usage

### Analyze a log file

Run the analyzer with the path to a log file:

```bash
npm run analyze -- path/to/log/file.log
```

Example:

```bash
npm run analyze -- logs/generated.log
```

The analyzer prints:

- parsed line count
- malformed line count
- missing status code count
- endpoint counts
- status counts
- average response time in milliseconds

### Generate example logs

Use the sample generator to create `logs/generated.log` with mixed normal, malformed, missing-status, and JSON log lines:

```bash
npm run generate
```

---

## Log Formats Supported

The analyzer supports two log formats:

1. Plain text logs with fields separated by whitespace, such as:

   ```text
   2024-01-01T12:00:00.000Z 192.168.1.10 GET /api/users 200 125ms
   ```

2. JSON log lines, such as:

   ```json
   {"timestamp":"2024-01-01T12:00:00.000Z","ip":"192.168.1.10","method":"GET","path":"/api/users","status":"200","responseTime":"125ms"}
   ```

If a JSON line fails to parse or a plain text line has too few fields, it is treated as malformed.

---

## Notes

- Response times may include `ms` or `s`; the analyzer converts both to milliseconds.
- Lines with a status value of `-` are counted as missing status codes.
- Blank lines are ignored.

---

## Project Structure

- `src/index.ts` — main analyzer CLI implementation
- `scripts/generateLogs.ts` — example log file generator
- `logs/` — sample log files
- `package.json` — npm scripts and dependencies

---

## Requirements

- Node.js
- npm
- `ts-node` (installed via dependencies)