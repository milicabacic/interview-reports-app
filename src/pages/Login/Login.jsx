import Header from "../../components/Header/Header";
import {Link} from "react-router-dom";
import "./login.scss";
import { UserContext } from "../../App";
import { useContext } from "react";


const Login = () => {

    const {userToken, setUserToken} = useContext(UserContext);


    return (<div className="login-container">
        <Header></Header>
        <main className="main">

        <div className="login-placeholder">
            <h3 className="email">Email:</h3>
            <input type="text"></input>
            <h3 className="password">Password:</h3>
            <input type="password"></input>
            <div className="login-button">
            <button>Login</button>
            </div>
            <p>Don't have an account? <Link to="/register">Sing up</Link></p>
        </div>
        </main>
    </div>);
}

export default Login;