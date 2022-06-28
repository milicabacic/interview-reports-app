import Header from "../../components/Header/Header";
import Report from "../../components/Report/Report";
import "./reports.scss";
import { ReportContext, UserContext } from "../../App";
import { useContext, useState } from "react";

const Reports = () => {
  const { userToken, setUserToken } = useContext(UserContext);
  const { reports, setReports } = useContext(ReportContext);
  const [searchingValue, setSearchingValue] = useState("");

  return (
    <div className="reports">
      <Header></Header>
      <h2 className="title">Reports</h2>
      <div className="search">
        <input
          type="search"
          value={searchingValue}
          onChange={(e) => setSearchingValue(e.target.value)}
          placeholder="Type here to search"
        ></input>
      </div>
      {reports
        .filter(
          (e) =>
            e.candidate.name.includes(searchingValue) ||
            e.company.name.includes(searchingValue)
        )
        .reverse()
        .map((e) => (
          <Report report={e} editable={!!userToken}></Report>
        ))}
    </div>
  );
};

export default Reports;
