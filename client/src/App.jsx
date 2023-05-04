import './App.scss';
import { Outlet } from "react-router-dom";
import { Header } from "./components";
// import { Header, Clients } from "./components";

function App() {

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default App
