import { Outlet, Link } from "react-router-dom";
import "./styles.css";

const Navigation = () => {
  return (
    <>
      <div className="navbar">
        <Link className="logo" to="/">
          <img className="logo-img" src="/images/logo.jpg" />
        </Link>
        <div className="links-container">
          <Link className="nav-link" to="/shop">SHOP</Link>
          <Link className="nav-link" to="/shop">CONTACT</Link>
          <Link className="nav-link" to="/auth">SIGN-IN</Link>
        </div>
      </div>

      <Outlet />
    </>
  )
}

export default Navigation;