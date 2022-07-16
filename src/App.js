import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Bill from "./components/Bill";
import Login from "./components/Login";
import Forgot from "./components/Forgot";
import Reset from "./components/Reset";

function App() {
  // const email = localStorage.getItem("email");
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/bill" element={<Bill />} />
      </Routes>
    </div>
  );
}

export default App;
