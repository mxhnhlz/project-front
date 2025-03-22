import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "./pages/components/menu/Menu";
import Main from "./pages/main/Main";
import Profile from "./pages/profile/Profile";
import Messages from "./pages/Messages/Messages";
import Favorites from "./pages/favorites/Favorites";
import Create from "./pages/create/Create";
import { PANELS } from "./pages/utils/constants";

function App() {
  const { tg_id } = useParams();
  const userId = tg_id || 0;
  const panel = JSON.parse(localStorage.getItem("panel"));
  const [activePanel, setActivePanel] = useState(panel || PANELS.MAIN);

  const handlePanelChange = (panel) => {
    setActivePanel(panel);
  };

  // Функция для рендеринга компонента в зависимости от активной панели
  const renderContent = () => {
    localStorage.setItem("panel", JSON.stringify(activePanel));
    switch (activePanel) {
      case PANELS.MAIN:
        return <Main tg_id={userId} />;
      case PANELS.FAVORITES:
        return <Favorites tg_id={userId} />;
      case PANELS.CREATE:
        return <Create tg_id={userId} />;
      case PANELS.MESSAGES:
        return <Messages tg_id={userId} />; // Что это такое, подумаем, вообще лучше убрать
      case PANELS.PROFILE:
        return <Profile tg_id={userId} />;
      default:
        return <Main tg_id={userId} />; // По умолчанию рендерим Main
    }
  };

  return (
    <div style={{ paddingBottom: "56px" }}>
      {/* Основной контент */}
      <div style={{ padding: "20px" }}>{renderContent()}</div>

      {/* Нижняя панель навигации */}
      <Menu onChange={handlePanelChange} />
    </div>
  );
}

export default App;
