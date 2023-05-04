import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx';
import { Clients, Project, ProjectMaster } from "./components";
import './index.scss';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "client",
        element: <Clients />,
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
