import React from "react";
import { useParams } from "react-router-dom";
import Menu from "../components/menu/Menu";

function Favorites() {
  const { tg_id } = useParams();
  const userId = tg_id || 0;
  return <div>Favorites</div>;
}

export default Favorites;
