const api = function (url, configObj = {}) {
  const fUrl = "http://localhost:4000" + url;
  const cfg = {
    ...configObj,
    headers: {
      "Content-Type": "application/json",
      ...(configObj.headers || {}),
    },
    body: JSON.stringify(configObj.body),
  };

  return fetch(fUrl, cfg).then((res) =>
    res.status < 400 ? res.json() : Promise.reject(res.json())
  );
};

const login = function (email, password) {
  return api("/auth/login", {
    method: "POST",
    body: { email, password },
  });
};

const register = function (name, email, password) {
  return api("/auth/register", {
    method: "POST",
    body: { name, email, password },
  });
};

const getCandidates = function () {
  return api("/candidates");
};

const getCompanies = function () {
  return api("/companies");
};

const getReports = function () {
  return api("/reports");
};

const postReport = function (candidate, company, interviewDate, phase, status, note) {
  return api("/reports", {
    method: "POST",
    body: { candidate, company, interviewDate, phase, status, note },
  });
};

const patchreport = function (id, candidate, company, interviewDate, phase, status, note) {
  return api(`/reports/${id}`, {
    method: "PATCH",
    body: { candidate, company, interviewDate, phase, status, note },
  });
};

const deleteReport = function (id) {
  return api(`/reports/${id}`, {
    method: "DELETE",
  });
};

const postCandidate = function (avatar, name, birthday, email, education) {
  return api("/candidates", {
    method: "POST",
    body: {avatar, name, birthday, email, education },
  });
};

const patchCandidate = function (id, candidate, company, interviewDate, phase, status, note) {
  return api(`/candidates/${id}`, {
    method: "PATCH",
    body: { candidate, company, interviewDate, phase, status, note },
  });
};

const deleteCandidate = function (id) {
  return api(`/candidate/${id}`, {
    method: "DELETE",
  });
};

const getCandidate = function (id) {
  return api(`/candidates/${id}`);
};

const getCompany= function (id) {
  return api(`/companies/${id}`);
};

const getReport = function (id) {
  return api(`/reports/${id}`);
};