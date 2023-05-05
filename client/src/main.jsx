import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import {
  Client,
  ClientMaster,
  ClientView,
  ClientForm,
  Project,
  ProjectMaster,
} from "./components";
import "./index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Client />,
        children: [
          {
            path: "clients",
            element: <ClientMaster />,
          },
          {
            path: "clients/client-form",
            element: <ClientForm />,
          },
          {
            path: "clients/:clientId/edit",
            element: <ClientForm isEdit />,
          },
          {
            path: "clients/:clientId",
            element: <ClientView />,
          },
        ],
      },
      {
        path: "/",
        element: <Project />,
        children: [
          {
            path: "project",
            element: <ProjectMaster />,
          },
        ],
      },
      {
        path: "*",
        element: <div>404</div>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
