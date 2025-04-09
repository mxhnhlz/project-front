import React from "react";
import { useParams } from "react-router-dom";
import Menu from "../components/menu/Menu";

function Messages() {
  const { tg_id } = useParams();
  const userId = tg_id || 0;
  return (
    <div>
      messages
      <Menu tg_id={tg_id}></Menu>
    </div>
  ); //эта штука деприкейтед, либо отображать ссылки на диалоги с знакомыми юзерами
}

export default Messages;
