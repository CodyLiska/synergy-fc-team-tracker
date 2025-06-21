export function setCoachId(id) {
  localStorage.setItem("coachId", id);
}

export function getCoachId() {
  return localStorage.getItem("coachId");
}
