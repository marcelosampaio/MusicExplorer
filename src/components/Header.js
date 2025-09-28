import { Link } from "react-router-dom";
import "./../styles/Header.css";
import NavBar from "./NavBar";

function Header() {
  return (
    <header className="header">
      <h1 className="logo">🎵 Music Explorer</h1>
      <NavBar />
    </header>
  );
}

export default Header;
