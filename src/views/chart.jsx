import React, { useEffect, useState } from "react";
import ChartNode from "../components/chart-node/chart-node";
import style from "./styles/chart.module.css";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function Chart() {
  const [searchParams, setSearchParams] = useSearchParams();
  const editId = searchParams.get("id");
  const [data, setData] = useState();

  async function dataAxios() {
    await axios
      .get("http://localhost:3001/api/get")
      .then((result) => {
        setData(result.data);
      })
      .catch(setData({ error: "please refresh the page" }));
  }
  useEffect(() => {
    dataAxios();
    dataAxios();
  }, []);
  return (
    <main className={style["container"]}>
      {data?.cells ? (
        <ChartNode data={data?.cells} refresh={dataAxios} editId={editId} nodeId={"main"} />
      ) : null}
    </main>
  );
}

export default Chart;
