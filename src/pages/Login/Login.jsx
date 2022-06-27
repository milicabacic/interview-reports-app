import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import "./login.scss";
import { UserContext } from "../../App";
import { useContext } from "react";
import { login } from "../../api";
import { useState } from "react";

const Login = () => {
  const { userToken, setUserToken } = useContext(UserContext);
  console.log(userToken, setUserToken);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginUser = function () {
    login(email, password)
      .then((data) => setUserToken(data.token))
      .catch(({ message }) => setError(message));
  };

  return (
    <div className="login-container">
      <Header></Header>

      <main className="main">
        <div className="login-placeholder">
          {error && <p className="login-error">{error}</p>}
          <h3 className="email">Email:</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          ></input>
          <h3 className="password">Password:</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
          ></input>
          <div className="login-button">
            <button onClick={loginUser}>Login</button>
          </div>
          <p>
            Don't have an account? <Link to="/register">Sing up</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
