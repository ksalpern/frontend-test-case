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
            <td>{user.postId}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.body}</td>
          </tr>
        );
      })}
    </>
  );
};

export default TableComponent;
