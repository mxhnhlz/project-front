import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import db from "../../api/db";

function ProductPage() {
  const { tg_id, id } = useParams();
  const [offer, setOffer] = useState({});
  const loadOffer = useCallback(async () => {
    try {
      const data = await db.getOffer(id);
      setOffer(await JSON.stringify(data));
    } catch (error) {
      console.log("Error in roductPage, loadOffer ", error);
    }
  }, [id]);
  useEffect(() => {
    loadOffer();
  });
  return <div>P{offer ? `${offer}` : ""}</div>;
}

export default ProductPage;
