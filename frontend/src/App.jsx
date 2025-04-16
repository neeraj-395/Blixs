import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
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
      <div className="ml-20 w-full">
        <Outlet />
      </div>
    </>
  );
}

const App = () => {
  return (
    <>
      <Router>
          <Routes>
            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              <Route path="/" element={<Home />} />
              <Route path="/user" element={<UserPage />} />
            </Route>

            <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
              <Route path="/direct/inbox" element={<Chats />} />
              <Route path="/direct/c/:chatid" element={<Chats />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
      </Router>
    </>
  );
};

export default App;