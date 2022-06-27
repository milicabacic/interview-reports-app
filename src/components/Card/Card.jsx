import "./card.scss";
import avatar from "../../images/UserAvatar.png";
import close from "../../images/close.png";
import edit from "../../images/edit.png";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const { candidate, editable } = props;

  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => navigate(`/candidates/${candidate._id}`)}
    >
      <div className="icons">
        {editable ? (
          <img className="edit-img" src={edit} alt="edit-image"></img>
        ) : null}
        {editable ? (
          <img className="close-img" src={close} alt="edit-image"></img>
        ) : null}
      </div>

      <img src={candidate.avatar} alt="user-avatar"></img>
      <h2 className="username">{candidate.name}</h2>
      <h4 className="usermail">{candidate.email}</h4>
    </div>
  );
};

export default Card;
