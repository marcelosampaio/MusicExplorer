import { Link } from "react-router-dom";
import "./../styles/NavBar.css";

function NavBar() {
  return (
    <nav className="nav-bar">
      <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
      <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
      <Link to="/register" style={{ marginRight: "10px" }}>Registro</Link>
      <Link to="/profile" style={{ marginRight: "10px" }}>Perfil</Link>
    </nav>
  );
}

export default NavBar;