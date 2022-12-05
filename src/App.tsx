import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const baseUrl = "http://localhost:3004/user";

  useEffect(() => {
    axios.get(baseUrl).then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <div className="app">
      <h3>App</h3>
    </div>
  );
}

export default App;
