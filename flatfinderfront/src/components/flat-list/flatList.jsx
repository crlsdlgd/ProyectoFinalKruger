import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useCallback } from "react";
import "./flatList.css";

export const columns = [
  { name: "CITY", uid: "city" },
  { name: "STREET NAME", uid: "streetName" },
  { name: "STREET NUMBER", uid: "streetNumber" },
  { name: "AREA SIZE", uid: "areaSize" },
  { name: "HAS AC", uid: "hasAC" },
  { name: "YEAR BUILT", uid: "yearBuilt" },
  { name: "RENT PRICE", uid: "rentPrice" },
  { name: "DATE AVAILABLE", uid: "dateAvailable" },
];
const FlatList = ({ flats = [] }) => {
  const renderCell = useCallback((flat, columnKey) => {
    const cellValue = flat[columnKey];
    switch (columnKey) {
      case "hasAC":
        return cellValue ? "YES" : "NO";
      case "rentPrice":
        return `$${cellValue}`;
      case "dateAvailable":
        return new Date(cellValue).toLocaleDateString();
      default:
        return cellValue;
    }
  }, []);

  return (
    // <ScrollShadow className="max-w-[100vw]" orientation="horizontal" size={100}>
    <div className="max-w-[100vw] overflow-x-auto" id="flat-list-container">
      <Table aria-label="Flats Table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={flats}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell className="whitespace-nowrap text-txtlight dark:text-txtdark">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    // </ScrollShadow>
  );
};

export default FlatList;
