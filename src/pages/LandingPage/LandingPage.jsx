import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import "./landingPage.scss";
import { UserContext } from "../../App";
import { useContext } from "react";
import { CandidateContext } from "../../App";

const LandingPage = () => {

  const {userToken, setUserToken} = useContext(UserContext);
  const {candidates, setCandidates} = useContext(CandidateContext);

  return (
    <div className="landing-page">
      <Header></Header>
      <h2 className="title">Candidates</h2>
      <div className="users">
        {candidates.map((e) => {
          return <Card candidate={e} editable={!!userToken}></Card>;
        })}
      </div>
    </div>
  );
};

export default LandingPage;
