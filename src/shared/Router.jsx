import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Join from "../pages/Join";
import Detail from "../pages/Detail";
import Login from "../pages/Login";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
