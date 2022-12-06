import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import TableComponent from "./components/Table";
import { Table } from "react-bootstrap";
import { IUser } from "./types/types";

function App() {
  const baseUrl = "http://localhost:3004/user";

  const [users, setUsers] = useState<IUser[]>([]);
  console.log(users);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await axios.get<IUser[]>(baseUrl);
      setUsers(response.data);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="app">
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Work</th>
            <th>hobby</th>
          </tr>
        </thead>
        <tbody>
          <TableComponent users={users} />
        </tbody>
      </Table>
    </div>
  );
}

export default App;
