/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { Fragment } from "react";
import { useLunr } from "useLunr";
import { useLunrIndex } from "useLunrIndex";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { FixedSizeList as List } from "react-window";
import { MultiFilterSelect } from "MultiFilterSelect";
import { applyFilters } from "useFilters";
import { Row } from "Row";

const levels = [
  "INFO",
  "SUCCESS",
  "WARNING",
  "ERROR",
  "CRITICAL",
  "DEBUG",
] as const;

const ROW_SIZE = 48;

const columns = [
  { dataKey: "created", width: 200 },
  { dataKey: "name", width: 200 },
  { dataKey: "levelname", width: 200 },
];

const fields = ["filename", "funcName", "msg", "name", "module", "pathname"];

type Props = {
  data: any[];
};
const buildStore = (data: any, refField: any) => {
  return data.reduce((acc, curr) => {
    acc[curr[refField]] = curr;
    return acc;
  }, {});
};
const width = 900;

const itemKey = (index, data) => data.items[index].created;

const arrayLikeToArray = (arrayLike) =>
  Array.isArray(arrayLike) ? arrayLike : Array.from(arrayLike);

const toOption = (list) =>
  arrayLikeToArray(list).map((line) => ({ label: line, value: line }));

function LogsTable({ data }: Props) {
  const index = useLunrIndex({
    documents: data,
    fields: fields,
  });

  const store = React.useMemo(() => buildStore(data, "name"), [data]);
  const [selectedSources, setSelectedSources] = React.useState([]);
  const [selectedLevels, setSelectedLevels] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");
  const results = useLunr(searchString, index, store);
  const unfiltered = searchString ? Object.values(results) : data;

  const resultData = unfiltered.filter((result) =>
    applyFilters(result, {
      levelname: selectedLevels.map(({ value }) => value),
      name: selectedSources.map(({ value }) => value),
    })
  );
  const sources = data.reduce((acc, curr) => acc.add(curr.name), new Set());

  return (
    <Fragment>
      <input
        onChange={(e) => setSearchString(e.target.value)}
        value={searchString}
      />
      <MultiFilterSelect
        options={toOption(sources)}
        onChange={setSelectedSources}
      />
      <MultiFilterSelect
        options={toOption(levels)}
        onChange={setSelectedLevels}
      />
      <Table css={{ width: "100%", height: "100%" }} component="div">
        <TableBody component="div" css={{ width: "100%" }}>
          <List
            height={400}
            width={width}
            itemCount={resultData.length}
            itemSize={ROW_SIZE}
            itemKey={itemKey}
            itemData={{
              columns,
              items: resultData,
            }}
          >
            {Row}
          </List>
        </TableBody>
      </Table>
    </Fragment>
  );
}

export { LogsTable };
