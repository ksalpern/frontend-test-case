import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import TableComponent from "./components/Table";
import { Table } from "react-bootstrap";
import { IUser } from "./types/types";

// interface TotalCount {
//   "set-cookie"?: string[] | undefined | number;
// }

function App() {
  //const baseUrl = "http://localhost:3004/user?_limit=30";

  const [users, setUsers] = useState<IUser[]>([]);
  console.log(users);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  // const [totalCount, setTotalCount] = useState<TotalCount>(0);

  useEffect(() => {
    // if (fetching) {
      console.log("fetching");
      axios
        .get(
          `https://jsonplaceholder.typicode.com/comments?_limit=35&_page=${currentPage}`
        )
        .then((res) => {
          console.log(res.data);
          setUsers([...users, ...res.data]);
          // setCurrentPage((prevState) => prevState + 1);
          // setTotalCount(res.headers);
        })

        // .catch(function (error) {
        //   // handle error
        //   console.log(error);
        // })
        .finally(() => setFetching(false));
    // }
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

  // useEffect(() => {
  //   document.addEventListener("scroll", scrollHandler);
  //   return function () {
  //     document.removeEventListener("scroll", scrollHandler);
  //   };
  // }, []);

  // const scrollHandler = (event: Event) => {
  //   const target = event.target as HTMLTextAreaElement;
  //   if (
  //     target.scrollHeight - (target.scrollTop + window.innerHeight) < 100 &&
  //     users.length < 500
  //   ) {
  //     setFetching(true);
  //   }
  // };

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
