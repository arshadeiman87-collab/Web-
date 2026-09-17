
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  LayoutDashboard,
  Users,
  Package,
  Receipt,
  TicketPercent,
  BrainCircuit,
  ShieldCheck,
  ScrollText,
  Menu,
  X,
  Search,
  Plus,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Send,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react";

import "./style.css";

const API = "http://localhost:5000/api";

const nav = [
  ["Overview", LayoutDashboard],
  ["Customers", Users],
  ["Products & Plans", Package],
  ["Invoices", Receipt],
  ["Coupons", TicketPercent],
  ["Revenue AI", BrainCircuit],
  ["Access & Audit", ShieldCheck]
];

function App() {
  const [page, setPage] = useState("Overview");
  const [open, setOpen] = useState(false);

  // Desktop sidebar state
  const [collapsed, setCollapsed] = useState(false);

  const [data, setData] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [products, setProducts] = useState([]);
  const [plans, setPlans] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [audit, setAudit] = useState([]);

  const load = async () => {
    try {
      const gets = await Promise.all(
        [
          "dashboard",
          "customers",
          "invoices",
          "products",
          "plans",
          "coupons",
          "audit"
        ].map((x) =>
          fetch(`${API}/${x}`).then((r) => r.json())
        )
      );

      setData(gets[0]);
      setCustomers(gets[1]);
      setInvoices(gets[2]);
      setProducts(gets[3]);
      setPlans(gets[4]);
      setCoupons(gets[5]);
      setAudit(gets[6]);
    } catch (error) {
      console.error("Failed to load workspace:", error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const go = (p) => {
    setPage(p);
    setOpen(false);
  };

  if (!data) {
    return (
      <div className="loading">
        <div className="loading-box">
          <div className="loading-spinner"></div>
          <span>Loading billing workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${collapsed ? "sidebar-collapsed" : ""}`}>

      {/* ================= HEADER ================= */}
      <header>
        <button
          className="mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>

        <div className="brand">
          <div className="brandmark">R</div>

          <div className="brand-text">
            <b>Revora</b>
            <span>Billing Intelligence</span>
          </div>
        </div>

        <div className="top-actions">
          <span className="secure">
            <ShieldCheck size={15} />
            Secure workspace
          </span>

          <div className="avatar">EA</div>
        </div>
      </header>

      {/* ================= MAIN LAYOUT ================= */}
      <div className="layout">

        {/* ================= SIDEBAR ================= */}
        <aside className={open ? "show" : ""}>

          {/* Sidebar top */}
          <div className="sidebar-top">

            <div className="sidebar-label">
              <span>WORKSPACE</span>
            </div>

            <button
              className="collapse-btn"
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <PanelLeftOpen size={18} />
              ) : (
                <PanelLeftClose size={18} />
              )}

              <span>
                {collapsed ? "Expand" : "Collapse"}
              </span>
            </button>

          </div>

          {/* Navigation */}
          <nav className="sidebar-nav">

            {nav.map(([name, Icon]) => (
              <button
                className={page === name ? "active" : ""}
                onClick={() => go(name)}
                key={name}
                title={collapsed ? name : ""}
              >
                <span className="nav-icon">
                  <Icon size={18} />
                </span>

                <span className="nav-text">
                  {name}
                </span>
              </button>
            ))}

          </nav>

          {/* Sidebar bottom */}
          <div className="side-bottom">
            <ScrollText size={17} />

            <span>
              Audit-ready controls
            </span>
          </div>

        </aside>

        {/* ================= CONTENT ================= */}
        <main>

          {page === "Overview" && (
            <Overview
              data={data}
              customers={customers}
              invoices={invoices}
              setPage={setPage}
            />
          )}

          {page === "Customers" && (
            <Customers customers={customers} />
          )}

          {page === "Products & Plans" && (
            <Products
              products={products}
              plans={plans}
              reload={load}
            />
          )}

          {page === "Invoices" && (
            <Invoices
              invoices={invoices}
              reload={load}
            />
          )}

          {page === "Coupons" && (
            <Coupons
              coupons={coupons}
              reload={load}
            />
          )}

          {page === "Revenue AI" && <RevenueAI />}

          {page === "Access & Audit" && (
            <Access
              audit={audit}
              reload={load}
            />
          )}

        </main>
      </div>
    </div>
  );
}


/* =====================================================
   HEADER
===================================================== */

function Header({ eyebrow, title, sub, action }) {
  return (
    <div className="page-head">

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


/* =====================================================
   STAT
===================================================== */

function Stat({
  label,
  value,
  change,
  icon: Icon,
  alert
}) {
  return (
    <div className="stat">

      <div className="stat-top">
        <span>{label}</span>

        <div className={alert ? "icon alert" : "icon"}>
          <Icon size={18} />
        </div>
      </div>

      <strong>{value}</strong>

      <small className={alert ? "bad" : "up"}>
        {change}
      </small>

    </div>
  );
}


/* =====================================================
   OVERVIEW
===================================================== */

function Overview({
  data,
  customers,
  invoices,
  setPage
}) {
  return (
    <>
      <Header
        eyebrow="FINANCIAL COMMAND CENTER"
        title="Revenue at a glance"
        sub="Subscription health, cash collection and customer signals in one place."
        action={
          <button
            className="primary"
            onClick={() => setPage("Revenue AI")}
          >
            <BrainCircuit size={17} />
            Ask Revenue AI
          </button>
        }
      />

      <div className="stats">

        <Stat
          label="Monthly recurring revenue"
          value={`$${data.mrr.toLocaleString()}`}
          change="+8.4% vs last month"
          icon={ArrowUpRight}
        />

        <Stat
          label="Annual recurring revenue"
          value={`$${data.arr.toLocaleString()}`}
          change="Annualized run-rate"
          icon={ArrowUpRight}
        />

        <Stat
          label="Active subscriptions"
          value={data.active}
          change="Healthy base"
          icon={CheckCircle2}
        />

        <Stat
          label="Past-due accounts"
          value={data.pastDue}
          change="Needs recovery"
          icon={AlertTriangle}
          alert
        />

      </div>

      <div className="grid2">

        <section className="card">

          <div className="card-head">
            <div>
              <h2>Subscription health</h2>
              <p>Current customer states</p>
            </div>

            <button
              className="textbtn"
              onClick={() => setPage("Customers")}
            >
              View customers
              <ChevronRight size={16} />
            </button>
          </div>

          {customers.map((c) => (
            <div className="row" key={c.id}>

              <div className="person">

                <div className="logo">
                  {c.name.slice(0, 1)}
                </div>

                <div>
                  <b>{c.name}</b>
                  <span>{c.email}</span>
                </div>

              </div>

              <span className={`pill ${c.status}`}>
                {c.status.replace("_", " ")}
              </span>

              <strong>${c.mrr}</strong>

            </div>
          ))}

        </section>


        <section className="card">

          <div className="card-head">
            <div>
              <h2>Collection queue</h2>
              <p>Invoices requiring attention</p>
            </div>
          </div>

          {invoices
            .filter((i) => i.status !== "paid")
            .map((i) => (
              <div className="row" key={i.id}>

                <div>
                  <b>{i.id}</b>
                  <span>
                    {i.customer} · due {i.due}
                  </span>
                </div>

                <span className={`pill ${i.status}`}>
                  {i.status}
                </span>

                <strong>${i.amount}</strong>

              </div>
            ))}

          <div className="insight">
            <BrainCircuit size={20} />

            <div>
              <b>Recovery opportunity</b>

              <p>
                Past-due accounts represent a focused dunning queue.
                Run a recovery simulation from Invoices.
              </p>
            </div>
          </div>

        </section>

      </div>
    </>
  );
}


/* =====================================================
   CUSTOMERS
===================================================== */

function Customers({ customers }) {
  return (
    <>
      <Header
        eyebrow="CUSTOMER LIFECYCLE"
        title="Customers & entitlements"
        sub="Subscription state, plan access and recurring value."
      />

      <section className="card table-card">

        <div className="toolbar">

          <div className="search">
            <Search size={17} />

            <input placeholder="Search customers" />
          </div>

          <span className="muted">
            {customers.length} accounts
          </span>

        </div>

        <div className="table">

          <div className="tr th">
            <span>Customer</span>
            <span>Plan</span>
            <span>Status</span>
            <span>MRR</span>
          </div>

          {customers.map((c) => (
            <div className="tr" key={c.id}>

              <span>
                <b>{c.name}</b>
                <small>{c.email}</small>
              </span>

              <span>{c.planId}</span>

              <span>
                <i className={`dot ${c.status}`}></i>
                {c.status.replace("_", " ")}
              </span>

              <span>
                <b>${c.mrr}</b>
              </span>

            </div>
          ))}

        </div>
      </section>
    </>
  );
}


/* =====================================================
   PRODUCTS
===================================================== */

function Products({
  products,
  plans,
  reload
}) {
  const [show, setShow] = useState(false);
  const [kind, setKind] = useState("product");

  const submit = async (e) => {
    e.preventDefault();

    const f = new FormData(e.currentTarget);
    const body = Object.fromEntries(f);

    await fetch(
      `${API}/${kind === "product" ? "products" : "plans"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );

    setShow(false);
    reload();
  };

  return (
    <>
      <Header
        eyebrow="CATALOG & PACKAGING"
        title="Products and plans"
        sub="Build offers, trials and recurring pricing."
        action={
          <button
            className="primary"
            onClick={() => {
              setKind("product");
              setShow(true);
            }}
          >
            <Plus size={17} />
            New product
          </button>
        }
      />

      <div className="product-grid">

        {products.map((p) => (
          <section className="card" key={p.id}>

            <div className="product-title">

              <div className="product-icon">
                <Package />
              </div>

              <div>
                <h2>{p.name}</h2>
                <p>{p.description}</p>
              </div>

            </div>

            <div className="plans">

              {plans
                .filter((x) => x.productId === p.id)
                .map((x) => (
                  <div className="plan" key={x.id}>

                    <b>{x.name}</b>

                    <strong>
                      ${x.price / 100}
                      <small>/mo</small>
                    </strong>

                    <span>
                      {x.trialDays}-day trial · {x.currency}
                    </span>

                  </div>
                ))}

            </div>

            <button
              className="secondary"
              onClick={() => {
                setKind("plan");
                setShow(true);
              }}
            >
              <Plus size={15} />
              Add plan
            </button>

          </section>
        ))}

      </div>

      {show && (
        <Modal
          title={
            kind === "product"
              ? "Create product"
              : "Create plan"
          }
          close={() => setShow(false)}
        >

          <form onSubmit={submit}>

            <label>
              Name
              <input
                name="name"
                required
                placeholder={
                  kind === "product"
                    ? "Analytics Platform"
                    : "Professional"
                }
              />
            </label>

            {kind === "product" ? (
              <label>
                Description
                <textarea
                  name="description"
                  placeholder="What this product provides"
                />
              </label>
            ) : (
              <>
                <label>
                  Price (cents)
                  <input
                    name="price"
                    type="number"
                    defaultValue="9900"
                  />
                </label>

                <label>
                  Trial days
                  <input
                    name="trialDays"
                    type="number"
                    defaultValue="14"
                  />
                </label>

                <label>
                  Product
                  <select name="productId">
                    {products.map((p) => (
                      <option
                        value={p.id}
                        key={p.id}
                      >
                        {p.name}
                      </option>
                    ))}
                  </select>
                </label>
              </>
            )}

            <button className="primary full">
              Create
            </button>

          </form>

        </Modal>
      )}
    </>
  );
}


/* =====================================================
   INVOICES
===================================================== */

function Invoices({
  invoices,
  reload
}) {
  const dunning = async (id) => {
    await fetch(`${API}/dunning/${id}`, {
      method: "POST"
    });

    reload();
  };

  return (
    <>
      <Header
        eyebrow="BILLING OPERATIONS"
        title="Invoices & collections"
        sub="Track payment state and simulate recovery sequences."
      />

      <section className="card table-card">

        <div className="table">

          <div className="tr th">
            <span>Invoice</span>
            <span>Customer</span>
            <span>Due</span>
            <span>Amount</span>
            <span>Action</span>
          </div>

          {invoices.map((i) => (
            <div className="tr" key={i.id}>

              <span>
                <b>{i.id}</b>
              </span>

              <span>{i.customer}</span>

              <span>{i.due}</span>

              <span>
                <b>${i.amount}</b>
              </span>

              <span>

                {i.status === "past_due" ? (
                  <button
                    className="smallbtn"
                    onClick={() => dunning(i.id)}
                  >
                    <Send size={14} />
                    Simulate dunning
                  </button>
                ) : (
                  <span className={`pill ${i.status}`}>
                    {i.status}
                  </span>
                )}

                {i.dunning && (
                  <em className="dunning">
                    Retry scheduled
                  </em>
                )}

              </span>

            </div>
          ))}

        </div>

      </section>
    </>
  );
}


/* =====================================================
   COUPONS
===================================================== */

function Coupons({
  coupons,
  reload
}) {
  const [show, setShow] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const f = new FormData(e.currentTarget);

    await fetch(`${API}/coupons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        Object.fromEntries(f)
      )
    });

    setShow(false);
    reload();
  };

  return (
    <>
      <Header
        eyebrow="PROMOTIONS"
        title="Coupons"
        sub="Manage controlled discounts and redemption visibility."
        action={
          <button
            className="primary"
            onClick={() => setShow(true)}
          >
            <Plus size={17} />
            Create coupon
          </button>
        }
      />

      <div className="coupon-grid">

        {coupons.map((c) => (
          <div className="card coupon" key={c.id}>

            <div className="coupon-icon">
              <TicketPercent />
            </div>

            <div>

              <span className="code">
                {c.id}
              </span>

              <h2>{c.name}</h2>

              <p>
                {c.value}% off recurring charges
              </p>

              <small>
                {c.redemptions} redemptions ·{" "}
                <b>Active</b>
              </small>

            </div>

          </div>
        ))}

      </div>

      {show && (
        <Modal
          title="Create coupon"
          close={() => setShow(false)}
        >

          <form onSubmit={submit}>

            <label>
              Code
              <input
                name="code"
                required
                placeholder="WELCOME15"
              />
            </label>

            <label>
              Name
              <input
                name="name"
                required
                placeholder="New customer offer"
              />
            </label>

            <label>
              Discount %
              <input
                name="value"
                type="number"
                min="1"
                max="100"
                defaultValue="15"
              />
            </label>

            <button className="primary full">
              Create coupon
            </button>

          </form>

        </Modal>
      )}
    </>
  );
}


/* =====================================================
   REVENUE AI
===================================================== */

function RevenueAI() {
  const [q, setQ] = useState(
    "What is our current MRR?"
  );

  const [r, setR] = useState(null);
  const [busy, setBusy] = useState(false);

  const ask = async () => {
    setBusy(true);

    const x = await fetch(
      `${API}/revenue-query`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: q
        })
      }
    ).then((r) => r.json());

    setR(x);
    setBusy(false);
  };

  const churn = async () =>
    setR(
      await fetch(
        `${API}/churn-summary`,
        {
          method: "POST"
        }
      ).then((r) => r.json())
    );

  return (
    <>
      <Header
        eyebrow="APPROVED-METRIC INTELLIGENCE"
        title="Revenue AI"
        sub="Explore governed financial metrics with natural language and churn signals."
      />

      <div className="ai-layout">

        <section className="card ai-box">

          <div className="ai-orb">
            <BrainCircuit size={30} />
          </div>

          <h2>Ask a revenue question</h2>

          <p>
            Answers are limited to approved metrics and live workspace data.
          </p>

          <textarea
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ask about MRR, ARR, active subscriptions or past-due revenue..."
          />

          <div className="chips">

            <button
              onClick={() =>
                setQ("What is our MRR?")
              }
            >
              MRR
            </button>

            <button
              onClick={() =>
                setQ(
                  "How much revenue is past due?"
                )
              }
            >
              Past due
            </button>

            <button
              onClick={() =>
                setQ(
                  "How many active subscriptions?"
                )
              }
            >
              Active subs
            </button>

          </div>

          <button
            className="primary full"
            onClick={ask}
          >
            {busy
              ? "Analyzing..."
              : "Explore metric"}
          </button>

          {r && (
            <div className="answer">

              <span>APPROVED OUTPUT</span>

              <h3>{r.answer}</h3>

              <small>
                {r.metric || "Churn intelligence"} · governed metric response
              </small>

            </div>
          )}

        </section>

        <section className="card churn">

          <div className="card-head">

            <div>
              <h2>AI churn summary</h2>
              <p>Risk signals from subscription state</p>
            </div>

            <div className="icon">
              <AlertTriangle size={18} />
            </div>

          </div>

          <div className="risk">
            <strong>2</strong>
            <span>
              accounts with immediate lifecycle signals
            </span>
          </div>

          <ul>
            <li>Past-due payment state</li>
            <li>Trial activation window</li>
            <li>Recovery outreach opportunity</li>
          </ul>

          <button
            className="secondary full"
            onClick={churn}
          >
            Generate churn summary
          </button>

        </section>

      </div>
    </>
  );
}


/* =====================================================
   ACCESS
===================================================== */

function Access({
  audit,
  reload
}) {
  const [role, setRole] = useState("admin");

  const change = async (r) => {
    setRole(r);

    await fetch(`${API}/role`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        role: r
      })
    });

    reload();
  };

  return (
    <>
      <Header
        eyebrow="GOVERNANCE"
        title="Access & audit"
        sub="Role controls and traceable billing operations."
      />

      <div className="grid2">

        <section className="card">

          <h2>Role access</h2>

          <p>
            Switch the active workspace role to validate permission-aware workflows.
          </p>

          {[
            "admin",
            "billing_manager",
            "analyst",
            "support"
          ].map((r) => (
            <button
              key={r}
              className={
                role === r
                  ? "role active"
                  : "role"
              }
              onClick={() => change(r)}
            >

              <ShieldCheck size={17} />

              <span>
                <b>{r}</b>

                <small>
                  {r === "admin"
                    ? "Full control"
                    : r === "analyst"
                    ? "Read-only approved metrics"
                    : "Billing operations"}
                </small>
              </span>

              <ChevronRight size={16} />

            </button>
          ))}

        </section>


        <section className="card">

          <div className="card-head">

            <div>
              <h2>Audit trail</h2>
              <p>Recent security and financial events</p>
            </div>

          </div>

          {audit.length ? (
            <div className="audit">

              {audit.slice(0, 10).map((e) => (
                <div key={e.id}>

                  <Clock3 size={15} />

                  <span>
                    <b>{e.action}</b>

                    <small>
                      {new Date(e.at).toLocaleString()}
                    </small>
                  </span>

                </div>
              ))}

            </div>
          ) : (
            <div className="empty">
              No events yet. Billing actions will appear here.
            </div>
          )}

        </section>

      </div>
    </>
  );
}


/* =====================================================
   MODAL
===================================================== */

function Modal({
  title,
  close,
  children
}) {
  return (
    <div
      className="overlay"
      onMouseDown={(e) =>
        e.target === e.currentTarget &&
        close()
      }
    >

      <div className="modal">

        <div className="card-head">

          <h2>{title}</h2>

          <button
            className="close"
            onClick={close}
          >
            <X />
          </button>

        </div>

        {children}

      </div>

    </div>
  );
}


createRoot(
  document.getElementById("root")
).render(<App />);
