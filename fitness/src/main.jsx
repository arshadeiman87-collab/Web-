import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { supabase } from "./lib/supabase";

import {
  LayoutDashboard,
  Users,
  CalendarDays,
  QrCode,
  ScanFace,
  Dumbbell,
  Trophy,
  Gift,
  CreditCard,
  MapPin,
  Webhook,
  Settings as SettingsIcon,
  Menu,
  X,
  Plus,
  Search,
  CheckCircle2,
  Clock3,
  BrainCircuit,
  RefreshCw,
  ExternalLink,
  Mail,
  ChevronRight,
  ShieldCheck,
  UserPlus,
  TrendingUp,
  Activity,
  Target,
  Star,
  Zap,
  Save,
  Bell,
  LogOut,
  MoreHorizontal
} from "lucide-react";

import "./style.css";

/* =========================================================
   DEMO DATA
========================================================= */

const DEMO_MEMBERS = [
  {
    id: "m1",
    name: "Sophie Turner",
    email: "sophie@example.com",
    plan: "Premium",
    status: "active",
    points: 1280,
    goals: "Strength & mobility",
    attendance: 24,
    joined: "12 Jan 2026"
  },
  {
    id: "m2",
    name: "James Wilson",
    email: "james@example.com",
    plan: "Standard",
    status: "active",
    points: 860,
    goals: "Fat loss",
    attendance: 18,
    joined: "28 Feb 2026"
  },
  {
    id: "m3",
    name: "Amelia Brown",
    email: "amelia@example.com",
    plan: "Premium",
    status: "active",
    points: 1540,
    goals: "Hypertrophy",
    attendance: 31,
    joined: "05 Nov 2025"
  },
  {
    id: "m4",
    name: "Oliver Smith",
    email: "oliver@example.com",
    plan: "Standard",
    status: "paused",
    points: 430,
    goals: "General fitness",
    attendance: 11,
    joined: "18 Mar 2026"
  }
];

const DEMO_CLASSES = [
  {
    id: "c1",
    name: "Morning HIIT",
    trainer: "James Wilson",
    time: "07:00",
    capacity: 20,
    booked: 16,
    duration: "45 min",
    level: "All levels"
  },
  {
    id: "c2",
    name: "Power Yoga",
    trainer: "Emma Carter",
    time: "09:30",
    capacity: 20,
    booked: 20,
    duration: "60 min",
    level: "Intermediate"
  },
  {
    id: "c3",
    name: "Strength Lab",
    trainer: "Jack Morgan",
    time: "18:00",
    capacity: 16,
    booked: 11,
    duration: "50 min",
    level: "Advanced"
  },
  {
    id: "c4",
    name: "Pilates Flow",
    trainer: "Sophie Lee",
    time: "19:15",
    capacity: 12,
    booked: 9,
    duration: "45 min",
    level: "Beginner"
  }
];

const REWARDS = [
  ["Free smoothie", 300, "Nutrition reward"],
  ["Gym merch voucher", 800, "Studio merchandise"],
  ["Personal training session", 1500, "1-to-1 coaching"]
];

/* =========================================================
   APP
========================================================= */

