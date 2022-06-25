import Header from "../../components/Header/Header";
import Report from "../../components/Report/Report"
import "./reports.scss"
import { UserContext } from "../../App";
import { useContext } from "react";

const Reports = () => {

  const {userToken, setUserToken} = useContext(UserContext);


  return (
    <div className="reports">
      <Header></Header>
      {[1,2,3,4,5].map(e => <Report></Report>)}
    </div>
  );
};

export default Reports;
