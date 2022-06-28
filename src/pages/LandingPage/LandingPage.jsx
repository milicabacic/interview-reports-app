import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import "./landingPage.scss";
import { UserContext } from "../../App";
import { useContext, useState } from "react";
import { CandidateContext } from "../../App";
import Pagination from "../../components/Pagination/Pagination";
import search from "../../images/search.png"

const LandingPage = () => {
  const { userToken, setUserToken } = useContext(UserContext);
  const { candidates, setCandidates } = useContext(CandidateContext);
  const [page, setPage] = useState(1);
  const [searchingValue, setSearchingValue] = useState("");

  const previousPage = function() {
    if(page!==1)
    setPage(page-1)
  }
  const nextPage = function() {
    if(page!==Math.ceil(candidates.length/4))
    setPage(page+1)
  }

  return (
    <div className="landing-page">
      <Header></Header>
      <h2 className="title">Candidates</h2>
      <div className="candidates">
        <div className="search">

        <input type="search" value={searchingValue} onChange={(e) => setSearchingValue(e.target.value)} placeholder="Type here to search"></input>
        
        </div>
        <div className="candidates-wrapper">

        {candidates
          .filter((e, index) => index >= (page - 1) * 4 && index < page * 4).filter(e=> e.name.includes(searchingValue))
          .reverse()
          .map((e) => {
            return (
              <Card key={e._id} candidate={e} editable={!!userToken}></Card>
              );
            })}
            </div>
            <Pagination page={page} setPage={setPage} previousPage={previousPage} nextPage={nextPage}></Pagination>
      </div>

      
    </div>
  );
};

export default LandingPage;
