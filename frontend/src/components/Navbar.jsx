import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-title">🍬 Sweet Shop</h2>

      {user && (
        <div className="navbar-right">
          <span className="navbar-user">
            {user.name}
            <span
              className={`role-badge ${
                user.role === "admin" ? "admin" : "user"
              }`}
            >
              {user.role}
            </span>
          </span>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
