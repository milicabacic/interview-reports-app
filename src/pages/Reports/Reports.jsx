import Header from "../../components/Header/Header";
import Report from "../../components/Report/Report"
import "./reports.scss"
import { ReportContext, UserContext } from "../../App";
import { useContext } from "react";

const Reports = () => {

  const {userToken, setUserToken} = useContext(UserContext);
  const {reports, setReports} = useContext(ReportContext);


  return (
    <div className="reports">
      <Header></Header>
      <h2 className="title">Reports</h2>
      {reports.slice().reverse().map(e => <Report report = {e} editable = {!!userToken}></Report>)}
    </div>
  );
};

export default Reports;
