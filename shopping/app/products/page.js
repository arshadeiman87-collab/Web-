import ProductCard from "../../components/ProductCard";
import { products } from "../../lib/catalog";

export default function Products() {
  return <div className="page"><section className="section"><div className="section-head"><div><span className="eyebrow">CATALOG</span><h1>All products</h1><p>Search, compare and discover products.</p></div></div><div className="searchbar"><input placeholder="Search products, categories or features..." /><button className="button primary">Search</button></div><div className="product-grid">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div></section></div>;
}
