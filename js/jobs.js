const jobs = [
  {
    id: "job_001",
    companyName: "Mobile First Corp",
    position: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description:
      "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
    status: "not_applied", // not_applied | interview | rejected
  },
  {
    id: "job_002",
    companyName: "WebFlow Agency",
    position: "Web Designer & Developer",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$80,000 - $120,000",
    description:
      "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.",
    status: "not_applied",
  },
  {
    id: "job_003",
    companyName: "DataViz Solutions",
    position: "Data Visualization Specialist",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125,000 - $165,000",
    description:
      "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.",
    status: "not_applied",
  },
  {
    id: "job_004",
    companyName: "CloudFirst Inc",
    position: "Backend Developer",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140,000 - $190,000",
    description:
      "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.",
    status: "not_applied",
  },
  {
    id: "job_005",
    companyName: "Innovation Labs",
    position: "UI/UX Engineer",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $150,000",
    description:
      "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.",
    status: "not_applied",
  },
  {
    id: "job_006",
    companyName: "MegaCorp Solutions",
    position: "JavaScript Developer",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130,000 - $170,000",
    description:
      "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation and professional development opportunities.",
    status: "not_applied",
  },
  {
    id: "job_007",
    companyName: "StartupXYZ",
    position: "Full Stack Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    description:
      "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity included.",
    status: "not_applied",
  },
  {
    id: "job_008",
    companyName: "TechCorp Industries",
    position: "Senior Frontend Developer",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description:
      "Build scalable web applications using React and TypeScript. Work with a talented team on cutting-edge projects.",
    status: "not_applied",
  },
];

const cardsContainer = document.getElementById("cards-container");

const totalJobs = document.getElementById("statTotal");
const jobCount = document.getElementById("jobsCount");
const statInterview = document.getElementById("statInterview");
const statRejected = document.getElementById("statRejected");

const tabAll = document.getElementById("tabAll");
const tabInterview = document.getElementById("tabInterview");
const tabRejected = document.getElementById("tabRejected");

const interviewEmpty = document.getElementById("interview-empty");
const rejectedEmpty = document.getElementById("rejected-empty");

// ===== Empty state: show ONLY for active tab =====
function toggleEmptyStates() {
  const interviewCount = cardsContainer.querySelectorAll(
    '.job-card[data-status="INTERVIEW"]'
  ).length;

  const rejectedCount = cardsContainer.querySelectorAll(
    '.job-card[data-status="REJECTED"]'
  ).length;

  const isInterview = tabInterview.getAttribute("data-active") === "true";
  const isRejected = tabRejected.getAttribute("data-active") === "true";

  // default: hide both
  if (interviewEmpty) interviewEmpty.classList.add("hidden");
  if (rejectedEmpty) rejectedEmpty.classList.add("hidden");

  // show only active tab empty state if count = 0
  if (isInterview && interviewEmpty) {
    interviewEmpty.classList.toggle("hidden", interviewCount !== 0);
  }

  if (isRejected && rejectedEmpty) {
    rejectedEmpty.classList.toggle("hidden", rejectedCount !== 0);
  }
}

function updateCounts() {
  const cards = cardsContainer.querySelectorAll(".job-card");
  totalJobs.innerText = cards.length;
  jobCount.innerText = cards.length;

  statInterview.innerText = cardsContainer.querySelectorAll(
    '.job-card[data-status="INTERVIEW"]'
  ).length;

  statRejected.innerText = cardsContainer.querySelectorAll(
    '.job-card[data-status="REJECTED"]'
  ).length;

  toggleEmptyStates();
}

function setActiveTab(status) {
  tabAll.removeAttribute("data-active");
  tabInterview.removeAttribute("data-active");
  tabRejected.removeAttribute("data-active");

  if (status === "ALL") tabAll.setAttribute("data-active", "true");
  if (status === "INTERVIEW") tabInterview.setAttribute("data-active", "true");
  if (status === "REJECTED") tabRejected.setAttribute("data-active", "true");
}

function filterCards(status) {
  const cards = cardsContainer.querySelectorAll(".job-card");

  cards.forEach((card) => {
    if (status === "ALL") {
      card.classList.remove("hidden");
    } else {
      card.classList.toggle("hidden", card.dataset.status !== status);
    }
  });

  setActiveTab(status);
  toggleEmptyStates();
}

// ===== Tabs =====
tabAll.addEventListener("click", () => filterCards("ALL"));
tabInterview.addEventListener("click", () => filterCards("INTERVIEW"));
tabRejected.addEventListener("click", () => filterCards("REJECTED"));

// ===== Buttons (Event Delegation) =====
document.addEventListener("click", (e) => {
  const card = e.target.closest(".job-card");
  if (!card) return;

  // Interview
  if (e.target.closest(".btn-interview")) {
    card.dataset.status = "INTERVIEW";

    const pill = card.querySelector(".status-pill");
    if (pill) pill.innerText = "INTERVIEW";

    updateCounts();

    const active =
      tabInterview.getAttribute("data-active") === "true"
        ? "INTERVIEW"
        : tabRejected.getAttribute("data-active") === "true"
        ? "REJECTED"
        : "ALL";

    filterCards(active);
    return;
  }

  // Rejected
  if (e.target.closest(".btn-rejected")) {
    card.dataset.status = "REJECTED";

    const pill = card.querySelector(".status-pill");
    if (pill) pill.innerText = "REJECTED";

    updateCounts();

    const active =
      tabInterview.getAttribute("data-active") === "true"
        ? "INTERVIEW"
        : tabRejected.getAttribute("data-active") === "true"
        ? "REJECTED"
        : "ALL";

    filterCards(active);
    return;
  }

  // Delete
  if (e.target.closest(".delete-btn")) {
    card.remove();
    updateCounts();

    const active =
      tabInterview.getAttribute("data-active") === "true"
        ? "INTERVIEW"
        : tabRejected.getAttribute("data-active") === "true"
        ? "REJECTED"
        : "ALL";

    filterCards(active);
  }
});

// ===== Init =====
updateCounts();
filterCards("ALL");