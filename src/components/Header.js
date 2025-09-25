import { Link } from "react-router-dom";
import "./../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <h1 className="logo">🎵 Music Explorer</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favoritos</Link>
        <Link to="/profile">Perfil</Link>
      </nav>
    </header>
  );
}

export default Header;
