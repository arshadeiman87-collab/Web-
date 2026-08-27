 import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import {
  Sparkles,
  Hotel,
  Compass,
  CalendarDays,
  WalletCards,
  MapPin,
  Search,
  Plus,
  Trash2,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Menu,
  X,
  WifiOff,
  Send,
  Star,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "./styles.css";

const hotels = [
  {
    id: 1,
    name: "Pearl Continental Lahore",
    city: "Lahore, Pakistan",
    price: 145,
    rating: 4.6,
    type: "Luxury",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Avari Hotel Lahore",
    city: "Lahore, Pakistan",
    price: 118,
    rating: 4.4,
    type: "Premium",
    img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Serena Hotel Islamabad",
    city: "Islamabad, Pakistan",
    price: 132,
    rating: 4.7,
    type: "Luxury",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Hunza Serena Inn",
    city: "Hunza, Pakistan",
    price: 92,
    rating: 4.8,
    type: "Boutique",
    img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
  },
];

const activities = [
  {
    id: 1,
    name: "Lahore Food & Heritage Walk",
    city: "Lahore",
    price: 22,
    duration: "3 hrs",
    tag: "Food",
    img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Badshahi Mosque & Fort Tour",
    city: "Lahore",
    price: 18,
    duration: "2.5 hrs",
    tag: "Culture",
    img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Margalla Hills Guided Hike",
    city: "Islamabad",
    price: 25,
    duration: "4 hrs",
    tag: "Adventure",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Hunza Valley Scenic Day Trip",
    city: "Hunza",
    price: 40,
    duration: "8 hrs",
    tag: "Nature",
    img: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
  },
];

const money = (number) =>
  "$" + Number(number || 0).toLocaleString();

function App() {
  const [page, setPage] = useState("planner");

  // Mobile sidebar
  const [open, setOpen] = useState(false);

  // Desktop collapsible sidebar
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("trippilot-sidebar") === "collapsed";
  });

  const [offline, setOffline] = useState(!navigator.onLine);

  const [trip, setTrip] = useState({
    destination: "Lahore, Pakistan",
    days: 4,
    budget: 650,
    travelers: 2,
    style: "Culture & Food",
  });

  const [itinerary, setItinerary] = useState([]);
  const [search, setSearch] = useState("");
  const [inquiries, setInquiries] = useState([]);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const savedTrip = localStorage.getItem("trip");

    if (savedTrip) {
      try {
        setItinerary(JSON.parse(savedTrip));
      } catch {
        setItinerary([]);
      }
    }

    const online = () => setOffline(false);
    const offlineEvent = () => setOffline(true);

    window.addEventListener("online", online);
    window.addEventListener("offline", offlineEvent);

    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offlineEvent);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("trip", JSON.stringify(itinerary));
  }, [itinerary]);

  useEffect(() => {
    localStorage.setItem(
      "trippilot-sidebar",
      collapsed ? "collapsed" : "expanded"
    );
  }, [collapsed]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast("");
      }, 2200);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  const total = itinerary.reduce(
    (sum, day) =>
      sum +
      day.items.reduce(
        (itemSum, item) => itemSum + item.cost,
        0
      ),
    0
  );

  const generate = () => {
    const destination = trip.destination.toLowerCase();

    let city = "Lahore";

    if (destination.includes("islamabad")) {
      city = "Islamabad";
    } else if (destination.includes("hunza")) {
      city = "Hunza";
    }

    const hotel =
      hotels.find((hotel) => hotel.city.startsWith(city)) ||
      hotels[0];

    const cityActivities = activities.filter(
      (activity) => activity.city === city
    );

    const days = Array.from(
      { length: Math.max(1, trip.days) },
      (_, index) => ({
        id: Date.now() + index,
        day: index + 1,
        title:
          index === 0
            ? "Arrival & Orientation"
            : index === trip.days - 1
            ? "Highlights & Departure"
            : trip.style,
        items: [
          {
            type: "hotel",
            name: hotel.name,
            meta: "Stay / check-in",
            cost: hotel.price,
          },
          ...(cityActivities.length
            ? [
                {
                  type: "activity",
                  name:
                    cityActivities[index % cityActivities.length]
                      .name,
                  meta:
                    cityActivities[index % cityActivities.length]
                      .duration,
                  cost:
                    cityActivities[index % cityActivities.length]
                      .price,
                },
              ]
            : []),
        ],
      })
    );

    setItinerary(days);

    setToast(
      total > trip.budget
        ? "Plan generated — review budget."
        : "AI itinerary generated."
    );
  };

  const remove = (dayId, itemIndex) => {
    setItinerary((previous) =>
      previous.map((day) =>
        day.id === dayId
          ? {
              ...day,
              items: day.items.filter(
                (_, index) => index !== itemIndex
              ),
            }
          : day
      )
    );
  };

  const share = async () => {
    const summary = `TripPilot: ${trip.destination}, ${trip.days} days, ${money(
      total
    )}`;

    try {
      await navigator.clipboard.writeText(summary);
    } catch {
      // Clipboard can fail in some browsers
    }

    setToast("Share summary copied.");
  };

  const submitInquiry = (item) => {
    setInquiries((previous) => [
      ...previous,
      {
        name: item.name,
        type: item.type,
        status: "Pending",
        date: new Date().toLocaleDateString(),
      },
    ]);

    setModal(null);
    setToast("Booking inquiry submitted.");
  };

  const navigation = [
    ["planner", "AI Planner", Sparkles],
    ["itinerary", "My Itinerary", CalendarDays],
    ["hotels", "Hotels", Hotel],
    ["activities", "Activities", Compass],
    ["map", "Map & Routes", MapPin],
    ["budget", "Budget", WalletCards],
    ["inquiries", "Booking Inquiries", Send],
    ["sources", "Sources", CheckCircle2],
  ];

  return (
    <div
      className={`app ${
        collapsed ? "sidebar-collapsed" : ""
      }`}
    >
      {offline && (
        <div className="offline">
          <WifiOff size={15} />
          Offline mode — saved itinerary available
        </div>
      )}

      {/* HEADER */}
      <header>
        <button
          className="hamb"
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>

        <div className="brand">
          <span>
            <Sparkles size={17} />
          </span>

          <div className="brand-text">
            TripPilot <b>AI</b>
          </div>
        </div>

        <div className="top">
          <button onClick={share}>
            <Share2 size={16} />
            Share
          </button>

          <i>EA</i>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside
        className={`${open ? "open" : ""} ${
          collapsed ? "collapsed" : ""
        }`}
      >
        <div className="sidebar-top">
          <small>TRAVEL WORKSPACE</small>

          <button
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
            title={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
          >
            {collapsed ? (
              <ChevronRight size={17} />
            ) : (
              <ChevronLeft size={17} />
            )}
          </button>
        </div>

        <nav>
          {navigation.map(([id, label, Icon]) => (
            <button
              key={id}
              className={page === id ? "active" : ""}
              onClick={() => {
                setPage(id);
                setOpen(false);
              }}
              title={collapsed ? label : ""}
            >
              <Icon size={17} />

              <span className="nav-label">
                {label}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* CONTENT */}
      <main>
        {page === "planner" && (
          <Planner
            trip={trip}
            setTrip={setTrip}
            generate={generate}
            itinerary={itinerary}
            total={total}
          />
        )}

        {page === "itinerary" && (
          <Itinerary
            trip={trip}
            itinerary={itinerary}
            total={total}
            remove={remove}
            share={share}
          />
        )}

        {page === "hotels" && (
          <Catalog
            title="Verified Hotels"
            data={hotels.filter((hotel) =>
              (hotel.name + hotel.city)
                .toLowerCase()
                .includes(search.toLowerCase())
            )}
            search={search}
            setSearch={setSearch}
            type="Hotel"
            onBook={(item) =>
              setModal({
                type: "Hotel",
                name: item.name,
              })
            }
          />
        )}

        {page === "activities" && (
          <Catalog
            title="Activities & Experiences"
            data={activities.filter((activity) =>
              (activity.name + activity.city)
                .toLowerCase()
                .includes(search.toLowerCase())
            )}
            search={search}
            setSearch={setSearch}
            type="Activity"
            onBook={(item) =>
              setModal({
                type: "Activity",
                name: item.name,
              })
            }
          />
        )}

        {page === "map" && (
          <MapPage
            trip={trip}
            itinerary={itinerary}
          />
        )}

        {page === "budget" && (
          <Budget
            total={total}
            budget={trip.budget}
            itinerary={itinerary}
          />
        )}

        {page === "inquiries" && (
          <Inquiries data={inquiries} />
        )}

        {page === "sources" && <Sources />}
      </main>

      {modal && (
        <Modal
          item={modal}
          submit={submitInquiry}
          close={() => setModal(null)}
        />
      )}

      {toast && (
        <div className="toast">
          <CheckCircle2 size={16} />
          {toast}
        </div>
      )}
    </div>
  );
}


/* =========================
   PLANNER
========================= */

function Planner({
  trip,
  setTrip,
  generate,
  itinerary,
  total,
}) {
  return (
    <>
      <div className="hero">
        <div>
          <label className="eyebrow">
            <Sparkles size={14} />
            AI-POWERED TRAVEL PLANNER
          </label>

          <h1>
            Build a trip that fits <em>you.</em>
          </h1>

          <p>
            Personalized, editable day-by-day travel plans
            using verified destination and marketplace data.
          </p>
        </div>

        <div className="stat">
          Estimated total
          <strong>{money(total)}</strong>
          <small>selected itinerary</small>
        </div>
      </div>

      <div className="twocol">
        <div className="card">
          <h2>Trip preferences</h2>

          <p className="muted">
            These settings drive the itinerary.
          </p>

          <label>
            Destination

            <input
              value={trip.destination}
              onChange={(event) =>
                setTrip({
                  ...trip,
                  destination: event.target.value,
                })
              }
            />
          </label>

          <div className="row">
            <label>
              Days

              <input
                type="number"
                min="1"
                max="30"
                value={trip.days}
                onChange={(event) =>
                  setTrip({
                    ...trip,
                    days: +event.target.value,
                  })
                }
              />
            </label>

            <label>
              Travelers

              <input
                type="number"
                min="1"
                value={trip.travelers}
                onChange={(event) =>
                  setTrip({
                    ...trip,
                    travelers: +event.target.value,
                  })
                }
              />
            </label>

            <label>
              Budget ($)

              <input
                type="number"
                value={trip.budget}
                onChange={(event) =>
                  setTrip({
                    ...trip,
                    budget: +event.target.value,
                  })
                }
              />
            </label>
          </div>

          <label>
            Travel style

            <select
              value={trip.style}
              onChange={(event) =>
                setTrip({
                  ...trip,
                  style: event.target.value,
                })
              }
            >
              <option>Culture & Food</option>
              <option>Adventure & Nature</option>
              <option>Relaxation</option>
              <option>Family Friendly</option>
              <option>Luxury</option>
            </select>
          </label>

          <button
            className="primary"
            onClick={generate}
          >
            <Sparkles size={17} />
            Generate AI Itinerary
          </button>

          <p className="hint">
            Demo AI engine works without an API key and can
            later be replaced with an LLM backend.
          </p>
        </div>

        <div className="card">
          <h2>Trip intelligence</h2>

          {[
            "Preferences captured",
            "Verified recommendations",
            "Editable schedule",
            "Budget calculation",
            "Impossible-plan detection",
            "Collaborative sharing",
          ].map((item, index) => (
            <div className="check" key={item}>
              <CheckCircle2 size={17} />

              {item}

              <b>
                {index === 4 && total > trip.budget
                  ? "WARN"
                  : "PASS"}
              </b>
            </div>
          ))}

          {total > trip.budget && (
            <div className="warning">
              <AlertTriangle size={17} />
              Estimated cost exceeds your budget.
            </div>
          )}
        </div>
      </div>

      <h2 className="section">
        Generated trip
      </h2>

      {!itinerary.length ? (
        <div className="empty">
          <Sparkles />
          <h3>No itinerary yet</h3>
          <p>
            Set preferences and generate your plan.
          </p>
        </div>
      ) : (
        <div className="days">
          {itinerary.slice(0, 3).map((day) => (
            <div className="day card" key={day.id}>
              <small>DAY {day.day}</small>

              <h3>{day.title}</h3>

              {day.items.map((item) => (
                <div
                  className="mini"
                  key={`${day.id}-${item.name}`}
                >
                  {item.name}
                  <b>{money(item.cost)}</b>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
}


/* =========================
   ITINERARY
========================= */

function Itinerary({
  trip,
  itinerary,
  total,
  remove,
  share,
}) {
  return (
    <>
      <div className="pagehead">
        <div>
          <label className="eyebrow">
            EDITABLE ITINERARY
          </label>

          <h1>{trip.destination}</h1>

          <p>
            {trip.days} days • {trip.travelers} travelers •{" "}
            {trip.style}
          </p>
        </div>

        <div className="pagehead-actions">
          <button onClick={share}>
            <Share2 size={15} />
            Share
          </button>

          <strong className="price">
            {money(total)}
          </strong>
        </div>
      </div>

      {!itinerary.length ? (
        <div className="empty">
          Generate an itinerary first.
        </div>
      ) : (
        itinerary.map((day) => (
          <div className="timeline" key={day.id}>
            <div className="num">{day.day}</div>

            <div className="card daybody">
              <h2>{day.title}</h2>

              {day.items.map((item, index) => (
                <div
                  className="item"
                  key={`${day.id}-${index}`}
                >
                  <span>
                    {item.type === "hotel" ? (
                      <Hotel size={17} />
                    ) : (
                      <Compass size={17} />
                    )}
                  </span>

                  <div>
                    <b>{item.name}</b>
                    <small>{item.meta}</small>
                  </div>

                  <strong>
                    {money(item.cost)}
                  </strong>

                  <button
                    className="del"
                    onClick={() =>
                      remove(day.id, index)
                    }
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}

              <button className="add">
                <Plus size={15} />
                Add catalog item
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
}


/* =========================
   CATALOG
========================= */

function Catalog({
  title,
  data,
  search,
  setSearch,
  type,
  onBook,
}) {
  return (
    <>
      <div className="pagehead">
        <div>
          <label className="eyebrow">
            MARKETPLACE
          </label>

          <h1>{title}</h1>

          <p>
            Verified demo inventory with booking inquiry
            handoff.
          </p>
        </div>
      </div>

      <div className="search">
        <Search size={17} />

        <input
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search..."
        />
      </div>

      <div className="catalog">
        {data.map((item) => (
          <div className="product card" key={item.id}>
            <img
              src={item.img}
              alt={item.name}
            />

            <small>
              {item.type || item.tag}
            </small>

            <h3>{item.name}</h3>

            <p>
              <MapPin size={13} />
              {item.city}
            </p>

            <div className="foot">
              <b>
                {money(item.price)}{" "}
                <small>
                  / {type === "Hotel" ? "night" : "person"}
                </small>
              </b>

              <span>
                <Star
                  size={13}
                  fill="currentColor"
                />
                {item.rating || "4.7"}
              </span>
            </div>

            <button
              className="primary"
              onClick={() => onBook(item)}
            >
              Book / Inquire
            </button>
          </div>
        ))}
      </div>
    </>
  );
}


/* =========================
   MAP
========================= */

function MapPage({ trip, itinerary }) {
  return (
    <>
      <div className="pagehead">
        <div>
          <label className="eyebrow">
            MAPS & ROUTES
          </label>

          <h1>Map & travel flow</h1>

          <p>
            Illustrative route for {trip.destination}.
            Verify live travel times before booking.
          </p>
        </div>
      </div>

      <div className="map">
        <div className="route"></div>

        {[
          ["20%", "58%"],
          ["48%", "45%"],
          ["73%", "32%"],
        ].map(([left, top], index) => (
          <MapPin
            key={index}
            className="pin"
            style={{
              left,
              top,
            }}
          />
        ))}

        <div className="mapbox">
          <b>{trip.destination}</b>

          <span>
            {itinerary.length || trip.days} day plan
          </span>

          <a
            href="https://maps.google.com/"
            target="_blank"
            rel="noreferrer"
          >
            Open Google Maps
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      <p className="source">
        Map source: Google Maps. Route is illustrative.
      </p>
    </>
  );
}


/* =========================
   BUDGET
========================= */

function Budget({
  total,
  budget,
  itinerary,
}) {
  const hotelTotal = itinerary.reduce(
    (sum, day) =>
      sum +
      day.items
        .filter((item) => item.type === "hotel")
        .reduce((itemSum, item) => itemSum + item.cost, 0),
    0
  );

  return (
    <>
      <div className="pagehead">
        <div>
          <label className="eyebrow">
            BUDGET
          </label>

          <h1>Trip budget</h1>

          <p>
            Transparent estimate from selected catalog
            items.
          </p>
        </div>
      </div>

      <div className="twocol">
        <div className="card">
          <span className="muted">
            Estimated total
          </span>

          <div className="big">
            {money(total)}
          </div>

          <div className="bar">
            <i
              style={{
                width: `${Math.min(
                  100,
                  budget
                    ? (total / budget) * 100
                    : 0
                )}%`,
              }}
            />
          </div>

          <p>
            Budget: <b>{money(budget)}</b>
          </p>

          <p>
            Remaining:{" "}
            <b
              className={
                budget - total < 0
                  ? "red"
                  : ""
              }
            >
              {money(budget - total)}
            </b>
          </p>
        </div>

        <div className="card">
          <h2>Breakdown</h2>

          <p>
            🏨 Stays
            <b className="right">
              {money(hotelTotal)}
            </b>
          </p>

          <p>
            🧭 Activities
            <b className="right">
              {money(total - hotelTotal)}
            </b>
          </p>

          <p>
            ✈️ Flights / transport
            <b className="right">$0</b>
          </p>

          <small className="muted">
            Demo catalog prices exclude taxes, flights
            and live availability.
          </small>
        </div>
      </div>
    </>
  );
}


/* =========================
   INQUIRIES
========================= */

function Inquiries({ data }) {
  return (
    <>
      <div className="pagehead">
        <div>
          <label className="eyebrow">
            BOOKING FLOW
          </label>

          <h1>Booking inquiries</h1>

          <p>
            Supplier handoff without pretending demo
            inventory is live-bookable.
          </p>
        </div>
      </div>

      {!data.length ? (
        <div className="empty">
          <Send />
          <h3>No inquiries yet</h3>
        </div>
      ) : (
        <div className="card">
          {data.map((item, index) => (
            <div
              className="inquiry"
              key={index}
            >
              <b>{item.name}</b>
              <span>{item.type}</span>
              <span>{item.date}</span>
              <strong>{item.status}</strong>
            </div>
          ))}
        </div>
      )}
    </>
  );
}


/* =========================
   SOURCES
========================= */

function Sources() {
  return (
    <>
      <div className="pagehead">
        <div>
          <label className="eyebrow">
            TRUST & CITATIONS
          </label>

          <h1>Sources</h1>

          <p>
            Recommendations identify their source.
          </p>
        </div>
      </div>

      <div className="twocol">
        <a
          className="card sourcecard"
          href="https://tourism.gov.pk/"
          target="_blank"
          rel="noreferrer"
        >
          <CheckCircle2 />

          <div>
            <h3>
              Pakistan Tourism Development
              Corporation
            </h3>

            <p>
              Destination tourism context.
            </p>
          </div>

          <ExternalLink />
        </a>

        <a
          className="card sourcecard"
          href="https://maps.google.com/"
          target="_blank"
          rel="noreferrer"
        >
          <MapPin />

          <div>
            <h3>Google Maps</h3>

            <p>
              Map and route context.
            </p>
          </div>

          <ExternalLink />
        </a>

        <div className="card">
          <CheckCircle2 />

          <h3>
            TripPilot Verified Catalog
          </h3>

          <p>
            Demo marketplace records bundled
            with this project.
          </p>

          <small>
            Each recommendation can display its
            catalog/source citation.
          </small>
        </div>
      </div>
    </>
  );
}


/* =========================
   MODAL
========================= */

function Modal({
  item,
  submit,
  close,
}) {
  return (
    <div className="overlay">
      <div className="modal">
        <button
          className="close"
          onClick={close}
          aria-label="Close"
        >
          <X />
        </button>

        <label className="eyebrow">
          BOOKING INQUIRY
        </label>

        <h2>{item.name}</h2>

        <p>
          Submit a request. In this demo the inquiry
          is stored locally.
        </p>

        <input placeholder="Traveler name" />

        <input placeholder="Email" />

        <textarea
          placeholder="Dates and notes"
        />

        <button
          className="primary"
          onClick={() => submit(item)}
        >
          Submit inquiry
        </button>
      </div>
    </div>
  );
}


if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .catch(() => {});
  });
}

createRoot(
  document.getElementById("root")
).render(<App />);