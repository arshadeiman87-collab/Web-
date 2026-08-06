import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="card">
      <h2>🛒 Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="empty">Cart is Empty</p>
      ) : (
        cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <span>{item.name}</span>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;