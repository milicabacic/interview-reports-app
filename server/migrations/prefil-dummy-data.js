const CandidatesModel = require("../models/Candidates");
const CompaniesModel = require("../models/Companies");
const ReportsModel = require("../models/Reports");
const UsersModel = require("../models/Users");

const companies = ["Endava", "Levi9", "BIT", "Microsoft"];
const candidates = [
  {
    avatar: "https://avatars.githubusercontent.com/u/80677680?v=4",
    name: "Ana Marelja",
    birthday: new Date("1995-08-19"),
    email: "anamarelja@gmail.com",
    education: "Prirodno matematicki fakultet u Beogradu",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/11763983?s=400&v=4",
    name: "Mitar Skoro",
    birthday: new Date("1991-01-23"),
    email: "mitarskoro@gmail.com",
    education: "Ekonomski fakultet u Subotici",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/76402236?v=4",
    name: "Milica Bacic",
    birthday: new Date("1999-03-24"),
    email: "milicabacic99@gmail.com",
    education: "Informacioni Sistemi i Tehnologije - FON",
  },
];
const reports = [
  {
    candidate: {
      email : "milicabacic99@gmail.com"
    },
    company : {
      name: "BIT",
    },
    interviewDate: new Date("2022-05-01"),
    phase: "FINAL",
    status: "Passed",
    note: "",
  },
  {
    candidate: {
      email: "mitarskoro@gmail.com"
    },
    company: {
      name : "Endava",
    },
    interviewDate: new Date("2022-04-01"),
    phase: "HR",
    status: "Declined",
    note: "",
  },
];

/**
 * Make any changes you need to make to the database here
 */
async function up(session) {
  // Write migration here
  await UsersModel.create(
    [
      {
        name: "Test User",
        email: "test@test.com",
        password: "123",
      },
    ],
    { session }
  );
  const dbCompanies = await CompaniesModel.create(
    companies.map((name) => ({ name })),
    { session }
  );
  const dbCandidates = await CandidatesModel.create(candidates, { session });
  console.log(dbCandidates, dbCompanies)
  const prefilledReports = reports.map(e=> {
    const candidate  = dbCandidates.find(c => c.email === e.candidate.email)
    const company = dbCompanies.find(cp => cp.name === e.company.name)
    if(candidate) e.candidate = candidate;
    if(company) e.company = company;
    return e;
  })
  await ReportsModel.create(prefilledReports, { session });
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down(session) {
  // Write migration here
  await UsersModel.deleteOne({ email: "test@test.com" }, { session });
  await CompaniesModel.deleteMany({ name: companies }, { session });
  await CandidatesModel.deleteMany(
    { email: candidates.map((e) => e.email) },
    { session }
  );

  await ReportsModel.deleteMany(
    {
      $or: reports.map((report) => {
        return {
          "candidate.email": report.candidate.email,
          "company.name": report.company.name,
          interviewDate: report.interviewDate,
        };
      }),
    },
    { session }
  );
}

module.exports = { up, down };
