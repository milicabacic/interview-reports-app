import "./card.scss"
import avatar from "../../images/UserAvatar.png"
import { useNavigate } from "react-router-dom";

const Card = (props) => {

    const {candidate} = props;

    const navigate = useNavigate();

    return (<div className="card" onClick={() => navigate(`/candidates/${candidate._id}`)}>
        <img src={candidate.avatar} alt="user-avatar"></img>
        <h2 className="username">{candidate.name}</h2>
        <h4 className="usermail">{candidate.email}</h4>
    </div>);
}

export default Card;