import Header from "../../components/Header/Header";
import {Link} from "react-router-dom";
import "./register.scss";

const Login = () => {
  return (
    <div className="register-container">
      <Header></Header>
      <main className="main">
        <div className="register-placeholder">
          <h3 className="name">Name:</h3>
          <input type="text"></input>
          <h3 className="email">Email:</h3>
          <input type="text"></input>
          <h3 className="password">Password:</h3>
          <input type="password"></input>
          <div className="Signup-button">
            <button>Sing Up</button>
          </div>
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </main>
    </div>
  );
};

export default Login;
