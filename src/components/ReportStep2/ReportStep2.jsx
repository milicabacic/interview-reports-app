import "./reportStep2.scss";

const ReportStep2 = () => {


return <div className="companies-container">
    {[1,2,3,4,5,6].map (() => <div className="company">Company</div>)}
    <div className="buttons">

    <button className="back-button">BACK</button>
    <button className="next-button">NEXT</button>
    </div>
</div>

}

export default ReportStep2;