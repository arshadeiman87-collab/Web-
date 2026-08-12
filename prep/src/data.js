export const hotels = [
  { id: 1, name: "The Azure Retreat", location: "Santorini, Greece", category: "Boutique Resort", price: 450, rating: 4.9, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=85" },
  { id: 2, name: "Metropolis Suites", location: "New York City, USA", category: "Urban Luxury", price: 320, rating: 4.8, image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=85" },
  { id: 3, name: "Alpine Pinnacle", location: "Swiss Alps, Switzerland", category: "Mountain Resort", price: 850, rating: 4.9, image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1000&q=85" },
  { id: 4, name: "Jungle Haven", location: "Bali, Indonesia", category: "Eco Resort", price: 200, rating: 4.7, image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1000&q=85" }
];

export const bookings = [
  { id: 1, guest: "Eleanor James", email: "el.james@example.com", room: "Deluxe Suite - 402", dates: "Oct 12 - Oct 15", amount: "$1,250", status: "Confirmed" },
  { id: 2, guest: "Marcus Chen", email: "m.chen@example.com", room: "Standard King - 215", dates: "Oct 18 - Oct 20", amount: "$480", status: "Pending" },
  { id: 3, guest: "Sophia Williams", email: "s.williams@example.com", room: "Premium Suite - 301", dates: "Oct 21 - Oct 24", amount: "$980", status: "Confirmed" }
];

export const applications = [
  { id: 1, hotel: "The Azure Crest", owner: "Eleanor Vance", location: "Santorini, GR", category: "Boutique Resort", submitted: "Oct 12, 2023", image: hotels[0].image },
  { id: 2, hotel: "Metropolitan Suites", owner: "Marcus Thorne", location: "New York, US", category: "Urban Luxury", submitted: "Oct 14, 2023", image: hotels[1].image }
];

export const approvedHotels = [
  { id: 1, hotel: "The Azure Retreat", owner: "Eleanor Vance", location: "Santorini, GR", status: "Active" },
  { id: 2, hotel: "Grand Horizon", owner: "Marcus Sterling", location: "New York, USA", status: "Active" },
  { id: 3, hotel: "Alpine Ridge Spa", owner: "Sofia Russo", location: "Zermatt, CH", status: "Active" }
];