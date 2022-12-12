import React from "react";
import { Table } from "react-bootstrap";
import { IUser } from "../types/types";

interface UserListProps {
  users: IUser[];
}

const TableComponent: React.FC<UserListProps> = ({ users }) => {
  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </Table>
    </>
  );
};

export default TableComponent;
