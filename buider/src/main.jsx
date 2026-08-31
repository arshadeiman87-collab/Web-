
import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { jsPDF } from "jspdf";
import "./styles.css";

const starter = {
  name: "Alex Morgan",
  title: "Frontend Developer",
  email: "alex@example.com",
  phone: "+92 300 1234567",
  location: "Lahore, Pakistan",
  summary:
    "Frontend developer building responsive, accessible web experiences with React and modern JavaScript.",
  skills: "React, JavaScript, HTML, CSS, Git, REST APIs",
  experience: [
    {
      role: "Frontend Developer",
      company: "Bright Labs",
      dates: "2024 — Present",
      bullets: [
        "Built responsive React interfaces used by internal teams.",
        "Improved page performance through reusable components and optimized assets.",
      ],
    },
  ],
  education: [
    {
      degree: "BS Computer Science",
      school: "University",
      dates: "2021 — 2025",
    },
  ],
};

const jdDefault = `We are looking for a Frontend Developer with React, JavaScript, TypeScript, HTML, CSS, REST APIs, Git and accessibility experience. You will build responsive web applications, collaborate with designers and improve performance.`;

const navItems = [
  { name: "Dashboard", icon: "⌂" },
  { name: "Resume Editor", icon: "✎" },
  { name: "ATS Optimizer", icon: "◉" },
  { name: "Versions", icon: "◫" },
  { name: "Settings", icon: "⚙" },
];

