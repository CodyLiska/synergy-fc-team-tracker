export const mockCoaches = [
  { name: "Coach A", id: "coach1" },
  { name: "Coach B", id: "coach2" },
  { name: "Coach C", id: "coach3" },
];

export function setCoachId(id) {
  localStorage.setItem("coachId", id);
}

export function getCoachId() {
  return localStorage.getItem("coachId");
}
