export type DemoRole = "ADMIN" | "STAFF";
export type DemoStudent = {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  program: string;
  status: "Active" | "Pending" | "Completed" | "Inactive";
  documents: number;
};
export const demoUsers = [
  {
    email: "admin@thedna.demo",
    passwordHash:
      "$argon2id$v=19$m=19456,t=2,p=1$92DqeWsf3vmK5KgmN5GOLQ$H3oPQTDUjn+WZxjZjJNRgOwFGoypeyG9N2/HFFXx+Hg",
    name: "Alex Davis",
    role: "ADMIN" as DemoRole,
  },
  {
    email: "staff@thedna.demo",
    passwordHash:
      "$argon2id$v=19$m=19456,t=2,p=1$92DqeWsf3vmK5KgmN5GOLQ$H3oPQTDUjn+WZxjZjJNRgOwFGoypeyG9N2/HFFXx+Hg",
    name: "Jamie Lee",
    role: "STAFF" as DemoRole,
  },
];
export const demoStudents: DemoStudent[] = [
  [
    "Emma Mitchell",
    "emma.mitchell@example.demo",
    "+44 7700 900123",
    "United Kingdom",
    "Digital Product Design",
    "Active",
    3,
  ],
  [
    "Jordan Smith",
    "jordan.smith@example.demo",
    "+1 202 555 0142",
    "United States",
    "Business & Innovation",
    "Active",
    2,
  ],
  [
    "Lucas Wong",
    "lucas.wong@example.demo",
    "+852 5550 2188",
    "Hong Kong",
    "Computer Science",
    "Pending",
    1,
  ],
  [
    "Amelia Morgan",
    "amelia.morgan@example.demo",
    "+44 7700 900321",
    "United Kingdom",
    "Digital Product Design",
    "Active",
    3,
  ],
  [
    "Riley Kim",
    "riley.kim@example.demo",
    "+82 10 5555 0182",
    "South Korea",
    "Global Marketing",
    "Completed",
    2,
  ],
].map((student, index) => ({
  id: `STU-2024-${String(index + 18).padStart(3, "0")}`,
  name: String(student[0]),
  email: String(student[1]),
  phone: String(student[2]),
  nationality: String(student[3]),
  program: String(student[4]),
  status: student[5] as DemoStudent["status"],
  documents: Number(student[6]),
}));