function App() {
  const [page, setPage] = useState("Dashboard");
  const [mobile, setMobile] = useState(false);

  const [dark, setDark] = useState(() => {
    return localStorage.getItem("fitflow-theme") === "dark";
  });

  const [members, setMembers] = useState(DEMO_MEMBERS);
  const [classes, setClasses] = useState(DEMO_CLASSES);

  const [toast, setToast] = useState("");
  const [modal, setModal] = useState(null);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("fitflow-theme", dark ? "dark" : "light");
  }, [dark]);

  const notify = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const book = (selectedClass) => {
    if (selectedClass.booked < selectedClass.capacity) {
      setClasses((current) =>
        current.map((item) =>
          item.id === selectedClass.id
            ? {
                ...item,
                booked: item.booked + 1
              }
            : item
        )
      );

      notify("Booking confirmed successfully");
    } else {
      notify("Class full — member added to waitlist");
    }
  };

  const addMember = (member) => {
    const newMember = {
      ...member,
      id: `m${Date.now()}`,
      points: 0,
      attendance: 0,
      status: "active",
      joined: "Today"
    };

    setMembers((current) => [newMember, ...current]);
    setModal(null);
    notify("New member added successfully");
  };

  const nav = [
    ["Dashboard", LayoutDashboard],
    ["Members", Users],
    ["Classes", CalendarDays],
    ["Check-in", QrCode],
    ["AI Workouts", BrainCircuit],
    ["Leaderboard", Trophy],
    ["Rewards", Gift],
    ["Payments", CreditCard],
    ["Google & CRM", MapPin],
    ["Webhooks", Webhook],
    ["Settings", SettingsIcon]
  ];

  return (
    <div className="app">
      {mobile && (
        <div
          className="backdrop"
          onClick={() => setMobile(false)}
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`sidebar ${mobile ? "mobile-open" : ""}`}
      >
        <div className="brand">
          <div className="brand-icon">F</div>

          <span>
            Fit<span>Flow</span>
          </span>
        </div>

        <div className="workspace">
          <div className="workspace-avatar">FG</div>

          <div>
            <b>FitFlow Demo Gym</b>
            <small>Pro · UK</small>
          </div>
        </div>

        <div className="nav-title">
          WORKSPACE
        </div>

        <div className="nav-scroll">
          {nav.map(([name, Icon]) => (
            <button
              key={name}
              className={`nav-item ${
                page === name ? "active" : ""
              }`}
              onClick={() => {
                setPage(name);
                setMobile(false);
              }}
            >
              <Icon size={17} />
              <span>{name}</span>
            </button>
          ))}
        </div>

        <div className="sidebar-bottom">
          <div className="upgrade">
            <ShieldCheck size={18} />

            <strong>
              Production-ready setup
            </strong>

            <p>
              Connect Supabase and external API
              secrets to activate live integrations.
            </p>
          </div>

          <div className="sidebar-version">
            <span>FitFlow</span>
            <span>v2.0</span>
          </div>
        </div>
      </aside>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="main">
        <header className="topbar">
          <div className="top-left">
            <button
              className="mobile-menu icon-btn"
              onClick={() => setMobile(true)}
            >
              <Menu size={19} />
            </button>

            <div className="breadcrumb">
              FitFlow
              <ChevronRight size={14} />
              <strong>{page}</strong>
            </div>
          </div>

          <div className="top-actions">
            <button
              className="icon-btn"
              title="Toggle theme"
              onClick={() => setDark((value) => !value)}
            >
              {dark ? "☀" : "☾"}
            </button>

            <button
              className="icon-btn notification-btn"
              onClick={() =>
                notify("You have 3 new notifications")
              }
            >
              <Bell size={18} />
              <i />
            </button>

            <div className="profile">
              <div className="profile-avatar">
                EA
              </div>

              <div className="profile-info">
                <b>Gym Owner</b>
                <small>admin@fitflow.co.uk</small>
              </div>
            </div>
          </div>
        </header>

        <div className="content">
          {page === "Dashboard" && (
            <Dashboard setPage={setPage} />
          )}

          {page === "Members" && (
            <Members
              members={members}
              setMembers={setMembers}
              openAdd={() => setModal("add")}
              notify={notify}
            />
          )}

          {page === "Classes" && (
            <Classes
              classes={classes}
              book={book}
              notify={notify}
            />
          )}

          {page === "Check-in" && (
            <Checkin
              members={members}
              notify={notify}
            />
          )}

          {page === "AI Workouts" && (
            <AIWorkouts
              members={members}
              notify={notify}
            />
          )}

          {page === "Leaderboard" && (
            <Leaderboard members={members} />
          )}

          {page === "Rewards" && (
            <Rewards
              members={members}
              notify={notify}
            />
          )}

          {page === "Payments" && (
            <Payments notify={notify} />
          )}

          {page === "Google & CRM" && (
            <GoogleCRM notify={notify} />
          )}

          {page === "Webhooks" && <Webhooks />}

          {page === "Settings" && <Settings />}

          <footer>
            FitFlow SaaS · UK fitness studios · Demo
            integrations are clearly labelled until
            production credentials are configured.
          </footer>
        </div>
      </main>

      {/* =====================================================
          TOAST
      ===================================================== */}

      {toast && (
        <div className="toast">
          <CheckCircle2 size={17} />
          {toast}
        </div>
      )}

      {/* =====================================================
          ADD MEMBER MODAL
      ===================================================== */}

      {modal === "add" && (
        <AddMember
          close={() => setModal(null)}
          add={addMember}
        />
      )}
    </div>
  );
}

