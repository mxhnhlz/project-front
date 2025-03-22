import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductPage() {
  const { tg_id, id } = useParams();
  console.log(id);
  return <div>P</div>;
}

export default ProductPage;
