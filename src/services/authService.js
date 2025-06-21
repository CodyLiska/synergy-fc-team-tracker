export function getToken() {
  return localStorage.getItem("token");
}

export function getCoachId() {
  return localStorage.getItem("coachId");
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

export function login(token, coachId) {
  localStorage.setItem("token", token);
  localStorage.setItem("coachId", coachId);
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("coachId");
  localStorage.removeItem("coachName");
  localStorage.removeItem("rememberMe");
}
