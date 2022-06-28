import "./card.scss";
import avatar from "../../images/UserAvatar.png";
import close from "../../images/close.png";
import edit from "../../images/edit.png";
import { useNavigate } from "react-router-dom";
import { deleteCandidate } from "../../api";
import { useContext } from "react";
import { CandidateContext, UserContext } from "../../App";

const Card = (props) => {
  const { candidate, editable } = props;
  const { userToken } = useContext(UserContext);
  const { candidates, setCandidates } = useContext(CandidateContext);

  let navigate = useNavigate();

  const deleteSelectedCandidate = function (e) {
    e.stopPropagation();
    deleteCandidate(candidate._id, userToken).then(() =>
      setCandidates(candidates.filter((e) => e._id !== candidate._id))
    );
  };

  return (
    <div
      className="card"
      onClick={() => navigate(`/candidates/${candidate._id}`)}
    >
      <div className="icons">
        {editable ? (
          <img
            className="edit-img"
            src={edit}
            alt="edit-image"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit-candidate/${candidate._id}`);
            }}
          ></img>
        ) : null}
        {editable ? (
          <img
            className="close-img"
            src={close}
            alt="edit-image"
            onClick={deleteSelectedCandidate}
          ></img>
        ) : null}
      </div>

      <img src={candidate.avatar} alt="user-avatar"></img>
      <h2 className="username">{candidate.name}</h2>
      <h4 className="usermail">{candidate.email}</h4>
    </div>
  );
};

export default Card;
