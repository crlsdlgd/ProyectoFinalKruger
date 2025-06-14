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
import { EyeIcon } from "../icons/eyeIcon";
import "./userList.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { formatDateToISOShort } from "../../utils/utils";

export const columns = [
  { name: "FIRST NAME", uid: "firstname" },
  { name: "LAST NAME", uid: "lastname" },
  { name: "EMAIL", uid: "email" },
  { name: " BIRTHDATE", uid: "birthdate" },
  { name: "ROLE", uid: "role" },
  { name: "ACTIONS", uid: "actions" },
];
const UserList = ({ users = [] }) => {
  const navigate = useNavigate();

  const viewUserButton = (user) => {
    return (
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
          onPress={() => navigate(`/profile/${user._id}`)}
        >
          <EyeIcon className="text-txtlight dark:text-txtdark" />
        </Button>
      </Tooltip>
    );
  };

  const formatCellValue = (user, key) => {
    const value = user[key];
    switch (key) {
      case "actions":
        return viewUserButton(user);
      case "birthdate":
        return formatDateToISOShort(value);
      default:
        return value;
    }
  };

  const renderCell = useCallback((user, key) => formatCellValue(user, key), []);

  return (
    <div className="max-w-[100vw] overflow-x-auto" id="user-list-container">
      <Table aria-label="Users Table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
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

export default UserList;
