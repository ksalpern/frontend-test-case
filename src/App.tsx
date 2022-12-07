import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import TableComponent from "./components/Table";
import { Table } from "react-bootstrap";
import { IUser } from "./types/types";
import Button from "react-bootstrap/Button";
import FormComponent from "./components/Form";

function App() {
  //const baseUrl = "http://localhost:3004/user?_limit=30";

  const [users, setUsers] = useState<IUser[]>([]);
  console.log(users);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  const [modalShow, setModalShow] = useState(false);
  const [newRow, setNewRow] = useState({});

  // users.unshift(newRow);

  const getInputFormData = ({
    id,
    name,
    email,
    description,
  }: {
    id: string;
    name: string;
    email: string;
    description: string;
  }): void => {
    setNewRow({ id, name, email, description });
    console.log(newRow);
  };

  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/comments?_limit=20&_page=${currentPage}`
      )
      .then((res) => {
        console.log(res.data);
        setUsers([...users, ...res.data]);
      })

      // .catch(function (error) {
      //   // handle error
      //   console.log(error);
      // })
      .finally(() => setFetching(false));
  }, [currentPage]);

  const scrollToEnd = () => {
    setCurrentPage(currentPage + 1);
  };

  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      scrollToEnd();
    }
  };

  return (
    <div className="app">
      <Button variant="dark" onClick={() => setModalShow(true)}>
        Add user to the table
      </Button>

      {modalShow && (
        <FormComponent
          show={modalShow}
          onHide={() => setModalShow(false)}
          getInputFormData={getInputFormData}
        />
      )}

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
          <TableComponent users={users} />
        </tbody>
      </Table>
    </div>
  );
}

export default App;
