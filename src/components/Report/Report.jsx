import insight from "../../images/insight.png";
import cancel from "../../images/cancelIcon.png";
import "./report.scss";

const Report = () => {
    return (<div className="report">
        <div className="report-company">Company</div>
        <div className="report-candidate">Candidate</div>
        <div className="report-date">Interview Date</div>
        <div className="report-status">Status</div>
        <div className="report-icons"><img src={insight}></img> <img src={cancel}></img></div>
    </div>);
}

export default Report;