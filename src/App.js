import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Login from "./components/login";
import NavBar from "./components/navBar";
const isAuthenticated = () => {
  const authenticationCookie = document.cookie.includes("authorization");
  const expirationDateValid = true;
  return authenticationCookie && expirationDateValid;
};

function App() {
  return (
    <Router>
      <div>
        {isAuthenticated() && <NavBar />}
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated() ? <Home /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated() ? <Login /> : <Navigate to="/" replace />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
