# ANSWERS.md

## 1. How to run

### Install dependencies

```bash
npm install
```
### Generate sample logs
```bash
npm run generate
```
This creates:
logs/generated.log
Analyze logs
```bash
npm run analyze logs/generated.log
```
You can also analyze any custom log file:
```bash
npm run analyze path/to/logfile.log
```
## 2. Stack choice

- I chose TypeScript with Node.js because it is lightweight, fast to develop with, and well-suited for CLI tools that process text files.
- TypeScript also helped reduce mistakes while working with different log formats and parsing logic.
- Node.js was a good fit because file reading and string processing are simple and efficient for this type of task.
- A worse choice would have been using a heavy frontend framework or a database-driven architecture because the assessment mainly focuses on parsing robustness and handling malformed input rather than UI or persistence.

## 3. One real edge case

One important edge case handled by the project is malformed JSON log lines.

Location:
```bash
src/index.ts
```
The JSON parsing logic is wrapped inside a try/catch block.

If a malformed JSON log appears, the analyzer:

- increases the malformed counter
- skips the invalid line
- continues processing the remaining logs

Without this handling, the entire program would crash when encountering invalid JSON input.

## 4. AI usage

I used ChatGPT to:

- understand the assessment requirements
- debug TypeScript setup issues
- improve parsing logic
- structure the README and ANSWERS documentation
- discuss edge cases and malformed input handling

One example where I changed the AI-generated output was the parser structure for handling standard logs and JSON logs together.

The original approach was more complicated, so I simplified the control flow and variable handling to make the code easier to understand and maintain.

## 5. Honest gap

One limitation in the current submission is that timestamp parsing is still minimal.

The analyzer currently accepts timestamps as part of the log format but does not fully normalize multiple timestamp formats into a single internal representation.

With another day, I would improve this by:

- adding dedicated timestamp parsing utilities
- supporting Unix epoch timestamps more robustly
- validating invalid date formats
- generating time-based analytics such as request frequency over time