import axios from "axios";
import React from "react";
import style from "./form.module.css";
import { useSearchParams } from "react-router-dom";

function Form({ id, refresh, editName }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function newCell(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = [id, formData.get("name")];
    axios.post("http://localhost:3001/api/add", data).then(() => {
      setSearchParams("");
      refresh();
    });
  }

  return (
    <div className={style["container"]}>
      <div className={style["prevent"]}></div>
      <form onSubmit={newCell} className={style["form"]}>
        <label htmlFor="">name</label>
        <input
          autoFocus
          onBlur={({ target }) => target.focus()}
          type="text"
          name="name"
          id="name"
          placeholder="Enter the name"
          defaultValue={editName ? editName : null}
        />
        <button type="submit">sub</button>
      </form>
    </div>
  );
}

export default Form;
