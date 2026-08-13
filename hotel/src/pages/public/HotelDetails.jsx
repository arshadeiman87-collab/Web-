import React from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Star, Wifi, Waves, Utensils, Check, ArrowLeft } from "lucide-react";
import { hotels } from "../../data";

export default function HotelDetails() {
  const {id} = useParams();
  const hotel = hotels.find(x => x.id === Number(id)) || hotels[0];
  return <div className="details-page section">
    <Link to="/hotels" className="back-link"><ArrowLeft size={18}/> Back to hotels</Link>
    <div className="details-hero"><img src={hotel.image}/></div>
    <div className="details-grid">
      <div><span className="eyebrow">{hotel.category}</span><h1>{hotel.name}</h1><p className="location"><MapPin/> {hotel.location}</p><p className="details-copy">A refined luxury property designed for guests who value beautiful spaces, attentive service and memorable experiences.</p>
      <div className="amenities big"><span><Wifi/> High-speed WiFi</span><span><Waves/> Pool</span><span><Utensils/> Restaurant</span></div><h2>What this place offers</h2><ul className="check-list"><li><Check/> Premium rooms and suites</li><li><Check/> 24/7 guest support</li><li><Check/> Complimentary breakfast</li><li><Check/> Flexible reservation policy</li></ul></div>
      <aside className="booking-card"><div><strong>${hotel.price}</strong> / night</div><div className="rating-large"><Star fill="currentColor"/> {hotel.rating}</div><input placeholder="Check-in - Check-out"/><input placeholder="2 Guests, 1 Room"/><button className="gold-btn">Reserve Now</button></aside>
    </div>
  </div>
}