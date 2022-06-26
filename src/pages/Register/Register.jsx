import Header from "../../components/Header/Header";
import {Link, useNavigate} from "react-router-dom";
import { register } from "../../api";
import { useState } from "react";
import "./register.scss";

const Register = () => {
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ error, setError ] = useState("NE RADI TI OVO");

  const navigate = useNavigate()

  const registerUser = function () {
    register(name, email, password)
      .then(() => navigate("/login"))
      .catch(({message}) => setError(message));
  };
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
            <button onClick={registerUser}>Sing Up</button>
          </div>
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </main>
    </div>
  );
};

export default Register;
