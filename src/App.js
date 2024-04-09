import { Routes, Route } from "react-router-dom";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import EditMusic from "./EditMusic";
function App() {
  return (
    <div>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="main" element={<Main />} />
        <Route path="register" element={<Register />} />
        <Route path="editMusic" element={<EditMusic />} />
      </Routes>
    </div>
  );
}

export default App;
