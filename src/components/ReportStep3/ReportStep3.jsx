import React from "react";
import "./reportStep3.scss";

const ReportStep3 = () => {
  return (
    <div className="step3">
      <div className="details">

      <div className="date-picker">
        <p>Interview date:</p>
        <input type="date"></input>
      </div>
      <div className="phase">
        <p>Phase:</p>
        <select className="phase-select">
          <option>CV</option>
          <option>HR</option>
          <option>Technical</option>
          <option>Final</option>
        </select>
      </div>
      <div className="status">
        <p>Status:</p>
        <select className="status-select">
          <option>Select</option>
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
        <textarea id="notes" rows="8" cols="50"></textarea>
      </div>
      <div className="buttons">

      <div className="buttons">

      <button className="back-button">BACK</button>
      <button className="submit-button">SUBMIT</button>
      </div>
      </div>
      
    </div>
  );
};

export default ReportStep3;
