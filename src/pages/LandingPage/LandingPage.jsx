import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import "./landingPage.scss";
import { UserContext } from "../../App";
import { useContext } from "react";

const LandingPage = () => {

  const {userToken, setUserToken} = useContext(UserContext);

  return (
    <div className="landing-page">
      <Header></Header>
      <h2 className="title">Candidates</h2>
      <div className="users">
        {[1, 2, 3, 4, 5].map((e) => {
          return <Card></Card>;
        })}
      </div>
    </div>
  );
};

export default LandingPage;
