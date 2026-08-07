import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      let query = supabase
        .from("orders")
        .select(`
          id,
          product,
          amount,
          customers (
            name,
            email
          )
        `);

      if (search) {
        query = query.ilike("product", `%${search}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error(error);
      } else {
        setOrders(data);
      }
    }

    fetchOrders();
  }, [search]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Orders</h2>

      <input
        type="text"
        placeholder="Search Product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
        }}
      />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Email</th>
            <th>Product</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.customers?.name}</td>
              <td>{order.customers?.email}</td>
              <td>{order.product}</td>
              <td>{order.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}