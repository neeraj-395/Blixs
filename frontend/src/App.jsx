import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/SignUp";
import UserPage from "./routes/UserPage";
import Navbar from "./components/Navbar";
import Chats from "./routes/Chats";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const App = () => {
  return (
    <>
      <Router>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/user" element={<UserPage />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/direct/inbox" element={<Chats />} />
            <Route path="/direct/c/:chatid" element={<Chats />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
      </Router>
    </>
  );
};

export default App;
