import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import App from './App.jsx';
import { Clients } from "./components";
import './index.scss';

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    ),
    children: [
      {
        path: "client",
        element: (
          <ApolloProvider client={client}>
            <Clients />
          </ApolloProvider>
        ),
      }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
