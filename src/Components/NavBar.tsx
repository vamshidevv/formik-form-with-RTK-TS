import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <>
      <div className="nav-container">
        <nav>
          <div className="dashboard">
            <NavLink to={"dashboard"} className={"dash"}> Dashboard</NavLink>
          </div>
          <div className="register">
            <NavLink to={"register"} className={"dash"}> Registration</NavLink>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
