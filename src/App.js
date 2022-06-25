import React, { createContext } from "react";
import Login from "./pages/Login/Login";
import LandingPage from "./pages/LandingPage/LandingPage";
import SingleCandidate from "./pages/SingleCandidate/SingleCandidate";
import Reports from "./pages/Reports/Reports";
import CreateReport from "./pages/CreateReport/CreateReport";
import { useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ReactPortal from "./ReactPortal/ReactPortal";
import Modal from "./components/Modal/Modal";
import ReportStep1 from "./components/ReportStep1/ReportStep1";
import ReportStep2 from "./components/ReportStep2/ReportStep2";
import ReportStep3 from "./components/ReportStep3/ReportStep3";
import Register from "./pages/Register/Register";
import "./app.scss";
import CreateCandidate from "./pages/CreateCandidate/CreateCandidate";

const App = () => {
  const [userToken, setUserToken] = useState(true);
  const navigate = useNavigate();
  return (
    <>
      <UserContext.Provider value={{ userToken, setUserToken }}>
        <Routes>
          <Route
            path="/login"
            element={
              userToken ? <Navigate to="/reports"></Navigate> : <Login></Login>
            }
          ></Route>
          <Route
            path="/register"
            element={
              userToken ? (
                <Navigate to="/reports"></Navigate>
              ) : (
                <Register></Register>
              )
            }
          ></Route>
          <Route
            path="/new-candidate"
            element={
              userToken ? (
                <CreateCandidate></CreateCandidate>
              ) : (
                <Login></Login>
              )
            }
          ></Route>
          <Route exact path="/" element={<LandingPage></LandingPage>}></Route>
          <Route
            path="/candidates/:id"
            element={<SingleCandidate></SingleCandidate>}
          ></Route>
          <Route path="/reports" element={<Reports></Reports>}></Route>
          <Route
            path="/new-report"
            element={
              userToken ? <CreateReport /> : <Navigate to="/reports"></Navigate>
            }
          >
            <Route
              path="/new-report"
              element={<Navigate to="step/1"></Navigate>}
            ></Route>

            <Route path="step/1" element={<ReportStep1></ReportStep1>}></Route>
            <Route path="step/2" element={<ReportStep2></ReportStep2>}></Route>
            <Route path="step/3" element={<ReportStep3></ReportStep3>}></Route>
          </Route>
        </Routes>
        {/* <ReactPortal children={<Modal></Modal>}></ReactPortal> */}
      </UserContext.Provider>
    </>
  );
};

export default App;
export const UserContext = createContext({});
