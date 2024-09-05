import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Read from "../src/components/Read.js";
import Home from "../src/components/Home.js";
import Update from "../src/components/Update.js";
import Create from "../src/components/Create.js";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/create"
          element={
              <Create />
          }
        ></Route>
        <Route
          path="/update/:id"
          element={
              <Update />
          }
        ></Route>
        <Route
          path="/read/:id"
          element={
              <Read />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
    </>
   
  );
}

export default App;
