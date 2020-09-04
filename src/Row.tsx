import { TableRow, TableCell } from "@material-ui/core";
import React from "react";

const ROW_SIZE = 48;

const Row = ({ index, style, data: { columns, items } }) => {
  const item = items[index];

  return (
    <TableRow
      component="div"
      css={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "center",
        boxSizing: "border-box",
        minWidth: "100%",
        width: "100%",
      }}
      style={style}
    >
      {columns.map((column, colIndex) => {
        return (
          <TableCell
            css={{
              display: "block",
              flexGrow: 0,
              flexShrink: 0,
              width: column.width,
              height: ROW_SIZE,
            }}
            key={item[column.dataKey] + colIndex}
            component="div"
            variant="body"
            align={column.numeric || false ? "right" : "left"}
          >
            {item[column.dataKey]}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export { Row };
