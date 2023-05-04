import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx';
import { Client, ClientForm, Project, ProjectMaster, ClientMaster } from "./components";
import './index.scss';

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
            path: "client",
            element: <ClientMaster />,
          },
          {
            path: "client/client-form",
            element: <ClientForm />,
          },
        ]
      },
      {
        path: "/",
        element: <Project />,
        children: [
          {
            path: "project",
            element: <ProjectMaster />,
          },
        ]
      }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
