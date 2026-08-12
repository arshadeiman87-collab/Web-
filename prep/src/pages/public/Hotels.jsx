import React, {useState} from "react";
import { Link } from "react-router-dom";
import { MapPin, Wifi, Waves, Leaf, Grid2X2, List, ChevronLeft, ChevronRight } from "lucide-react";
import { hotels } from "../../data";

export default function Hotels() {
  const [price, setPrice] = useState(850);
  const [rating, setRating] = useState(5);
  const filtered = hotels.filter(h => h.price <= price && h.rating >= rating);

  return <div className="hotels-page section">
    <div className="filters">
      <h2>Refine Search</h2>
      <label>Location</label><div className="input-like"><MapPin/>Where to?</div>
      <label>Category</label><select><option>Luxury Resorts</option><option>Boutique</option><option>Business</option></select>
      <label>Price Range / Night</label><input type="range" min="100" max="1000" value={price} onChange={e=>setPrice(+e.target.value)}/><div className="range-label"><span>$100</span><span>$2000+</span></div>
      <label>Star Rating</label><div className="rating-buttons">{[3,4,5].map(x=><button className={rating===x?"selected":""} onClick={()=>setRating(x)} key={x}>{x} ☆</button>)}</div>
      <button className="dark-btn">Apply Filters</button>
    </div>
    <div className="hotel-results">
      <div className="section-heading"><div><h2>Curated Selections</h2><p>Discover {filtered.length ? 124 : 0} luxury stays matching your criteria.</p></div><div className="view-icons"><Grid2X2/><List/></div></div>
      <div className="hotel-grid">{filtered.map(h=><Link to={`/hotels/${h.id}`} className="hotel-card" key={h.id}>
        <div className="hotel-image"><img src={h.image}/><span className="rating">★ {h.rating}</span></div>
        <div className="hotel-card-body"><div className="hotel-title"><h3>{h.name}</h3><strong>${h.price}<small>/ night</small></strong></div><p><MapPin size={17}/> {h.location}</p><div className="amenities"><Wifi/><Waves/><Leaf/></div><button className="outline-btn">View Details</button></div>
      </Link>)}</div>
      <div className="pagination"><button><ChevronLeft/></button><b>1</b><button>2</button><button>3</button><span>...</span><button>8</button><button><ChevronRight/></button></div>
    </div>
  </div>
}