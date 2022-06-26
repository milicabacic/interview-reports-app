export const api = function (url, configObj = {}) {
  const fUrl = "http://localhost:4000" + url;
  const cfg = {
    ...configObj,
    headers: {
      "Content-Type": "application/json",
      ...(configObj.headers || {}),
    },
  };
  configObj.body && (cfg.body = JSON.stringify(configObj.body));

  return fetch(fUrl, cfg).then((res) =>
    res.status < 400 ? res.json() : Promise.reject(res.json())
  );
};

export const login = function (email, password) {
  return api("/auth/login", {
    method: "POST",
    body: { email, password },
  });
};

export const register = function (name, email, password) {
  return api("/auth/register", {
    method: "POST",
    body: { name, email, password },
  });
};

export const getCandidates = function () {
  return api("/candidates");
};

export const getCompanies = function () {
  return api("/companies");
};

export const getReports = function () {
  return api("/reports");
};

export const postReport = function (
  candidate,
  company,
  interviewDate,
  phase,
  status,
  note
) {
  return api("/reports", {
    method: "POST",
    body: { candidate, company, interviewDate, phase, status, note },
  });
};

export const patchreport = function (
  id,
  candidate,
  company,
  interviewDate,
  phase,
  status,
  note
) {
  return api(`/reports/${id}`, {
    method: "PATCH",
    body: { candidate, company, interviewDate, phase, status, note },
  });
};

export const deleteReport = function (id) {
  return api(`/reports/${id}`, {
    method: "DELETE",
  });
};

export const postCandidate = function (
  avatar,
  name,
  birthday,
  email,
  education
) {
  return api("/candidates", {
    method: "POST",
    body: { avatar, name, birthday, email, education },
  });
};

export const patchCandidate = function (
  id,
  candidate,
  company,
  interviewDate,
  phase,
  status,
  note
) {
  return api(`/candidates/${id}`, {
    method: "PATCH",
    body: { candidate, company, interviewDate, phase, status, note },
  });
};

export const deleteCandidate = function (id) {
  return api(`/candidate/${id}`, {
    method: "DELETE",
  });
};

export const getCandidate = function (id) {
  return api(`/candidates/${id}`);
};

export const getCompany = function (id) {
  return api(`/companies/${id}`);
};

export const getReport = function (id) {
  return api(`/reports/${id}`);
};
