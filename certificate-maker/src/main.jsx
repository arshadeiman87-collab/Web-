import { supabase } from "./lib/supabase";
import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ChevronLeft,
  ChevronRight,
  LayoutTemplate,
  Upload,
  Type,
  Save,
  Download,
  Search,
  Menu,
} from "lucide-react";
import html2pdf from "html2pdf.js";
import "./style.css";

const styles = [
  { id: "classic", name: "Classic", tag: "Formal serif" },
  { id: "royal", name: "Royal Crest", tag: "Luxury badge" },
  { id: "modern", name: "Modern Blocks", tag: "Bold geometric" },
  { id: "minimal", name: "Minimal", tag: "Clean typography" },
  { id: "floral", name: "Floral", tag: "Decorative frame" },
  { id: "academic", name: "Academic", tag: "University style" },
  { id: "creative", name: "Creative", tag: "Playful layout" },
  { id: "corporate", name: "Corporate", tag: "Professional" },
];

const initial = {
  recipient: "Muhammad Ali",
  title: "CERTIFICATE OF ACHIEVEMENT",
  subtitle: "This certificate is proudly presented to",
  course: "Advanced Web Development",
  organization: "Demo Academy",
  date: "23 August 2026",
  id: "CERT-2026-001",
};

function TemplatePreview({ id }) {
  return (
    <div className={`templatePreview ${id}`}>
      <div className="previewDecor topDecor">✦</div>

      <div className="previewLogo">C</div>

      <div className="previewTitle">
        CERTIFICATE
      </div>

      <div className="previewSmall">
        OF ACHIEVEMENT
      </div>

      <div className="previewDivider" />

      <div className="previewPresented">
        This certificate is proudly presented to
      </div>

      <div className="previewName">
        Your Name
      </div>

      <div className="previewCourse">
        Advanced Web Development
      </div>

      <div className="previewFooter">
        <span>Demo Academy</span>
        <span>2026</span>
      </div>

      <div className="previewShape shapeOne" />
      <div className="previewShape shapeTwo" />
    </div>
  );
}

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [style, setStyle] = useState(styles[0]);
  const [data, setData] = useState(initial);

  const [assets, setAssets] = useState({
    logo: null,
    icon: null,
    signature: null,
    stamp: null,
  });

  const [records, setRecords] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("certRecords") || "[]"
      );
    } catch {
      return [];
    }
  });

  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("templates");

  const refs = {
    logo: useRef(),
    icon: useRef(),
    signature: useRef(),
    stamp: useRef(),
  };

  const set = (key, value) => {
    setData((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const upload = (key, event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setAssets((current) => ({
        ...current,
        [key]: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const save = () => {
    const record = {
      ...data,
      ...assets,
      style: style.id,
      savedAt: new Date().toISOString(),
    };

    const updatedRecords = [
      record,
      ...records.filter(
        (item) => item.id !== data.id
      ),
    ];

    setRecords(updatedRecords);

    localStorage.setItem(
      "certRecords",
      JSON.stringify(updatedRecords)
    );

    alert("Certificate record saved successfully.");
  };

  const exportPDF = async () => {
    const certificate =
      document.querySelector(".certificate");

    if (!certificate) {
      alert("Certificate canvas not found.");
      return;
    }

    const exportArea = certificate.cloneNode(true);

    exportArea.style.width = "1123px";
    exportArea.style.height = "794px";
    exportArea.style.minWidth = "1123px";
    exportArea.style.minHeight = "794px";
    exportArea.style.maxWidth = "1123px";
    exportArea.style.maxHeight = "794px";
    exportArea.style.margin = "0";
    exportArea.style.transform = "none";
    exportArea.style.position = "relative";
    exportArea.style.left = "0";
    exportArea.style.top = "0";
    exportArea.style.overflow = "hidden";

    const wrapper = document.createElement("div");

    wrapper.style.position = "fixed";
    wrapper.style.left = "-10000px";
    wrapper.style.top = "0";
    wrapper.style.width = "1123px";
    wrapper.style.height = "794px";
    wrapper.style.background = "#fff";
    wrapper.style.zIndex = "-9999";

    wrapper.appendChild(exportArea);
    document.body.appendChild(wrapper);

    const fileName = `${data.recipient || "Certificate"}-${
      data.id || "certificate"
    }`
      .replace(/[^a-z0-9-_]+/gi, "-")
      .replace(/-+/g, "-");

    const options = {
      margin: 0,
      filename: `${fileName}.pdf`,
      image: {
        type: "jpeg",
        quality: 1,
      },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
        imageTimeout: 15000,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "landscape",
        compress: true,
      },
      pagebreak: {
        mode: ["avoid-all"],
      },
    };

    try {
      await html2pdf()
        .set(options)
        .from(exportArea)
        .save();
    } catch (error) {
      console.error(error);
      alert(
        "PDF export failed. Please try again."
      );
    } finally {
      if (document.body.contains(wrapper)) {
        document.body.removeChild(wrapper);
      }
    }
  };

  const filtered = records.filter((record) =>
    `${record.recipient} ${record.id} ${record.course}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="app">

      {/* TOP BAR */}
      <header className="topbar">

        <div className="brand">
          <div className="brandMark">C</div>

          <div className="brandText">
            <b>CertiCanvas</b>
            <span>Certificate Maker</span>
          </div>
        </div>

        <div className="topActions">

          <button
            className="primary"
            onClick={save}
          >
            <Save size={16} />
            <span>Save</span>
          </button>

          <button onClick={exportPDF}>
            <Download size={16} />
            <span>Export PDF</span>
          </button>

        </div>
      </header>

      {/* WORKSPACE */}
      <div className="workspace">

        {/* SIDEBAR */}
        <aside
          className={`sidebar ${
            collapsed ? "collapsed" : ""
          }`}
        >

          <div className="sideTop">

            {!collapsed && (
              <div className="designTitle">
                <b>Design</b>
                <small>Customize certificate</small>
              </div>
            )}

            <button
              className="iconBtn collapseBtn"
              onClick={() =>
                setCollapsed((value) => !value)
              }
              title={
                collapsed
                  ? "Expand panel"
                  : "Collapse panel"
              }
            >
              {collapsed ? (
                <ChevronRight size={19} />
              ) : (
                <ChevronLeft size={19} />
              )}
            </button>

          </div>

          {/* NAV */}
          <nav className="sideNav">

            {[
              [
                "templates",
                LayoutTemplate,
                "Templates",
              ],
              [
                "text",
                Type,
                "Text & Content",
              ],
              [
                "assets",
                Upload,
                "Uploads",
              ],
              [
                "records",
                Save,
                "Issued Records",
              ],
            ].map(([key, Icon, name]) => (
              <button
                className={`navItem ${
                  tab === key ? "active" : ""
                }`}
                onClick={() => setTab(key)}
                key={key}
                title={
                  collapsed ? name : undefined
                }
              >
                <Icon size={18} />

                {!collapsed && (
                  <span>{name}</span>
                )}
              </button>
            ))}

          </nav>

          {/* TEMPLATE PANEL */}
          {!collapsed &&
            tab === "templates" && (
              <div className="sidePanel">

                <div className="panelHeading">
                  <div>
                    <div className="panelTitle">
                      Certificate Styles
                    </div>

                    <div className="muted">
                      Choose a complete design
                    </div>
                  </div>

                  <span className="templateCount">
                    {styles.length}
                  </span>
                </div>

                <div className="templateGrid">

                  {styles.map((item) => (
                    <button
                      className={`templateCard ${
                        style.id === item.id
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        setStyle(item)
                      }
                      key={item.id}
                    >

                      <TemplatePreview
                        id={item.id}
                      />

                      <div className="templateInfo">

                        <b>{item.name}</b>

                        <small>
                          {item.tag}
                        </small>

                      </div>

                      {style.id === item.id && (
                        <span className="selectedBadge">
                          ✓
                        </span>
                      )}

                    </button>
                  ))}

                </div>

              </div>
            )}

          {/* TEXT PANEL */}
          {!collapsed &&
            tab === "text" && (
              <div className="sidePanel">

                <div className="panelTitle">
                  Edit Content
                </div>

                <p className="muted">
                  Change certificate text below.
                </p>

                {[
                  ["title", "Certificate Title"],
                  ["recipient", "Recipient Name"],
                  ["subtitle", "Subtitle"],
                  ["course", "Course / Achievement"],
                  ["organization", "Organization"],
                  ["date", "Issue Date"],
                  ["id", "Certificate ID"],
                ].map(([key, label]) => (
                  <label
                    className="field"
                    key={key}
                  >
                    {label}

                    <input
                      value={data[key]}
                      onChange={(event) =>
                        set(
                          key,
                          event.target.value
                        )
                      }
                    />
                  </label>
                ))}

              </div>
            )}

          {/* ASSETS */}
          {!collapsed &&
            tab === "assets" && (
              <div className="sidePanel">

                <div className="panelTitle">
                  Brand Assets
                </div>

                <p className="muted">
                  Upload logo, icon, signature
                  or stamp.
                </p>

                {[
                  "logo",
                  "icon",
                  "signature",
                  "stamp",
                ].map((key) => (
                  <div
                    className="assetRow"
                    key={key}
                  >

                    <button
                      onClick={() =>
                        refs[key].current?.click()
                      }
                    >
                      <Upload size={15} />
                      Upload {key}
                    </button>

                    <input
                      ref={refs[key]}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(event) =>
                        upload(key, event)
                      }
                    />

                    {assets[key] && (
                      <img
                        src={assets[key]}
                        alt={key}
                      />
                    )}

                  </div>
                ))}

              </div>
            )}

          {/* RECORDS */}
          {!collapsed &&
            tab === "records" && (
              <div className="sidePanel">

                <div className="panelTitle">
                  Issued Certificates
                </div>

                <div className="searchBox">

                  <Search size={15} />

                  <input
                    placeholder="Search certificates..."
                    value={query}
                    onChange={(event) =>
                      setQuery(
                        event.target.value
                      )
                    }
                  />

                </div>

                <div className="records">

                  {filtered.length === 0 ? (
                    <div className="emptyRecords">
                      No certificates found.
                    </div>
                  ) : (
                    filtered.map((record) => (
                      <div
                        className="record"
                        key={record.id}
                      >
                        <b>
                          {record.recipient}
                        </b>

                        <span>
                          {record.id}
                        </span>

                        <small>
                          {record.course}
                        </small>
                      </div>
                    ))
                  )}

                </div>

              </div>
            )}

        </aside>

        {/* EDITOR */}
        <main className="editor">

          <div className="editorBar">

            <div className="editorInfo">
              <b>{style.name}</b>
              <span>
                • Certificate canvas
              </span>
            </div>

            <button
              className="showPanel"
              onClick={() =>
                setCollapsed(false)
              }
            >
              <Menu size={16} />
              Design panel
            </button>

          </div>

          {/* CANVAS */}
          <div className="canvasArea">

            <div
              className={`certificate ${style.id}`}
            >

              {assets.logo && (
                <img
                  className="certLogo"
                  src={assets.logo}
                  alt="Logo"
                />
              )}

              {assets.icon && (
                <img
                  className="certIcon"
                  src={assets.icon}
                  alt="Icon"
                />
              )}

              {assets.stamp && (
                <img
                  className="certStamp"
                  src={assets.stamp}
                  alt="Stamp"
                />
              )}

              <div className="certTitle">
                {data.title}
              </div>

              <div className="certSubtitle">
                {data.subtitle}
              </div>

              <div className="recipient">
                {data.recipient}
              </div>

              <div className="certSubtitle">
                has successfully completed
              </div>

              <div className="course">
                {data.course}
              </div>

              <div className="certMeta">
                <span>
                  {data.organization}
                </span>

                <span>
                  {data.date}
                </span>

                <span>
                  ID: {data.id}
                </span>
              </div>

              {assets.signature && (
                <img
                  className="certSignature"
                  src={assets.signature}
                  alt="Signature"
                />
              )}

              <div className="signatureLine">
                Authorized Signature
              </div>

            </div>

          </div>

        </main>

      </div>
    </div>
  );
}

createRoot(
  document.getElementById("root")
).render(<App />);