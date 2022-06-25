import Header from "../../components/Header/Header";
import ReportStep1 from "../../components/ReportStep1/ReportStep1";
import ReportStep2 from "../../components/ReportStep2/ReportStep2";
import ReportSteps from "../../components/ReportSteps/ReportSteps";
import ReportStep3 from "../../components/ReportStep3/ReportStep3";
import { Outlet, Navigate} from "react-router-dom";
import "./createReport.scss"
import { UserContext } from "../../App";
import { useContext } from "react";

const CreateReport = () => {

    const {userToken, setUserToken} = useContext(UserContext);

    return (<div className="creating-report">
        <Header></Header>
       
        <div className="steps-wrapper">
        <ReportSteps></ReportSteps>
        {/* <ReportStep3></ReportStep3> */}
        <>
        <Outlet></Outlet>
        </>
        </div>
    </div>);
}

export default CreateReport;