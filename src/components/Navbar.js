import { Link } from "react-router-dom";
import "./../styles/NavBar.css";

function NavBar() {
  return (
    <nav className="nav-bar">
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/login">Login</Link>
      <Link className="nav-link" to="/register">Registro</Link>
      <Link className="nav-link" to="/profile">Perfil</Link>
    </nav>
  );
}

export default NavBar;