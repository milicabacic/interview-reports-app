import Header from "../../components/Header/Header";
import TableRow from "../../components/TableRow/TableRow";
import avatar from "../../images/UserAvatar.png";
import "./singleCandidate.scss";
import {useParams} from "react-router-dom";
import { UserContext, CandidateContext, ReportContext } from "../../App";
import { useContext } from "react";

const SingleCandidate = () => {

  const {userToken, setUserToken} = useContext(UserContext);
  const {candidates, setCandidates} = useContext(CandidateContext);
  const {reports, setReports} = useContext(ReportContext);
  


  const {id} = useParams();

  const candidate = candidates.filter(e => e._id === id);

  const candidatesReports = reports.filter(e=> e.candidate._id === id)

  return (
    <div className="single-candidate">
      <Header></Header>
      <div className="user">
        <div className="user-data">
          <img src={candidate.avatar} alt="avatar"></img>
          <div className="name-and-email">
            <h3>Name: {candidate.name}</h3>
            <h3>Email: {candidate.email}</h3>
          </div>
          <div className="dob-and-education">
            <h3>Date of birth: {candidate.birthday}</h3>
            <h3>Education: {candidate.education}</h3>
          </div>
        </div>
        <div className="line">

        <hr></hr>
        </div>
        <div className="reports">
          <h2>Reports</h2>
          <table className="reports-table">
            {candidatesReports.map((e) => (
              <TableRow report = {e}></TableRow>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default SingleCandidate;