function App() {
  const [data, setData] = useState(() =>
    JSON.parse(localStorage.getItem("resumeData") || JSON.stringify(starter))
  );

  const [jd, setJd] = useState(
    () => localStorage.getItem("jobDescription") || jdDefault
  );

  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem("sidebarCollapsed") === "true"
  );

  const [page, setPage] = useState("Dashboard");

  const [saved, setSaved] = useState(() =>
    JSON.parse(localStorage.getItem("versions") || "[]")
  );

  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("jobDescription", jd);
  }, [jd]);

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);

  useEffect(() => {
    localStorage.setItem("versions", JSON.stringify(saved));
  }, [saved]);

  const keywords = useMemo(
    () =>
      [
        ...new Set(
          (jd.toLowerCase().match(/[a-z][a-z+#.-]{2,}/g) || []).filter(
            (x) =>
              ![
                "the",
                "and",
                "with",
                "you",
                "will",
                "are",
                "for",
                "your",
                "this",
                "that",
                "from",
                "into",
              ].includes(x)
          )
        ),
      ],
    [jd]
  );

  const resumeText = JSON.stringify(data).toLowerCase();
  const found = keywords.filter((k) => resumeText.includes(k));

  const score = Math.min(
    100,
    Math.round((found.length / Math.max(keywords.length, 1)) * 100)
  );

  const notify = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2200);
  };

  const update = (key, value) => {
    setData((d) => ({
      ...d,
      [key]: value,
    }));
  };

  const saveVersion = () => {
    const version = {
      ...data,
      savedAt: new Date().toLocaleString(),
    };

    setSaved((s) => [version, ...s].slice(0, 10));
    notify("Version saved");
  };

  const addExp = () => {
    update("experience", [
      ...data.experience,
      {
        role: "New Role",
        company: "Company",
        dates: "2025 — Present",
        bullets: ["Add a measurable achievement here."],
      },
    ]);
  };

  const rewrite = (i, j) => {
    const bullet = data.experience[i].bullets[j];

    if (!bullet.trim()) return;

    const newBullet = bullet.replace(/^./, (c) => c.toUpperCase());

    update(
      "experience",
      data.experience.map((experience, experienceIndex) =>
        experienceIndex === i
          ? {
              ...experience,
              bullets: experience.bullets.map((item, bulletIndex) =>
                bulletIndex === j
                  ? `Improved ${newBullet.toLowerCase()}`
                  : item
              ),
            }
          : experience
      )
    );

    notify("Bullet rewritten without adding new facts");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    let y = 18;

    const line = (text, size = 10) => {
      doc.setFontSize(size);
      doc.text(String(text), 15, y);
      y += size * 0.55 + 3;
    };

    line(data.name, 20);
    line(data.title, 12);
    line(`${data.email} | ${data.phone} | ${data.location}`, 9);

    y += 3;

    line("SUMMARY", 12);
    line(data.summary, 9);

    y += 3;

    line("SKILLS", 12);
    line(data.skills, 9);

    y += 3;

    line("EXPERIENCE", 12);

    data.experience.forEach((experience) => {
      line(
        `${experience.role} — ${experience.company} (${experience.dates})`,
        10
      );

      experience.bullets.forEach((bullet) => {
        line("• " + bullet, 9);
      });
    });

    y += 3;

    line("EDUCATION", 12);

    data.education.forEach((education) => {
      line(
        `${education.degree} — ${education.school} (${education.dates})`,
        9
      );
    });

    doc.save("resume.pdf");
    notify("PDF exported");
  };

  return (
    <div
      className={`app ${dark ? "dark" : ""} ${
        collapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <aside className="sidebar">
        <div className="brand">
          <span className="brandIcon">✦</span>
          <b className="brandText">ResumeForge</b>
        </div>

        <button
          className="collapseBtn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <span>{collapsed ? "→" : "←"}</span>
          {!collapsed && <span>sidebar</span>}
        </button>

        <nav className="mainNav">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={page === item.name ? "active" : ""}
              onClick={() => setPage(item.name)}
              title={collapsed ? item.name : ""}
            >
              <span className="navIcon">{item.icon}</span>
              <span className="navText">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sideBottom">
          <button
            className="themeBtn"
            onClick={() => setDark(!dark)}
            title={collapsed ? (dark ? "Light mode" : "Dark mode") : ""}
          >
            <span className="navIcon">☼</span>
            <span className="navText">
              {dark ? "Light mode" : "Dark mode"}
            </span>
          </button>

          {!collapsed && (
            <small>Secure local demo • No invented experience</small>
          )}
        </div>
      </aside>

      <main>
        <header>
          <div>
            <h1>{page}</h1>
            <p>
              Build a clear, ATS-friendly resume that stays truthful to your
              experience.
            </p>
          </div>

          <div className="actions">
            <button className="secondary" onClick={saveVersion}>
              Save version
            </button>

            <button className="primary" onClick={exportPDF}>
              Export PDF
            </button>
          </div>
        </header>

        {page === "Dashboard" && (
          <Dashboard
            score={score}
            data={data}
            setPage={setPage}
            found={found.length}
            total={keywords.length}
          />
        )}

        {page === "Resume Editor" && (
          <Editor
            data={data}
            update={update}
            addExp={addExp}
            rewrite={rewrite}
          />
        )}

        {page === "ATS Optimizer" && (
          <ATS
            jd={jd}
            setJd={setJd}
            score={score}
            found={found}
            keywords={keywords}
          />
        )}

        {page === "Versions" && (
          <Versions saved={saved} setData={setData} />
        )}

        {page === "Settings" && (
          <Settings dark={dark} setDark={setDark} />
        )}

        {toast && <div className="toast">{toast}</div>}
      </main>
    </div>
  );
}

function Dashboard({ score, data, setPage, found, total }) {
  return (
    <section className="grid">
      <div className="card hero">
        <span className="eyebrow">AI RESUME WORKSPACE</span>

        <h2>Your resume is ready for its next opportunity.</h2>

        <p>
          Edit your content, analyze a job description and export a polished
          PDF.
        </p>

        <button
          className="primary"
          onClick={() => setPage("Resume Editor")}
        >
          Open editor →
        </button>
      </div>

      <div className="card score">
        <div className="ring" style={{ "--p": `${score}%` }}>
          <b>{score}</b>
          <span>/100</span>
        </div>

        <div>
          <h3>ATS keyword coverage</h3>

          <p>
            {found} of {total} detected keywords appear in your resume.
          </p>

          <button
            className="link"
            onClick={() => setPage("ATS Optimizer")}
          >
            View recommendations →
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Resume snapshot</h3>

        <div className="stats">
          <b>
            {data.experience.length}
            <span>Roles</span>
          </b>

          <b>
            {data.skills.split(",").filter(Boolean).length}
            <span>Skills</span>
          </b>

          <b>
            {data.education.length}
            <span>Education</span>
          </b>
        </div>
      </div>

      <div className="card tips">
        <h3>ATS checklist</h3>
        <p>✓ Standard section headings</p>
        <p>✓ Text-based content</p>
        <p>✓ Keywords from the job description</p>
        <p>✓ No fabricated achievements</p>
      </div>
    </section>
  );
}

function Editor({ data, update, addExp, rewrite }) {
  return (
    <section className="editorGrid">
      <div className="card form">
        <h3>Personal information</h3>

        <div className="two">
          <Field
            label="Full name"
            value={data.name}
            set={(v) => update("name", v)}
          />

          <Field
            label="Target title"
            value={data.title}
            set={(v) => update("title", v)}
          />

          <Field
            label="Email"
            value={data.email}
            set={(v) => update("email", v)}
          />

          <Field
            label="Phone"
            value={data.phone}
            set={(v) => update("phone", v)}
          />
        </div>

        <Field
          label="Location"
          value={data.location}
          set={(v) => update("location", v)}
        />

        <Field
          label="Professional summary"
          value={data.summary}
          set={(v) => update("summary", v)}
          area
        />

        <Field
          label="Skills (comma separated)"
          value={data.skills}
          set={(v) => update("skills", v)}
        />

        <div className="sectionHead">
          <h3>Experience</h3>

          <button className="secondary" onClick={addExp}>
            + Add role
          </button>
        </div>

        {data.experience.map((e, i) => (
          <div className="exp" key={i}>
            <div className="two">
              <Field
                label="Role"
                value={e.role}
                set={(v) =>
                  update(
                    "experience",
                    data.experience.map((x, n) =>
                      n === i ? { ...x, role: v } : x
                    )
                  )
                }
              />

              <Field
                label="Company"
                value={e.company}
                set={(v) =>
                  update(
                    "experience",
                    data.experience.map((x, n) =>
                      n === i ? { ...x, company: v } : x
                    )
                  )
                }
              />
            </div>

            <Field
              label="Dates"
              value={e.dates}
              set={(v) =>
                update(
                  "experience",
                  data.experience.map((x, n) =>
                    n === i ? { ...x, dates: v } : x
                  )
                )
              }
            />

            {e.bullets.map((b, j) => (
              <div className="bulletRow" key={j}>
                <textarea
                  value={b}
                  onChange={(ev) =>
                    update(
                      "experience",
                      data.experience.map((x, n) =>
                        n === i
                          ? {
                              ...x,
                              bullets: x.bullets.map((q, m) =>
                                m === j ? ev.target.value : q
                              ),
                            }
                          : x
                      )
                    )
                  }
                />

                <button
                  className="icon"
                  title="Rewrite bullet"
                  onClick={() => rewrite(i, j)}
                >
                  AI
                </button>
              </div>
            ))}
          </div>
        ))}

        <h3>Education</h3>

        {data.education.map((e, i) => (
          <div className="two" key={i}>
            <Field
              label="Degree"
              value={e.degree}
              set={(v) =>
                update(
                  "education",
                  data.education.map((x, n) =>
                    n === i ? { ...x, degree: v } : x
                  )
                )
              }
            />

            <Field
              label="School"
              value={e.school}
              set={(v) =>
                update(
                  "education",
                  data.education.map((x, n) =>
                    n === i ? { ...x, school: v } : x
                  )
                )
              }
            />
          </div>
        ))}
      </div>

      <Preview data={data} />
    </section>
  );
}

function Field({ label, value, set, area }) {
  return (
    <label className="field">
      <span>{label}</span>

      {area ? (
        <textarea
          value={value}
          onChange={(e) => set(e.target.value)}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => set(e.target.value)}
        />
      )}
    </label>
  );
}

function Preview({ data }) {
  return (
    <div className="card preview">
      <div className="paper">
        <h2>{data.name}</h2>
        <h4>{data.title}</h4>

        <small>
          {data.email} · {data.phone} · {data.location}
        </small>

        <h5>SUMMARY</h5>
        <p>{data.summary}</p>

        <h5>SKILLS</h5>
        <p>{data.skills}</p>

        <h5>EXPERIENCE</h5>

        {data.experience.map((e, i) => (
          <div key={i}>
            <b>
              {e.role} — {e.company}
            </b>

            <small>{e.dates}</small>

            {e.bullets.map((b, j) => (
              <p key={j}>• {b}</p>
            ))}
          </div>
        ))}

        <h5>EDUCATION</h5>

        {data.education.map((e, i) => (
          <p key={i}>
            <b>{e.degree}</b> — {e.school}
          </p>
        ))}
      </div>
    </div>
  );
}

function ATS({ jd, setJd, score, found, keywords }) {
  return (
    <section className="ats">
      <div className="card">
        <h3>Paste a job description</h3>

        <textarea
          className="jd"
          value={jd}
          onChange={(e) => setJd(e.target.value)}
        />

        <p className="muted">
          Analysis is based on your resume content. Missing keywords are
          suggestions, not claims you should add without evidence.
        </p>
      </div>

      <div className="card">
        <div className="atsTop">
          <div>
            <span className="eyebrow">MATCH SCORE</span>
            <h2>{score}/100</h2>
          </div>

          <div className="progress">
            <i style={{ width: `${score}%` }} />
          </div>
        </div>

        <h3>Keyword coverage</h3>

        <div className="chips">
          {keywords.map((k) => (
            <span
              className={found.includes(k) ? "chip found" : "chip"}
              key={k}
            >
              {found.includes(k) ? "✓ " : ""}
              {k}
            </span>
          ))}
        </div>

        <h3>Actionable suggestions</h3>

        <ul>
          <li>
            Use exact terminology from the job description only when it
            truthfully reflects your experience.
          </li>

          <li>
            Keep bullets concise and lead with strong action verbs.
          </li>

          <li>
            Add measurable outcomes where you already know the real numbers.
          </li>

          <li>
            Avoid tables, graphics and unusual section titles in the final
            ATS PDF.
          </li>
        </ul>
      </div>
    </section>
  );
}

function Versions({ saved, setData }) {
  return (
    <section className="card">
      <h3>Version history</h3>

      {saved.length === 0 ? (
        <p className="muted">
          No saved versions yet. Save one from the top-right button.
        </p>
      ) : (
        saved.map((v, i) => (
          <div className="version" key={i}>
            <div>
              <b>Version {saved.length - i}</b>
              <small>{v.savedAt}</small>
            </div>

            <button
              className="secondary"
              onClick={() => setData(v)}
            >
              Restore
            </button>
          </div>
        ))
      )}
    </section>
  );
}

function Settings({ dark, setDark }) {
  return (
    <section className="card settings">
      <h3>Workspace settings</h3>

      <label className="toggle">
        <input
          type="checkbox"
          checked={dark}
          onChange={(e) => setDark(e.target.checked)}
        />

        <span>Dark theme</span>
      </label>

      <p>
        Accessibility: semantic labels, keyboard-friendly controls, visible
        focus states and responsive layouts are included.
      </p>

      <button
        className="secondary"
        onClick={() => {
          localStorage.clear();
          location.reload();
        }}
      >
        Reset local demo data
      </button>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);
