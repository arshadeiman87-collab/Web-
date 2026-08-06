import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Products() {
  const { addToCart } = useContext(CartContext);

  const products = [
    { id: 1, name: "💻 Laptop" },
    { id: 2, name: "📱 Phone" },
    { id: 3, name: "🎧 Headphones" },
  ];

  return (
    <div className="card">
      <h2>🛍 Products</h2>

      {products.map((item) => (
        <div className="product" key={item.id}>
          <span>{item.name}</span>

          <button
            className="add-btn"
            onClick={() => addToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;