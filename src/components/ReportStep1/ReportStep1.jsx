import "./reportStep1.scss";
import avatar from "../../images/UserAvatar.png";
import { useContext, useState } from "react";
import { CandidateContext } from "../../App";
import { SelectedCandidateContext } from "../../pages/CreateReport/CreateReport";
import { useNavigate } from "react-router-dom";

const ReportStep1 = () => {

    const {candidates, setCandidates} = useContext(CandidateContext);

    const {selectedCandidate, setSelectedCandidate} = useContext(SelectedCandidateContext);

    let navigate = useNavigate();

    return <div className="step1">

        <div className="candidates-container">

        {candidates.map((e)=> {
            return <div key = {e._id}className={selectedCandidate?._id === e._id? "candidate selected" : "candidate"} onClick={() => setSelectedCandidate(e)}>
                <img src={e.avatar} alt = "avatar"></img>
                <div className="candidate-data">
                <h4>{e.name}</h4>
                <h6 className="email">{e.email}</h6>
                </div>
            </div>
        })}
        </div>


        <div className="next-button">
            <button onClick={()=> navigate("/new-report/step/2")}>NEXT</button>
        </div>
    </div>
}

export default ReportStep1;