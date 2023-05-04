import './App.scss';
import { Outlet } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Header } from "./components";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

function App() {

  return (
    <ApolloProvider client={client}>
      <div>
        <Header />
        <Outlet />
      </div>
    </ApolloProvider>
  )
}

export default App
