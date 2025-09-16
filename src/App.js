import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import WelcomePage from "./views/WelcomePage";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/dashboard" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;