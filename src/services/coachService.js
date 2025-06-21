export const mockCoaches = [
  { name: "coach1", id: "665f1234567890abcdef1111" },
  { name: "coach2", id: "665f1234567890abcdef2222" },
  { name: "coach3", id: "665f1234567890abcdef3333" },
  { name: "coachAdmin", id: "665f1234567890abcdef9999" },
];

export function setCoachId(id) {
  localStorage.setItem("coachId", id);
}

export function getCoachId() {
  return localStorage.getItem("coachId");
}
