import React, { useState, useEffect } from "react";
import axios from "../util/axios";
import { Link } from "react-router-dom";
const HardReset = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    async function reset() {
      localStorage.clear();
      const res = await axios.get("/questionBank/hardRESET");
      const { data } = res;
      //   console.log(data);
      //   console.log(res);
      setData(data.msg);
    }
    reset();
  });
  return (
    <>
      <h1>RESET PAGE</h1>
      <h6>{data}</h6>
      {data && <Link to="/dashboard">Back to dashboard</Link>}
    </>
  );
};

export default HardReset;
