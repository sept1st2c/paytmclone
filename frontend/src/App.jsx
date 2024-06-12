import { Dashboard } from "./pages/Dashboard";
import { BrowserRouter } from "react-router-dom/dist/react-router-dom.development";
import { Route } from "react-router-dom/dist/react-router-dom.development";
import { Routes } from "react-router-dom/dist/react-router-dom.development";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Send } from "./pages/Send";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/send" element={<Send />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
