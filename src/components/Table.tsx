import React from "react";
import { IUser } from "../types/types";

interface UserListProps {
  users: IUser[];
}

const TableComponent: React.FC<UserListProps> = ({ users }) => {
  return (
    <>
      {users.map((user) => {
        return (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.work}</td>
            <td>{user.hobby}</td>
          </tr>
        );
      })}
    </>
  );
};

export default TableComponent;
