import React, { useEffect, useState } from "react";
import style from "./chart-node.module.css";
import { Link } from "react-router-dom";
import Form from "../form/form";

function ChartNode({ data, refresh, editId, nodeId }) {
  const [main, setMain] = useState();
  useEffect(() => {
    if (nodeId) {
      setMain(document.getElementById("main"));
    }
  }, []);

  const ratio = window.outerWidth / main?.offsetWidth;
  return (
    <div
      className={style["flex"]}
      id={nodeId}
      style={nodeId && ratio <= 1 ? { transform: `scale(${ratio})` } : null}
    >
      {data?.map((cell, index) => (
        <div key={index} className={style["container"]}>
          <svg width="1" height="20">
            <line x1="0" y1="20" x2="0" y2="0" stroke="black" />
          </svg>
          <div className={style["box"]}>
            {cell?.name && editId !== cell?.id ? (
              cell?.name
            ) : (
              <Form id={cell.id} refresh={refresh} editName={cell?.name} />
            )}
            <div>
              <Link to={`http://localhost:3001/api/new/${cell.id}`} className={style["add"]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M16,13h-3v3c0,0.552-0.448,1-1,1h0 c-0.552,0-1-0.448-1-1v-3H8c-0.552,0-1-0.448-1-1v0c0-0.552,0.448-1,1-1h3V8c0-0.552,0.448-1,1-1h0c0.552,0,1,0.448,1,1v3h3 c0.552,0,1,0.448,1,1v0C17,12.552,16.552,13,16,13z"></path>
                </svg>
              </Link>
              <Link to={`/?id=${cell.id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path d="M 18 2 L 15.585938 4.4140625 L 19.585938 8.4140625 L 22 6 L 18 2 z M 14.076172 5.9238281 L 3 17 L 3 21 L 7 21 L 18.076172 9.9238281 L 14.076172 5.9238281 z"></path>
                </svg>
              </Link>
              <Link
                to={`http://localhost:3001/api/delete/${cell.id}`}
                style={cell?.name ? null : { position: "relative", zIndex: 2 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="18"
                  height="18"
                  viewBox="0 0 48 48"
                >
                  <path d="M 24 4 C 20.491685 4 17.570396 6.6214322 17.080078 10 L 6.5 10 A 1.50015 1.50015 0 1 0 6.5 13 L 8.6367188 13 L 11.15625 39.029297 C 11.43025 41.862297 13.785813 44 16.632812 44 L 31.367188 44 C 34.214187 44 36.56875 41.862297 36.84375 39.029297 L 39.363281 13 L 41.5 13 A 1.50015 1.50015 0 1 0 41.5 10 L 30.919922 10 C 30.429604 6.6214322 27.508315 4 24 4 z M 24 7 C 25.879156 7 27.420767 8.2681608 27.861328 10 L 20.138672 10 C 20.579233 8.2681608 22.120844 7 24 7 z M 19.5 18 C 20.328 18 21 18.671 21 19.5 L 21 34.5 C 21 35.329 20.328 36 19.5 36 C 18.672 36 18 35.329 18 34.5 L 18 19.5 C 18 18.671 18.672 18 19.5 18 z M 28.5 18 C 29.328 18 30 18.671 30 19.5 L 30 34.5 C 30 35.329 29.328 36 28.5 36 C 27.672 36 27 35.329 27 34.5 L 27 19.5 C 27 18.671 27.672 18 28.5 18 z"></path>
                </svg>
              </Link>
            </div>
          </div>
          {cell.subGroups != 0 ? (
            <svg width="1" height="20">
              <line x1="0" y1="0" x2="0" y2="20" stroke="black" />
            </svg>
          ) : null}
          <div>
            {cell.subGroups != 0 ? (
              <ChartNode data={cell.subGroups} refresh={refresh} editId={editId} />
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChartNode;
