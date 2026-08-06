import Products from "./components/Products";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>🛒 Shopping Cart</h1>

      <Products />
      <Cart />
    </div>
  );
}

export default App;