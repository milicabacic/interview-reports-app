import React, { createContext, useEffect } from "react";
import Login from "./pages/Login/Login";
import LandingPage from "./pages/LandingPage/LandingPage";
import SingleCandidate from "./pages/SingleCandidate/SingleCandidate";
import Reports from "./pages/Reports/Reports";
import CreateReport from "./pages/CreateReport/CreateReport";
import { useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Modal from "./components/Modal/Modal";
import ReportStep1 from "./components/ReportStep1/ReportStep1";
import ReportStep2 from "./components/ReportStep2/ReportStep2";
import ReportStep3 from "./components/ReportStep3/ReportStep3";
import Register from "./pages/Register/Register";
import "./app.scss";
import { getCandidates, getCompanies, getReports } from "./api";
import CreateCandidate from "./pages/CreateCandidate/CreateCandidate";

export const UserContext = createContext({});
export const CandidateContext = createContext({});
export const CompanyContext = createContext({});
export const ReportContext = createContext({});

const App = () => {
  const [userToken, setUserToken] = useState(localStorage.getItem("token"));
  const [candidates, setCandidates] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getCandidates().then((data) => setCandidates(data));
  }, []);
  useEffect(() => {
    getCompanies().then((data) => setCompanies(data));
  }, []);
  useEffect(() => {
    getReports().then((data) => setReports(data));
  }, []);


  const navigate = useNavigate();
  return (
    <>
      <UserContext.Provider value={{ userToken, setUserToken }}>
        <CandidateContext.Provider value={{ candidates, setCandidates }}>
          <CompanyContext.Provider value={{ companies, setCompanies }}>
            <ReportContext.Provider value={{ reports, setReports }}>
              <Routes>
                <Route
                  path="/login"
                  element={
                    userToken ? (
                      <Navigate to="/reports"></Navigate>
                    ) : (
                      <Login></Login>
                    )
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
                <Route
                  exact
                  path="/"
                  element={<LandingPage></LandingPage>}
                ></Route>
                <Route
                  path="/candidates/:id"
                  element={<SingleCandidate></SingleCandidate>}
                ></Route>
                <Route path="/edit-candidate/:id" element={userToken? <CreateCandidate></CreateCandidate> : <Login></Login>}></Route>
                <Route path="/reports" element={<Reports></Reports>}></Route>
                <Route
                  path="/edit-report/:id"
                  element={
                    userToken ? (
                      <CreateReport />
                    ) : (
                      <Navigate to="/reports"></Navigate>
                    )
                  }
                >
                  <Route
                    path="/edit-report/:id"
                    element={<Navigate to="step/1"></Navigate>}
                  ></Route>

                  <Route
                    path="step/1"
                    element={<ReportStep1></ReportStep1>}
                  ></Route>
                  <Route
                    path="step/2"
                    element={<ReportStep2></ReportStep2>}
                  ></Route>
                  <Route
                    path="step/3"
                    element={<ReportStep3></ReportStep3>}
                  ></Route>
                </Route>
                <Route
                  path="/new-report"
                  element={
                    userToken ? (
                      <CreateReport />
                    ) : (
                      <Navigate to="/reports"></Navigate>
                    )
                  }
                >
                  <Route
                    path="/new-report"
                    element={<Navigate to="step/1"></Navigate>}
                  ></Route>

                  <Route
                    path="step/1"
                    element={<ReportStep1></ReportStep1>}
                  ></Route>
                  <Route
                    path="step/2"
                    element={<ReportStep2></ReportStep2>}
                  ></Route>
                  <Route
                    path="step/3"
                    element={<ReportStep3></ReportStep3>}
                  ></Route>
                </Route>
              </Routes>
            </ReportContext.Provider>
          </CompanyContext.Provider>
        </CandidateContext.Provider>
      </UserContext.Provider>
    </>
  );
};

export default App;

