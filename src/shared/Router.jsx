import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Login from '../pages/Login';
import Write from '../pages/Write';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import Write from "../pages/Write";
import Join from "../pages/Join";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/join" element={<Join />} />
                <Route path="/write" element={<Write />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<Detail />} />
        <Route path="/join" element={<Join />} />
        <Route path="/write" element={<Write />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
