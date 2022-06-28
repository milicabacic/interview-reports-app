import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { postCandidate, patchCandidate } from "../../api";
import "./createCandidate.scss";
import { CandidateContext, UserContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import userAvatar from "../../images/UserAvatar.png";

const CreateCandidate = () => {
  const { userToken } = useContext(UserContext);
  const { candidates, setCandidates } = useContext(CandidateContext);

  const [githubUsers, setGithubUsers] = useState([]);

  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const candidate = candidates.find((e) => e._id === id);

    setSelectedName(candidate ? candidate.name : "");
    setSelectedEmail(candidate ? candidate.email : "");
    setSelectedBirthday(
      candidate
        ? moment(candidate.birthday).format("yyyy-MM-DD")
        : moment(new Date()).format("yyyy-MM-DD")
    );
    setSelectedAvatar(candidate ? candidate.avatar : "");
    setSelectedEducation(candidate ? candidate.education : "");
  }, [candidates, id]);

  const [open, setOpen] = useState(false);

  const [error, setError] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [selectedBirthday, setSelectedBirthday] = useState(
    moment(new Date()).format("yyyy-MM-DD")
  );
  const [selectedEducation, setSelectedEducation] = useState("");

  const addCandidate = function () {
    postCandidate(
      selectedAvatar,
      selectedName,
      selectedBirthday,
      selectedEmail,
      selectedEducation,
      userToken
    )
      .then((data) => {
        setCandidates([...candidates, data]);
        navigate("/");
      })
      .catch(({ message }) => setError(message));
  };

  const updateCandidate = function () {
    patchCandidate(
      id,
      selectedAvatar,
      selectedName,
      selectedBirthday,
      selectedEmail,
      selectedEducation,
      userToken
    )
      .then(() => {
        setCandidates(
          candidates.map((e) => {
            if (e._id !== id) return e;
            else
              return {
                avatar: selectedAvatar,
                name: selectedName,
                email: selectedEmail,
                birthday: selectedBirthday,
                education: selectedEducation,
              };
          })
        );
        navigate("/");
      })
      .catch(({ message }) => setError(message));
  };

  const findUsers = function (e) {
    if (e.keyCode === 13) {
      const searchingValue = e.target.value;

      fetch(`https://api.github.com/search/users?q=${searchingValue}`)
        .then((res) => res.json())
        .then((data) => setGithubUsers(data.items));
    }
  };

  return (
    <>
      <div className="candidate-container">
        <Header></Header>
        <main className="main">
          <div className="candidate-placeholder">
            <h3 className="name">Name:</h3>
            <input
              type="text"
              value={selectedName}
              onChange={(e) => setSelectedName(e.target.value)}
            ></input>

            <h3 className="email">Email:</h3>
            <input
              type="text"
              value={selectedEmail}
              onChange={(e) => setSelectedEmail(e.target.value)}
            ></input>

            <h3 className="avatar">Avatar URL: <span onClick={()=> setOpen(true)}>search github</span></h3>
            <input
              type="text"
              value={selectedAvatar}
              onChange={(e) => setSelectedAvatar(e.target.value)}
            ></input>

            <h3 className="birthday">Birthday:</h3>
            <input
              type="date"
              value={selectedBirthday}
              onChange={(e) => setSelectedBirthday(e.target.value)}
            ></input>

            <h3 className="education">Education:</h3>
            <input
              type="text"
              value={selectedEducation}
              onChange={(e) => setSelectedEducation(e.target.value)}
            ></input>
            <div className="submit-button">
              <button onClick={id ? updateCandidate : addCandidate}>
                Save
              </button>
              {error && <p>{error}</p>}
            </div>
          </div>
        </main>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="github-users">
          <input
            type="search"
            placeholder="Search github by username"
            onKeyDown={findUsers}
          ></input>
          <div className="users-wrapper">
            {githubUsers.map((e) => (
              <div className="user-placeholder">
                <img src={e.avatar_url} alt="img-avatar"></img>
                <p>{e.login}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateCandidate;
