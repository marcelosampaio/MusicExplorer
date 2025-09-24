import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
      <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
      <Link to="/register">Registrar</Link>
    </nav>
  );
}

export default Navbar;
