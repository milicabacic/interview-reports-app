import Header from "../../components/Header/Header";
import ReportStep1 from "../../components/ReportStep1/ReportStep1";
import ReportStep2 from "../../components/ReportStep2/ReportStep2";
import ReportSteps from "../../components/ReportSteps/ReportSteps";
import ReportStep3 from "../../components/ReportStep3/ReportStep3";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { createContext } from "react";
import "./createReport.scss";
import { ReportContext, UserContext } from "../../App";
import { useContext, useState } from "react";
import { postReport } from "../../api";
import moment from "moment";

export const SelectedCandidateContext = createContext({});
export const SelectedCompanyContext = createContext({});
export const NewReportContext = createContext({});


const CreateReport = () => {
  const { userToken, setUserToken } = useContext(UserContext);

  let navigate = useNavigate();

  const {reports, setReports} = useContext(ReportContext);
  const [error, setError] = useState("")
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("yyyy-MM-DD"));
  const [selectedPhase, setSelectedPhase] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedNote, setSelectedNote] = useState("");

  const submitReport = function() {
    postReport(selectedCandidate, selectedCompany, selectedDate, selectedPhase,selectedStatus,selectedNote).then((data) => {
        console.log(data)
        setReports([...reports, data]);
        navigate("/reports");
    }).catch(({message}) => setError(message));
  }

  return (
    <SelectedCandidateContext.Provider
      value={{ selectedCandidate, setSelectedCandidate }}
    >
      <SelectedCompanyContext.Provider
        value={{ selectedCompany, setSelectedCompany }}
      >
        <NewReportContext.Provider value={{selectedDate,setSelectedDate, selectedPhase,selectedPhase, selectedStatus, setSelectedStatus, selectedNote, setSelectedNote, submitReport}}>
        
                <div className="creating-report">
                  <Header></Header>
                  <h2 className="title">New Report</h2>
                  <div className="steps-wrapper">
                    <ReportSteps></ReportSteps>
                
                      <Outlet></Outlet>
                    
                  </div>
                  {error && <p className="submit-error">{error}</p>}
                </div>
                </NewReportContext.Provider>
      </SelectedCompanyContext.Provider>
    </SelectedCandidateContext.Provider>
  );
};

export default CreateReport;
