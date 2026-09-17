import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { products } from "../lib/catalog";

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <div>
          <span className="eyebrow">INTELLIGENT COMMERCE</span>
          <h1>Find what fits your life.</h1>
          <p>Explore curated products or ask our shopping assistant to compare, explain policies, and guide your next purchase.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/products">Explore catalog</Link>
            <Link className="button secondary" href="/assistant">Ask the assistant</Link>
          </div>
        </div>
        <div className="hero-card">
          <div className="orb">✦</div>
          <strong>Smart recommendations</strong>
          <span>Catalog-grounded answers with transparent sources.</span>
        </div>
      </section>
      <section className="section">
        <div className="section-head"><div><span className="eyebrow">CURATED PICKS</span><h2>Popular right now</h2></div><Link href="/products">View all →</Link></div>
        <div className="product-grid">{products.slice(0,4).map(p=><ProductCard key={p.id} product={p}/>)}</div>
      </section>
      <section className="trust-grid">
        <div><b>Catalog-aware AI</b><span>Recommendations use product attributes and approved catalog data.</span></div>
        <div><b>Policy citations</b><span>Answers can show the policy source used to explain a rule.</span></div>
        <div><b>Secure by design</b><span>Input boundaries, rate limits and uncertainty handoff are built in.</span></div>
      </section>
    </div>
  );
}
