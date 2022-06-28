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

  return fetch(fUrl, cfg).then(async (res) =>
    res.status < 400 ? await res.json() : Promise.reject(await res.json())
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
  note, 
  token
) {
  return api("/reports", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: { candidate, company, interviewDate, phase, status, note },
  });
};

export const patchReport = function (
  id,
  candidate,
  company,
  interviewDate,
  phase,
  status,
  note, token
) {
  return api(`/reports/${id}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: { candidate, company, interviewDate, phase, status, note },
  });
};

export const deleteReport = function (id, token) {
  return api(`/reports/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });
};

export const postCandidate = function (
  avatar,
  name,
  birthday,
  email,
  education, 
  token
) {
  return api("/candidates", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: { avatar, name, birthday, email, education },
  });
};

export const patchCandidate = function (
  id, avatar,
  name,
  birthday,
  email,
  education, 
  token
) {
  return api(`/candidates/${id}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: { avatar, name, birthday, email, education },
  });
};

export const deleteCandidate = function (id, token) {
  return api(`/candidates/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    },
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
