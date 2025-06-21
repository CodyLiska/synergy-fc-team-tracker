// export const mockCoaches = [
//   { name: "coach1", id: "665f1234567890abcdef1111" },
//   { name: "coach2", id: "665f1234567890abcdef2222" },
//   { name: "coach3", id: "665f1234567890abcdef3333" },
//   { name: "coachAdmin", id: "665f1234567890abcdef9999" },
// ];
const TEAM_MAP = {
  "665f1234567890abcdef1111": [
    "665f1234567890abcdef1111",
    "665f1234567890abcdef2222",
    "665f1234567890abcdef3333",
  ], // coach1 (head coach)
  "665f1234567890abcdef2222": ["665f1234567890abcdef2222"], // coach2
  "665f1234567890abcdef3333": ["665f1234567890abcdef3333"], // coach3
  "665f1234567890abcdef9999": ["665f1234567890abcdef9999"], // admin
};

export const COACH_LIST = [
  { id: "665f1234567890abcdef1111", name: "coach1" },
  { id: "665f1234567890abcdef2222", name: "coach2" },
  { id: "665f1234567890abcdef3333", name: "coach3" },
  { id: "665f1234567890abcdef9999", name: "coachAdmin" },
];


export function setCoachId(id) {
  localStorage.setItem("coachId", id);
}

export function getCoachId() {
  return localStorage.getItem("coachId");
}
