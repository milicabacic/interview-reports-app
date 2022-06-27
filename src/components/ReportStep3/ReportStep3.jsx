import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./reportStep3.scss";
import { postReport } from "../../api";
import { NewReportContext } from "../../pages/CreateReport/CreateReport";

const ReportStep3 = () => {

  const {selectedDate, setSelectedDate, selectedPhase, setSelectedPhase, selectedStatus, setSelectedStatus, selectedNote, setSelectedNote, submitReport} = useContext(NewReportContext);


let navigate = useNavigate();

  return (
    <div className="step3">
      <div className="details">

      <div className="date-picker">
        <p>Interview date:</p>
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}></input>
      </div>
      <div className="phase">
        <p>Phase:</p>
        <select className="phase-select"
        value={selectedPhase} onChange={(e) => setSelectedPhase(e.target.value)}>
          <option>CV</option>
          <option>HR</option>
          <option>Technical</option>
          <option>Final</option>
        </select>
      </div>
      <div className="status">
        <p>Status:</p>
        <select className="status-select" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option>Passed</option>
          <option>Declined</option>
        </select>
      </div>
      </div>
      <div className="line">
        <hr></hr>
      </div>
      <div className="notes">
        <p>Notes:</p>
        <textarea id="notes" rows="8" cols="50" value={selectedNote} onChange={(e) => setSelectedNote(e.target.value)}></textarea>
      </div>
      <div className="buttons">

      <div className="buttons">

      <button className="back-button" onClick={() => navigate("/new-report/step/2")}>BACK</button>
      <button className="submit-button" onClick={submitReport}>SUBMIT</button>
      </div>
      </div>
      
    </div>
  );
};

export default ReportStep3;
