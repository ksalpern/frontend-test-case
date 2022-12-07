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
  const [validated, setValidated] = useState(false);

  const [id, setId] = useState<string>(``);
  const [name, setName] = useState<string>(``);
  const [email, setEmail] = useState<string>(``);
  const [description, setDescription] = useState<string>(``);

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const submitName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const submitId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const submitEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const submitDescr = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
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
          handleSubmit={() => handleSubmit}
          validated={validated}
          id={id}
          name={name}
          email={email}
          description={description}
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
