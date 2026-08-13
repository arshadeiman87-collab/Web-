import React from "react";
import { Link } from "react-router-dom";
import { MapPin, CalendarDays, UserRound, ArrowRight, Star } from "lucide-react";
import { hotels } from "../../data";

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-overlay"/>
        <div className="hero-content">
          <h1>Find Your Perfect Stay</h1>
          <div className="search-box">
            <div><MapPin/><span>Where are you going?</span></div>
            <div><CalendarDays/><span>Check-in - Check-out</span></div>
            <div><UserRound/><span>2 Guests, 1 Room</span></div>
            <button className="gold-btn">SEARCH</button>
          </div>
        </div>
      </section>

      <section className="section curated">
        <div className="section-heading"><div><h2>Curated Escapes</h2><p>Handpicked luxury for the discerning traveler.</p></div><Link to="/hotels">VIEW ALL <ArrowRight size={20}/></Link></div>
        <div className="escape-grid">
          <Link to="/hotels/1" className="escape-card large"><img src={hotels[0].image}/><div><h3>The Azure Retreat</h3><p>Santorini, Greece</p><strong>$450 <small>/night</small></strong></div></Link>
          <div className="escape-stack">
            <Link to="/hotels/4" className="escape-card"><img src={hotels[3].image}/><div><h3>Jungle Haven</h3><p>Bali, Indonesia</p><strong>$200 <small>/night</small></strong></div></Link>
            <Link to="/hotels/2" className="escape-card"><img src={hotels[1].image}/><div><h3>Metropolis Suites</h3><p>New York City</p><strong>$320 <small>/night</small></strong></div></Link>
          </div>
        </div>
      </section>
    </div>
  );
}