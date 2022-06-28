import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import logout from "../../images/logout.png";
import "./header.scss";

const Header = () => {
  const { userToken, setUserToken } = useContext(UserContext);


  return (
    <div className="header">
      <h4>Interview reports</h4>
      <Link to="/">Candidates</Link>
      <Link to="/reports">Reports</Link>
      {userToken ? <Link to="/new-candidate">New Candidate</Link> : null}
      {userToken ? <Link to="/new-report">New Report</Link> : null}

      <div className="user-verification">
        {userToken ? (
          <img
            src={logout}
            alt="logout"
            onClick={() => {
              setUserToken(null);
              localStorage.removeItem("token");
            }}
          ></img>
        ) : null}
        {userToken ? null : (
          <Link className="register" to="/register">
            Register
          </Link>
        )}
        {userToken ? null : (
          <Link className="login" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
