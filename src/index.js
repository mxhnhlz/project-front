import React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";

import Main from "./pages/main/Main";
import Profile from "./pages/profile/Profile";
import Messages from "./pages/Messages/Messages";
import Favorites from "./pages/favorites/Favorites";
import Create from "./pages/create/Create";
//import Auth from "./pages/registration/auth/auth";
//import Regist from './pages/registration/registpage/regist'
//import Registration from './pages/registration/registration/Registration'
import ProductPage from "./pages/productPage/productPage";
const router = createBrowserRouter([
  { path: "/:tg_id", element: <Main /> },
  { path: "/", element: <Main /> },
  { path: "/Profile/:tg_id", element: <Profile /> },
  { path: "/Profile", element: <Profile /> },
  { path: "/Messages/:tg_id", element: <Messages /> },
  { path: "/Messages", element: <Messages /> },
  { path: "/Create/:tg_id", element: <Create /> },
  { path: "/Create", element: <Create /> },
  { path: "/Favorites/:tg_id", element: <Favorites /> },
  { path: "/Favorites", element: <Favorites /> },
  { path: "/Auth/:tg_id", element: <Profile /> },
  { path: "/Auth", element: <Profile /> },
  //  { path: '/Regist', element: <Regist /> },
  //  { path: '/Registration', element: <Registration /> },
  { path: "/product/:tg_id/:id", element: <ProductPage /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  </React.StrictMode>
);
