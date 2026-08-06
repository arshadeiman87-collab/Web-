import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function OrderList() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchOrders = async () => {

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("id", { ascending: false });


      if (error) {

        console.log("Supabase Error:", error.message);

      } else {

        setOrders(data);

      }

      setLoading(false);

    };


    fetchOrders();


  }, []);



  if (loading) {
    return <h2>Loading Orders...</h2>;
  }



  return (

    <div>

      <h2>📦 Live Order Dashboard</h2>


      {
        orders.length === 0 ? (

          <h3>No Orders Found</h3>

        ) : (

          orders.map((order) => (

            <div 
              key={order.id}
              style={{
                border:"1px solid #ccc",
                padding:"15px",
                margin:"10px",
                borderRadius:"10px"
              }}
            >

              <h3>
                👤 {order.customer}
              </h3>

              <p>
                🛒 Product: {order.product}
              </p>

              <p>
                📌 Status: {order.status}
              </p>

            </div>

          ))

        )
      }


    </div>

  );

}

export default OrderList;