import { Container } from "react-bootstrap";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import { BlogProvider } from "./context/BlogContext";
import { UserProvider } from "./context/UserContext";
import Blogs from "./pages/Blogs";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";

function App() {
  return (
    <UserProvider>
      <BlogProvider>
        <Router>
          <AppNavbar />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/posts" element={<Blogs />} />
            </Routes>
          </Container>
        </Router>
      </BlogProvider>
    </UserProvider>
  );
}

export default App;
