import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function PublicLayout() {
  return (
    <>
      <header className="public-nav">
        <Link to="/" className="brand">StayEase</Link>
        <nav>
          <Link to="/hotels">HOTELS</Link>
          <a href="#reviews">REVIEWS</a>
          <a href="#about">ABOUT US</a>
        </nav>
        <div className="nav-actions">
          <Link to="/login" className="login-link">LOGIN</Link>
          <Link to="/register-hotel" className="gold-btn small">LIST YOUR HOTEL</Link>
        </div>
      </header>
      <Outlet />
      <footer className="public-footer">
        <div className="footer-brand">STAYEASE</div>
        <div className="footer-links">
          <a href="#privacy">PRIVACY POLICY</a>
          <a href="#terms">TERMS OF SERVICE</a>
          <a href="#support">CONTACT SUPPORT</a>
          <Link to="/login">PARTNER HUB</Link>
        </div>
        <p>© 2024 StayEase Luxury Hotels. All rights reserved.</p>
      </footer>
    </>
  );
}