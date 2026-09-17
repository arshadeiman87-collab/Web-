import { products } from "../../../lib/catalog";
import Link from "next/link";

export default async function ProductPage({ params }) {
  const { id } = await params;
  const p = products.find(x => x.id === id) || products[0];
  return <div className="page"><section className="detail"><div className="detail-image">{p.icon}</div><div><span className="eyebrow">{p.category}</span><h1>{p.name}</h1><p className="price">${p.price}</p><p>{p.description}</p><div className="specs">{Object.entries(p.specs).map(([k,v])=><div key={k}><span>{k}</span><b>{v}</b></div>)}</div><div className="hero-actions"><button className="button primary">Add to cart</button><Link className="button secondary" href="/assistant">Compare with AI</Link></div></div></section></div>;
}
