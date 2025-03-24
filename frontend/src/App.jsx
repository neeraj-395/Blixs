import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import User_page from "./routes/User-page";
import Navbar from "./routes/Navbar";
import Footer from "./routes/footer";

const App = () => {
  return (
    <>
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<User_page />} />
        </Routes>
      <Footer />
    </Router>
    </>
  );
};

export default App;
