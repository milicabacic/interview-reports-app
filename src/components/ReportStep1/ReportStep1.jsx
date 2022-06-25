import "./reportStep1.scss";
import avatar from "../../images/UserAvatar.png";

const ReportStep1 = () => {



    return <div className="step1">

        <div className="candidates-container">

        {[1,2,3,4,5,6].map(()=> {
            return <div className="candidate">
                <img src={avatar} alt = "avatar"></img>
                <div className="candidate-data">

                <h4>Milica Bacic</h4>
                <h6>contact@example.com</h6>
                </div>
            </div>
        })}
        </div>


        <div className="next-button">
            <button>NEXT</button>
        </div>
    </div>
}

export default ReportStep1;