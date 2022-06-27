import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyContext } from "../../App";
import { SelectedCompanyContext } from "../../pages/CreateReport/CreateReport";
import "./reportStep2.scss";


const ReportStep2 = () => {

    const {companies, setCompanies} = useContext(CompanyContext);

    const {selectedCompany, setSelectedCompany} = useContext(SelectedCompanyContext);

    let navigate = useNavigate();

return <div className="companies-container">

    <div className="companies-wrapper">
    {companies.map ((e) => <div key = {e._id}className={selectedCompany?._id === e._id? "company selected" : "company"} onClick={() => setSelectedCompany(e)} >{e.name}</div>)}
    </div>
    <div className="buttons">

    <button className="back-button" onClick={() => navigate("/new-report/step/1")}>BACK</button>
    <button className="next-button" onClick={() => navigate("/new-report/step/3")}>NEXT</button>
    </div>
</div>

}

export default ReportStep2;