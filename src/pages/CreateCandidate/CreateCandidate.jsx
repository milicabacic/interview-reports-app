import React from "react";
import Header from "../../components/Header/Header";
import "./createCandidate.scss";

const CreateCandidate = () => {
  return (
    <div className="candidate-container">
      <Header></Header>
      <main className="main">
        <div className="candidate-placeholder">

          <h3 className="name">Name:</h3>
          <input type="text"></input>

          <h3 className="email">Email:</h3>
          <input type="text"></input>

          <h3 className="avatar">Avatar URL:</h3>
          <input type="text"></input>
          
          <h3 className="birthday">Birthday:</h3>
          <input type="date"></input>

          <h3 className="education">Education:</h3>
          <input type="password"></input>
          <div className="submit-button">
            <button>Save</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateCandidate;
