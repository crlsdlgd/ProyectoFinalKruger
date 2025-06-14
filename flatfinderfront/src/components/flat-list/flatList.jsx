import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@heroui/react";
import { useCallback } from "react";
import { EyeIcon } from "../icons/eyeIcon";
import { HeartOutlineIcon } from "../icons/heartOutlineIcon";
import "./flatList.css";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../favorite-button/FavoriteButton";
import { formatDateToISOShort } from "../../utils/utils";

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

const FlatList = ({ flats = [], handleFavorite }) => {
  const navigate = useNavigate();
  const renderFavoriteButton = (flat) => {
    const isFavorite = flat.isFavorite;
    const iconClass = isFavorite
      ? "text-red-500 fill-red-500"
      : "text-txtlight dark:text-txtdark";
    const tooltipText = isFavorite
      ? "Remove from favorites"
      : "Add to favorites";

    return (
      <Tooltip
        content={tooltipText}
        className="hover:cursor-pointer"
        placement="top"
        color="secondary"
        delay={1000}
        showArrow
      >
        <button onClick={() => handleFavorite(flat._id)}>
          <HeartOutlineIcon className={iconClass} />
        </button>
      </Tooltip>
    );
  };

  const renderActions = (flat) => (
    <div className="flex gap-2">
      <FavoriteButton
        isFavorite={flat.isFavorite}
        onClick={() => handleFavorite(flat._id)}
      />
      <Tooltip
        content="Details"
        className="hover:cursor-pointer"
        placement="top"
        color="secondary"
        delay={1000}
        showArrow
      >
        <Button
          className="min-w-10 w-10 p-0 rounded-full bg-transparent"
          onPress={() => navigate(`/view-flat/${flat._id}`)}
        >
          <EyeIcon className="text-txtlight dark:text-txtdark" />
        </Button>
      </Tooltip>
    </div>
  );

  const formatCellValue = (flat, key) => {
    const value = flat[key];
    switch (key) {
      case "hasAC":
        return value ? "YES" : "NO";
      case "rentPrice":
        return `$${value}`;
      case "dateAvailable":
        return new Date(flat.dateAvailable).getTime() < Date.now()
          ? "Available Now"
          : formatDateToISOShort(flat.dateAvailable);
        break;
      case "actions":
        return renderActions(flat);
      default:
        return value;
    }
  };

  const renderCell = useCallback(
    (flat, columnKey) => formatCellValue(flat, columnKey),
    [handleFavorite]
  );

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
  );
};

export default FlatList;
