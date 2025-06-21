let accessToken = null;

export function setAccessToken(token) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

export function logout() {
  accessToken = null;
  localStorage.removeItem("coachName");
  localStorage.removeItem("coachId");
  localStorage.removeItem("coachRole");
}

export function isAuthenticated() {
  return !!accessToken;
}
