import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Pages/login";
import Signup from "../Pages/signup";
import Home from "../Pages/home";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
