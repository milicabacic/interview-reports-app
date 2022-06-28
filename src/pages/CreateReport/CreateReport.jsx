import Header from "../../components/Header/Header";
import ReportStep1 from "../../components/ReportStep1/ReportStep1";
import ReportStep2 from "../../components/ReportStep2/ReportStep2";
import ReportSteps from "../../components/ReportSteps/ReportSteps";
import ReportStep3 from "../../components/ReportStep3/ReportStep3";
import { Outlet, Navigate, useNavigate, useParams } from "react-router-dom";
import { createContext } from "react";
import "./createReport.scss";
import { ReportContext, UserContext } from "../../App";
import { useContext, useState, useEffect } from "react";
import { postReport, patchReport } from "../../api";
import moment from "moment";

export const SelectedCandidateContext = createContext({});
export const SelectedCompanyContext = createContext({});
export const NewReportContext = createContext({});

const CreateReport = () => {
  const { userToken, setUserToken } = useContext(UserContext);

  let navigate = useNavigate();

  const { id } = useParams();

  const { reports, setReports } = useContext(ReportContext);
  const [error, setError] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    moment(new Date()).format("yyyy-MM-DD")
  );
  const [selectedPhase, setSelectedPhase] = useState("CV");
  const [selectedStatus, setSelectedStatus] = useState("Passed");
  const [selectedNote, setSelectedNote] = useState("");

  const addReport = function () {
    postReport(
      selectedCandidate,
      selectedCompany,
      selectedDate,
      selectedPhase,
      selectedStatus,
      selectedNote,
      userToken
    )
      .then((data) => {
        setReports([...reports, data]);
        navigate("/reports");
      })
      .catch(({ message }) => setError(message));
  };

  const updateReport = function () {
    patchReport(
      id,
      selectedCandidate,
      selectedCompany,
      selectedDate,
      selectedPhase,
      selectedStatus,
      selectedNote,
      userToken
    )
      .then(() => {
        navigate("/reports");
        setReports(
          reports.map((e) => {
            if (id === e._id)
              return {
                candidate: selectedCandidate,
                company: selectedCompany,
                interviewDate: selectedDate,
                phase: selectedPhase,
                status: selectedStatus,
                note: selectedNote,
              };
            else return e;
          })
        );
      })
      .catch(({ message }) => setError(message));
  };

  useEffect(() => {
    const report = reports.find((e) => e._id === id);

    setSelectedCandidate(report ? report.candidate : null);
    setSelectedCompany(report ? report.company : null);
    setSelectedDate(
      report
        ? moment(report.interviewDate).format("yyyy-MM-DD")
        : moment(new Date()).format("yyyy-MM-DD")
    );
    setSelectedPhase(report ? report.phase : "CV");
    setSelectedStatus(report ? report.status : "Passed");
    setSelectedNote(report ? report.note : "");
  }, [reports, id]);

  return (
    <SelectedCandidateContext.Provider
      value={{ selectedCandidate, setSelectedCandidate }}
    >
      <SelectedCompanyContext.Provider
        value={{ selectedCompany, setSelectedCompany }}
      >
        <NewReportContext.Provider
          value={{
            selectedDate,
            setSelectedDate,
            selectedPhase,
            setSelectedPhase,
            selectedStatus,
            setSelectedStatus,
            selectedNote,
            setSelectedNote,
            addReport,
            updateReport,
          }}
        >
          <div className="creating-report">
            <Header></Header>
            <h2 className="title">New Report</h2>
            <div className="steps-wrapper">
              <ReportSteps></ReportSteps>
              <div className="details-wrapper">
                <Outlet></Outlet>

                {error && <p className="submit-error">{error}</p>}
              </div>
            </div>
          </div>
        </NewReportContext.Provider>
      </SelectedCompanyContext.Provider>
    </SelectedCandidateContext.Provider>
  );
};

export default CreateReport;
