import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@heroui/react";
import { useCallback } from "react";
import { EyeIcon } from "../icons/EyeIcon";
import { HeartOutlineIcon } from "../icons/HeartOutlineIcon";
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
  { name: "ACTIONS", uid: "actions" },
];
const FlatList = ({ flats = [], toggleFavorite }) => {
  const renderCell = useCallback((flat, columnKey) => {
    const cellValue = flat[columnKey];
    switch (columnKey) {
      case "hasAC":
        return cellValue ? "YES" : "NO";
      case "rentPrice":
        return `$${cellValue}`;
      case "dateAvailable":
        return new Date(cellValue).toLocaleDateString();
      case "actions":
        return (
          <div className="flex gap-2">
            {flat.isFavorite ? (
              <Tooltip
                content="Remove from favorites"
                className="hover:cursor-pointer"
                placement="left"
                color="secondary"
                showArrow
              >
                <button
                  onClick={() => {
                    toggleFavorite(flat._id);
                  }}
                >
                  <HeartOutlineIcon className="text-red-500 fill-red-500" />
                </button>
              </Tooltip>
            ) : (
              <Tooltip
                content="Add to favorites"
                className="hover:cursor-pointer"
                placement="left"
                color="secondary"
                showArrow
              >
                <button
                  onClick={() => {
                    toggleFavorite(flat._id);
                  }}
                >
                  <HeartOutlineIcon className="text-txtlight dark:text-txtdark" />
                </button>
              </Tooltip>
            )}
            <Tooltip
              content="Details"
              className="hover:cursor-pointer"
              placement="left"
              color="secondary"
              showArrow
            >
              <span>
                <EyeIcon className="text-txtlight dark:text-txtdark" />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
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