/* =========================================================
   HEADER
========================================================= */

function Header({
  eyebrow,
  title,
  sub,
  action
}) {
  return (
    <div className="page-header">
      <div>
        <div className="eyebrow">
          {eyebrow}
        </div>

        <h1>{title}</h1>

        <p>{sub}</p>
      </div>

      {action}
    </div>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({ setPage }) {
  const stats = [
    [
      "Active members",
      "248",
      "+12.4%",
      Users
    ],
    [
      "Today's check-ins",
      "86",
      "+8.1%",
      QrCode
    ],
    [
      "Classes today",
      "14",
      "2 waitlists",
      CalendarDays
    ],
    [
      "Monthly revenue",
      "£18,420",
      "+6.7%",
      CreditCard
    ]
  ];

  return (
    <>
      <Header
        eyebrow="FRIDAY · AUGUST 21, 2026"
        title="Good morning, Gym Owner 👋"
        sub="Here's what's happening at your studio today."
      />

      <div className="stat-grid">
        {stats.map(
          ([label, value, trend, Icon]) => (
            <div
              className="card stat"
              key={label}
            >
              <div className="stat-top">
                <span>{label}</span>

                <div className="stat-icon">
                  <Icon size={18} />
                </div>
              </div>

              <strong>{value}</strong>

              <small className="positive">
                {trend}
              </small>
            </div>
          )
        )}
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-head">
            <div>
              <h3>Today's classes</h3>
              <p>
                Capacity and live bookings
              </p>
            </div>

            <button
              className="text-btn"
              onClick={() =>
                setPage("Classes")
              }
            >
              View all
            </button>
          </div>

          {DEMO_CLASSES.slice(0, 3).map(
            (item) => (
              <div
                className="class-row"
                key={item.id}
              >
                <div className="time-box">
                  <strong>
                    {item.time}
                  </strong>

                  <small>
                    {item.duration}
                  </small>
                </div>

                <div className="class-info">
                  <strong>
                    {item.name}
                  </strong>

                  <span>
                    with {item.trainer}
                  </span>
                </div>

                <div className="capacity">
                  <strong>
                    {item.booked}/
                    {item.capacity}
                  </strong>

                  <div className="progress">
                    <i
                      style={{
                        width: `${
                          (item.booked /
                            item.capacity) *
                          100
                        }%`
                      }}
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        <div className="card ai-card">
          <div className="ai-orb">
            <BrainCircuit size={22} />
          </div>

          <div className="eyebrow">
            AI WORKOUT GENERATOR
          </div>

          <h2>
            Personal plans from goals + history
          </h2>

          <p>
            Generate adaptive workouts using
            member goals and performance history.
          </p>

          <button
            className="primary-btn"
            onClick={() =>
              setPage("AI Workouts")
            }
          >
            Open AI Generator
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="dashboard-grid bottom">
        <div className="card">
          <div className="card-head">
            <div>
              <h3>Check-in activity</h3>
              <p>Weekly visits</p>
            </div>

            <button
              className="text-btn"
              onClick={() =>
                setPage("Check-in")
              }
            >
              Open scanner
            </button>
          </div>

          <div className="fake-chart">
            <div style={{ height: "35%" }} />
            <div style={{ height: "50%" }} />
            <div style={{ height: "45%" }} />
            <div style={{ height: "72%" }} />
            <div style={{ height: "62%" }} />
            <div style={{ height: "88%" }} />
            <div style={{ height: "78%" }} />
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <h3>Top members</h3>
              <p>Points this month</p>
            </div>

            <button
              className="text-btn"
              onClick={() =>
                setPage("Leaderboard")
              }
            >
              Leaderboard
            </button>
          </div>

          {DEMO_MEMBERS.slice(0, 3).map(
            (member, index) => (
              <div
                className="rank-row"
                key={member.id}
              >
                <b>#{index + 1}</b>

                <div className="avatar">
                  {getInitials(member.name)}
                </div>

                <div>
                  <strong>
                    {member.name}
                  </strong>

                  <small>
                    {member.plan}
                  </small>
                </div>

                <span className="points">
                  {member.points} pts
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

/* =========================================================
   MEMBERS
========================================================= */

function Members({
  members,
  setMembers,
  openAdd,
  notify
}) {
  const [q, setQ] = useState("");

  const filteredMembers = useMemo(() => {
    const query = q.toLowerCase().trim();

    if (!query) return members;

    return members.filter(
      (member) =>
        member.name
          .toLowerCase()
          .includes(query) ||
        member.email
          .toLowerCase()
          .includes(query) ||
        member.plan
          .toLowerCase()
          .includes(query)
    );
  }, [members, q]);

  return (
    <>
      <Header
        eyebrow="MEMBERS"
        title="Members"
        sub="Membership, goals, points and attendance."
        action={
          <button
            className="primary-btn"
            onClick={openAdd}
          >
            <UserPlus size={16} />
            Add member
          </button>
        }
      />

      <div className="stat-grid member-stats">
        <MiniStat
          icon={Users}
          label="Total members"
          value={members.length}
        />

        <MiniStat
          icon={Activity}
          label="Active"
          value={
            members.filter(
              (x) => x.status === "active"
            ).length
          }
        />

        <MiniStat
          icon={Trophy}
          label="Total points"
          value={members.reduce(
            (sum, x) => sum + x.points,
            0
          )}
        />

        <MiniStat
          icon={Target}
          label="Avg attendance"
          value={`${Math.round(
            members.reduce(
              (sum, x) =>
                sum + x.attendance,
              0
            ) / members.length
          )}/month`}
        />
      </div>

      <div className="card">
        <div className="toolbar">
          <div className="search-box">
            <Search size={17} />

            <input
              value={q}
              onChange={(e) =>
                setQ(e.target.value)
              }
              placeholder="Search members..."
            />
          </div>

          <span className="result-count">
            {filteredMembers.length} members
          </span>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>MEMBER</th>
                <th>PLAN</th>
                <th>STATUS</th>
                <th>GOALS</th>
                <th>ATTENDANCE</th>
                <th>POINTS</th>
              </tr>
            </thead>

            <tbody>
              {filteredMembers.map(
                (member) => (
                  <tr key={member.id}>
                    <td>
                      <div className="member-cell">
                        <div className="avatar">
                          {getInitials(
                            member.name
                          )}
                        </div>

                        <div>
                          <strong>
                            {member.name}
                          </strong>

                          <small>
                            {member.email}
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="pill">
                        {member.plan}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status ${member.status}`}
                      >
                        {member.status}
                      </span>
                    </td>

                    <td>
                      {member.goals}
                    </td>

                    <td>
                      {member.attendance}
                    </td>

                    <td>
                      <strong>
                        {member.points}
                      </strong>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {filteredMembers.length === 0 && (
            <div className="empty">
              <Search size={35} />
              <h3>No members found</h3>
              <p>
                Try another search term.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* =========================================================
   CLASSES
========================================================= */

function Classes({
  classes,
  book,
  notify
}) {
  return (
    <>
      <Header
        eyebrow="SCHEDULE"
        title="Dynamic Classes"
        sub="Real-time capacity with automatic waitlist behaviour."
      />

      <div className="class-grid">
        {classes.map((item) => {
          const full =
            item.booked >= item.capacity;

          const percentage = Math.min(
            100,
            (item.booked /
              item.capacity) *
              100
          );

          return (
            <div
              className="card class-card"
              key={item.id}
            >
              <div className="class-card-top">
                <span className="pill">
                  {full
                    ? "WAITLIST ACTIVE"
                    : "OPEN"}
                </span>

                <button
                  className="icon-btn"
                  onClick={() =>
                    notify(
                      `${item.name} options`
                    )
                  }
                >
                  <MoreHorizontal size={17} />
                </button>
              </div>

              <h3>{item.name}</h3>

              <p>
                {item.trainer} · {item.time}
              </p>

              <div className="big-time">
                {item.booked}

                <small>
                  {" "}
                  / {item.capacity} spots
                </small>
              </div>

              <div className="progress">
                <i
                  style={{
                    width: `${percentage}%`
                  }}
                />
              </div>

              <div className="class-meta">
                <span>
                  <Clock3 size={14} />
                  {item.duration}
                </span>

                <span>
                  <Dumbbell size={14} />
                  {item.level}
                </span>
              </div>

              <button
                className="outline-btn"
                onClick={() => book(item)}
              >
                {full
                  ? "Join waitlist"
                  : "Book class"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="card info-card">
        <Webhook size={18} />

        <div>
          <b>Waitlist automation</b>

          <p>
            When a booking is cancelled, the
            waitlist-promote Edge Function can
            promote the next waiting member and
            record the event.
          </p>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   CHECK-IN
========================================================= */

function Checkin({
  members,
  notify
}) {
  const [method, setMethod] =
    useState("QR");

  const [selected, setSelected] =
    useState(members[0]?.id);

  const member = members.find(
    (x) => x.id === selected
  );

  return (
    <>
      <Header
        eyebrow="ENTRANCE"
        title="QR & Face Recognition Check-in"
        sub="Two supported check-in modes with points awarded on successful attendance."
      />

      <div className="dashboard-grid">
        <div className="card checkin-panel">
          <div className="mode-tabs">
            <button
              className={
                method === "QR"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setMethod("QR")
              }
            >
              <QrCode size={17} />
              QR scanner
            </button>

            <button
              className={
                method === "Face"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setMethod("Face")
              }
            >
              <ScanFace size={17} />
              Face recognition
            </button>
          </div>

          {method === "QR" ? (
            <div className="scanner-box">
              <QrCode size={82} />

              <h3>
                Camera / QR scanner
              </h3>

              <p>
                Production: connect a camera
                scanner or QR library and resolve
                the member QR token.
              </p>

              <button
                className="primary-btn"
                onClick={() =>
                  notify(
                    `QR demo check-in: ${member?.name}`
                  )
                }
              >
                Simulate QR check-in
              </button>
            </div>
          ) : (
            <div className="scanner-box">
              <ScanFace size={82} />

              <h3>
                Face recognition
              </h3>

              <p>
                Production: capture consented face
                embeddings locally/server-side and
                compare with an approved ML provider.
              </p>

              <button
                className="primary-btn"
                onClick={() =>
                  notify(
                    `Face demo match: ${member?.name} · confidence 97%`
                  )
                }
              >
                Simulate face match
              </button>
            </div>
          )}
        </div>

        <div className="card">
          <h3>
            Member to check in
          </h3>

          <select
            value={selected}
            onChange={(e) =>
              setSelected(e.target.value)
            }
          >
            {members.map((member) => (
              <option
                key={member.id}
                value={member.id}
              >
                {member.name}
              </option>
            ))}
          </select>

          <div className="feature-box">
            <CheckCircle2 size={18} />

            <div>
              <b>
                Attendance reward
              </b>

              <p>
                Successful check-in → +10 points
                → points ledger.
              </p>
            </div>
          </div>

          <div className="feature-box">
            <ShieldCheck size={18} />

            <div>
              <b>Privacy</b>

              <p>
                Use explicit consent, retention
                limits and UK GDPR-compliant
                processing for biometric data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   AI WORKOUTS
========================================================= */

function AIWorkouts({
  members,
  notify
}) {
  const [member, setMember] =
    useState(members[0]?.id);

  const [goal, setGoal] =
    useState("Strength");

  const [level, setLevel] =
    useState("Intermediate");

  const [generated, setGenerated] =
    useState(null);

  const selectedMember =
    members.find(
      (x) => x.id === member
    );

  const generateWorkout = () => {
    const plans = [
      {
        name: "Back Squat",
        sets: "4 × 6",
        note: "RPE 7"
      },
      {
        name: "Bench Press",
        sets: "4 × 8",
        note: "Progress +2.5kg when ready"
      },
      {
        name: "Romanian Deadlift",
        sets: "3 × 8",
        note: "Controlled eccentric"
      },
      {
        name: "Cable Row",
        sets: "3 × 12",
        note: "Full range"
      }
    ];

    setGenerated(plans);

    notify(
      "AI workout generated successfully"
    );
  };

  return (
    <>
      <Header
        eyebrow="AI COACH"
        title="Personalized Workout Generator"
        sub="Uses member goals + past performance stored in Supabase."
      />

      <div className="workout-grid">
        <div className="card">
          <div className="section-icon">
            <BrainCircuit size={21} />
          </div>

          <h3>Member context</h3>

          <label>
            Member

            <select
              value={member}
              onChange={(e) =>
                setMember(e.target.value)
              }
            >
              {members.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Goal

            <select
              value={goal}
              onChange={(e) =>
                setGoal(e.target.value)
              }
            >
              <option>
                Strength
              </option>

              <option>
                Fat loss
              </option>

              <option>
                Hypertrophy
              </option>

              <option>
                Mobility
              </option>
            </select>
          </label>

          <label>
            Level

            <select
              value={level}
              onChange={(e) =>
                setLevel(e.target.value)
              }
            >
              <option>
                Beginner
              </option>

              <option>
                Intermediate
              </option>

              <option>
                Advanced
              </option>
            </select>
          </label>

          <div className="feature-box">
            <BrainCircuit size={18} />

            <div>
              <b>
                {selectedMember?.name}
              </b>

              <p>
                {selectedMember?.goals}
              </p>
            </div>
          </div>

          <button
            className="primary-btn wide"
            onClick={generateWorkout}
          >
            <Zap size={16} />
            Generate adaptive plan
          </button>
        </div>

        <div className="card">
          {generated ? (
            <>
              <div className="card-head">
                <div>
                  <h3>
                    Generated plan
                  </h3>

                  <p>
                    {goal} · {level}
                  </p>
                </div>

                <span className="status active">
                  AI READY
                </span>
              </div>

              {generated.map(
                (item, index) => (
                  <div
                    className="plan-row"
                    key={item.name}
                  >
                    <span className="number">
                      {index + 1}
                    </span>

                    <div>
                      <b>
                        {item.name}
                      </b>

                      <small>
                        {item.sets} ·{" "}
                        {item.note}
                      </small>
                    </div>

                    <Dumbbell size={17} />
                  </div>
                )
              )}

              <div className="success-box">
                AI adapter ready:
                Supabase Edge Function →
                configured AI API → save to
                workouts.
              </div>
            </>
          ) : (
            <div className="empty">
              <BrainCircuit size={40} />

              <h3>
                No plan generated
              </h3>

              <p>
                Select a member and generate a
                personalized plan.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* =========================================================
   LEADERBOARD
========================================================= */

function Leaderboard({
  members
}) {
  const sortedMembers =
    [...members].sort(
      (a, b) =>
        b.points - a.points
    );

  return (
    <>
      <Header
        eyebrow="GAMIFICATION"
        title="Leaderboard"
        sub="Members earn points for attendance and can redeem rewards."
      />

      <div className="card leaderboard-card">
        <div className="leaderboard-header">
          <div className="section-icon">
            <Trophy size={21} />
          </div>

          <div>
            <h3>
              Monthly leaderboard
            </h3>

            <p>
              Top performing members
            </p>
          </div>
        </div>

        {sortedMembers.map(
          (member, index) => (
            <div
              className={`rank-row ${
                index === 0
                  ? "rank-first"
                  : ""
              }`}
              key={member.id}
            >
              <b>
                #{index + 1}
              </b>

              <div className="avatar">
                {getInitials(
                  member.name
                )}
              </div>

              <div>
                <strong>
                  {member.name}
                </strong>

                <small>
                  {member.plan}
                </small>
              </div>

              <span className="points">
                {member.points} pts
              </span>
            </div>
          )
        )}
      </div>
    </>
  );
}

/* =========================================================
   REWARDS
========================================================= */

function Rewards({
  members,
  notify
}) {
  const totalPoints =
    members.reduce(
      (sum, member) =>
        sum + member.points,
      0
    );

  return (
    <>
      <Header
        eyebrow="REWARDS"
        title="Points & Rewards"
        sub="Redeem attendance points for studio perks."
      />

      <div className="card reward-summary">
        <div className="section-icon">
          <Star size={21} />
        </div>

        <div>
          <span>
            Community points
          </span>

          <strong>
            {totalPoints.toLocaleString()}
          </strong>
        </div>

        <small>
          Earn points through check-ins,
          classes and challenges.
        </small>
      </div>

      <div className="class-grid">
        {REWARDS.map(
          ([name, cost, description]) => (
            <div
              className="card reward-card"
              key={name}
            >
              <div className="reward-icon">
                <Gift size={24} />
              </div>

              <h3>{name}</h3>

              <p>
                {description}
              </p>

              <strong>
                {cost} points
              </strong>

              <button
                className="outline-btn"
                onClick={() =>
                  notify(
                    `Demo redemption: ${name}`
                  )
                }
              >
                Redeem reward
              </button>
            </div>
          )
        )}
      </div>
    </>
  );
}

/* =========================================================
   PAYMENTS
========================================================= */

function Payments({
  notify
}) {
  return (
    <>
      <Header
        eyebrow="UK PAYMENTS"
        title="GoCardless Direct Debit"
        sub="Monthly UK direct debits, webhook reconciliation and failed-payment retry workflow."
      />

      <div className="dashboard-grid">
        <div className="card">
          <div className="payment-brand">
            <div className="gc-logo">
              GC
            </div>

            <div>
              <h3>
                GoCardless
              </h3>

              <p>
                Sandbox adapter
              </p>
            </div>

            <span className="status active">
              READY
            </span>
          </div>

          <div className="feature-box">
            <CreditCard size={18} />

            <div>
              <b>
                Mandates
              </b>

              <p>
                Create customer + mandate via
                Edge Function; never expose
                access tokens in React.
              </p>
            </div>
          </div>

          <div className="feature-box">
            <RefreshCw size={18} />

            <div>
              <b>
                Failed payments
              </b>

              <p>
                Webhook event → payment record
                → retry counter → scheduled
                retry.
              </p>
            </div>
          </div>

          <button
            className="primary-btn"
            onClick={() =>
              notify(
                "Demo: GoCardless mandate flow opened"
              )
            }
          >
            Start Direct Debit setup
          </button>
        </div>

        <div className="card">
          <h3>
            Payment health
          </h3>

          <div className="payment-metrics">
            <b>
              £18,420
              <small>
                monthly processed
              </small>
            </b>

            <b>
              3
              <small>
                failed
              </small>
            </b>

            <b>
              2
              <small>
                retry queued
              </small>
            </b>
          </div>

          <div className="payment-flow">
            <span>
              Mandate
              <small>
                created
              </small>
            </span>

            <ChevronRight />

            <span>
              Charge
              <small>
                submitted
              </small>
            </span>

            <ChevronRight />

            <span>
              Webhook
              <small>
                reconciled
              </small>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   GOOGLE CRM
========================================================= */

function GoogleCRM({
  notify
}) {
  return (
    <>
      <Header
        eyebrow="GROWTH"
        title="Google Business + CRM"
        sub="Trial-class acquisition and local class-availability markup."
      />

      <div className="dashboard-grid">
        <div className="card">
          <div className="section-icon">
            <MapPin size={21} />
          </div>

          <h3>
            Book a Trial Class
          </h3>

          <p>
            Add your public trial URL to your
            Google Business Profile. Trial
            submissions can be stored in
            Supabase and pushed to your CRM.
          </p>

          <div className="feature-box">
            <Mail size={18} />

            <div>
              <b>
                CRM sync
              </b>

              <p>
                React → Supabase trial_leads →
                Edge Function → CRM webhook.
              </p>
            </div>
          </div>

          <button
            className="primary-btn"
            onClick={() =>
              notify(
                "Demo trial lead captured: demo@example.com"
              )
            }
          >
            Capture demo trial lead
          </button>
        </div>

        <div className="card">
          <div className="section-icon">
            <MapPin size={21} />
          </div>

          <h3>
            Google Maps class availability
          </h3>

          <p>
            Public class pages can expose
            Event/LocalBusiness structured data
            for eligible search experiences.
          </p>

          <div className="code-box">
            &lt;script type=
            "application/ld+json"&gt;
            <br />
            {"{"}
            "@context":"https://schema.org",
            <br />
            "@type":"SportsActivityLocation"
            {"}"}
            <br />
            &lt;/script&gt;
          </div>

          <button
            className="outline-btn"
            onClick={() =>
              notify(
                "Structured-data template ready"
              )
            }
          >
            Validate template
          </button>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   WEBHOOKS
========================================================= */

function Webhooks() {
  const events = [
    [
      "payment_failed",
      "Failed payment · retry #1"
    ],
    [
      "payment_confirmed",
      "Payment confirmed"
    ],
    [
      "mandate_created",
      "Direct debit mandate created"
    ],
    [
      "booking_cancelled",
      "Class cancellation → waitlist promotion"
    ]
  ];

  return (
    <>
      <Header
        eyebrow="AUTOMATION"
        title="Webhook & Retry Center"
        sub="Audit trail for GoCardless and internal automation events."
      />

      <div className="card">
        <div className="toolbar">
          <span className="pill">
            LIVE PIPELINE DESIGN
          </span>

          <span className="pill">
            Idempotency enabled
          </span>

          <span className="pill">
            Retry queue
          </span>
        </div>

        {events.map(
          ([event, description]) => (
            <div
              className="webhook-row"
              key={event}
            >
              <Webhook size={17} />

              <div>
                <b>{event}</b>
                <small>
                  {description}
                </small>
              </div>

              <span className="status active">
                processed
              </span>

              <Clock3 size={15} />

              <small>
                Today
              </small>
            </div>
          )
        )}
      </div>
    </>
  );
}

/* =========================================================
   SETTINGS
========================================================= */

function Settings() {
  const [saved, setSaved] =
    useState(false);

  const [gymName, setGymName] =
    useState("FitFlow Demo Gym");

  const saveSettings = () => {
    localStorage.setItem(
      "fitflow-gym-name",
      gymName
    );

    setSaved(true);

    setTimeout(
      () => setSaved(false),
      2500
    );
  };

  return (
    <>
      <Header
        eyebrow="CONFIGURATION"
        title="Settings"
        sub="Configure gym, integrations and subscription."
      />

      <div className="settings-grid">
        <div className="card">
          <div className="section-icon">
            <SettingsIcon size={21} />
          </div>

          <h3>
            Gym settings
          </h3>

          <label>
            Gym name

            <input
              value={gymName}
              onChange={(e) =>
                setGymName(e.target.value)
              }
            />
          </label>

          <label>
            Timezone

            <select defaultValue="Europe/London">
              <option>
                Europe/London
              </option>

              <option>
                Europe/Paris
              </option>
            </select>
          </label>

          <label>
            Currency

            <select defaultValue="GBP">
              <option>
                GBP · £
              </option>
            </select>
          </label>

          <button
            className="primary-btn"
            onClick={saveSettings}
          >
            {saved ? (
              <>
                <CheckCircle2 size={16} />
                Saved
              </>
            ) : (
              <>
                <Save size={16} />
                Save settings
              </>
            )}
          </button>
        </div>

        <div className="card">
          <div className="section-icon">
            <ShieldCheck size={21} />
          </div>

          <h3>
            Production checklist
          </h3>

          {[
            "Supabase Auth + RLS",
            "GoCardless credentials + webhook secret",
            "AI provider API key",
            "CRM webhook URL",
            "Google Business Profile trial URL",
            "Biometric consent + retention policy"
          ].map((item) => (
            <div
              className="toggle-row"
              key={item}
            >
              <div>
                <b>{item}</b>

                <small>
                  Required before production
                </small>
              </div>

              <span className="status">
                CONFIGURE
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card danger-card">
        <div>
          <h3>
            Demo environment
          </h3>

          <p>
            Current members and classes are
            running from local demo data. Supabase
            can be connected later.
          </p>
        </div>

        <button className="outline-btn">
          <ExternalLink size={15} />
          Connection guide
        </button>
      </div>
    </>
  );
}

/* =========================================================
   ADD MEMBER MODAL
========================================================= */

function AddMember({
  close,
  add
}) {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [plan, setPlan] =
    useState("Standard");

  const canCreate =
    name.trim() &&
    email.trim();

  return (
    <div
      className="modal-backdrop"
      onClick={close}
    >
      <div
        className="modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <div className="modal-head">
          <div>
            <div className="section-icon small">
              <UserPlus size={18} />
            </div>

            <h2>
              Add member
            </h2>

            <p>
              Create a demo member profile.
            </p>
          </div>

          <button
            className="close-btn"
            onClick={close}
          >
            <X />
          </button>
        </div>

        <label>
          Full name

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="e.g. Sarah Johnson"
            autoFocus
          />
        </label>

        <label>
          Email

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="sarah@example.com"
          />
        </label>

        <label>
          Membership plan

          <select
            value={plan}
            onChange={(e) =>
              setPlan(e.target.value)
            }
          >
            <option>
              Standard
            </option>

            <option>
              Premium
            </option>
          </select>
        </label>

        <div className="modal-actions">
          <button
            className="secondary-btn"
            onClick={close}
          >
            Cancel
          </button>

          <button
            className="primary-btn"
            disabled={!canCreate}
            onClick={() =>
              add({
                name: name.trim(),
                email: email.trim(),
                plan,
                goals: "General fitness"
              })
            }
          >
            <Plus size={16} />
            Create member
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({
  icon: Icon,
  label,
  value
}) {
  return (
    <div className="card stat mini-stat">
      <div className="stat-top">
        <span>{label}</span>

        <div className="stat-icon">
          <Icon size={17} />
        </div>
      </div>

      <strong>{value}</strong>
    </div>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* =========================================================
   START APP
========================================================= */

createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);