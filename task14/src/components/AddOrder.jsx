import {useState} from "react";
import {supabase} from "../supabase";


function AddOrder(){

const [customer,setCustomer]=useState("");
const [product,setProduct]=useState("");


const addOrder=async()=>{

await supabase
.from("orders")
.insert([
{
customer,
product
}
]);

setCustomer("");
setProduct("");

}


return(
<div>

<input
placeholder="Customer Name"
value={customer}
onChange={(e)=>setCustomer(e.target.value)}
/>


<input
placeholder="Product"
value={product}
onChange={(e)=>setProduct(e.target.value)}
/>


<button onClick={addOrder}>
Add Order
</button>


</div>
)

}

export default AddOrder;