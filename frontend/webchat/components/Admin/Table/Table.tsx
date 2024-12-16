"use client";

import axios from "axios";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { useEffect, useState } from "react";

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/rooms/active-users/"
      );
      setData(response.data["Active users"]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);
  

  if (loading) {
    return (
      <section>
        <div className="container mx-auto py-10">Loading...</div>
      </section>
    );
  }

  return (
    <section>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
};

export default Table;
