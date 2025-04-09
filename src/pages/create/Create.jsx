import React from "react";
import { useParams } from "react-router-dom";
import Menu from "../components/menu/Menu";

function Create() {
  const { tg_id } = useParams();
  const userId = tg_id || 0;
  return (
    <div>
      Create
      <Menu tg_id={tg_id}></Menu>
    </div>
  );
}

export default Create;
