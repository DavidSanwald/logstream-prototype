/** @jsx jsx */
import { jsx } from "@emotion/core";
import { LogsTable } from "LogsTable";
import data from "testlogs.json";

const levels = [
  "INFO",
  "SUCCESS",
  "WARNING",
  "ERROR",
  "CRITICAL",
  "DEBUG",
] as const;
type Level = typeof levels[number];

type RawLog = {
  created: number;
  filename: string;
  funcName: string;
  levelname: Level;
  lineno: number;
  module: string;
  msg: string;
  name: string;
  pathname: string;
  process: number;
  processName: string;
  thread: number;
  threadName: string;
};

function App() {
  return (
    <div css={{ height: 400 }}>
      <LogsTable data={data as RawLog[]} />
    </div>
  );
}

export default App;
