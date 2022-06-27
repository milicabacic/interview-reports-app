import insight from "../../images/insight.png";
import bin from "../../images/bin.png";
import edit from "../../images/edit.png";
import "./tableRow.scss";
import moment from "moment";
import { useState } from "react";
import Modal from "../Modal/Modal";

const TableRow = (props) => {
  const { report, editable } = props;
  const { candidate, company } = report;
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="table-row">
        <div className="table-row-wrapper">
          <div className="report-company">
            <div className="cell-name">Company</div>
            <div>{report.company.name}</div>
          </div>
          <div className="report-date">
            <div className="cell-name">Interview Date</div>
            <div>{moment(report.interviewDate).format("DD.MM.YYYY.")}</div>
          </div>
          <div className="report-status">
            <div className="cell-name">Status</div>
            <div>{report.status}</div>
          </div>
          <div id="insight">
            <img src={insight} onClick={() => setOpen(true)}></img>
            {editable? <img src={edit} alt="edit-image"></img> : null}
            {editable? <img src={bin} alt="bin-image"></img> : null}
          </div>
        </div>
      </div>
      <Modal open={open} onClose={()=>setOpen(false)}>
        <div className="modal-wrapper">
          <div className="report-header">
            <h2>Report details</h2>
            <br></br>
            <hr></hr>
          </div>
          <div className="columns">
            <div className="column1">
              <div className="candidate-name">Candidate Name:</div>
              <h3>{candidate.name}</h3>
              <div className="company-name">Company name:</div>
              <h3>{company.name}</h3>
              <div className="interview-date">Interview date:</div>
              <h3>{moment(report.interviewDate).format("DD.MM.YYYY.")}</h3>
              <div className="phase">Phase:</div>
              <h3>{report.phase}</h3>
              <div className="status">Status:</div>
              <h3>{report.status}</h3>
            </div>
            <div className="column2">
              <div className="note">Note:</div>
              <div className="note-data">{candidate.note}</div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TableRow;
