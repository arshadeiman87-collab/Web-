import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Mic, Search, ShoppingBag, LayoutDashboard, UtensilsCrossed, ClipboardList,
  Settings, Menu, X, Plus, Minus, Trash2, CheckCircle2, Clock3, ChefHat,
  CreditCard, Wifi, WifiOff, Globe2, AlertTriangle, PackageCheck, Volume2,
  CircleHelp, Sparkles, Bell, ChevronRight
} from "lucide-react";
import "./styles.css";

const menu = [
  {id:1,name:"Classic Chicken Burger",category:"Burgers",price:8.99,desc:"Grilled chicken, lettuce, tomato and house sauce.",tags:["halal","popular"],allergens:["gluten","egg"],mods:["Extra cheese","Spicy sauce","No onions"]},
  {id:2,name:"Crispy Zinger",category:"Burgers",price:9.49,desc:"Crispy chicken fillet, slaw and signature mayo.",tags:["halal","spicy"],allergens:["gluten","egg","milk"],mods:["Extra cheese","No mayo","Extra spicy"]},
  {id:3,name:"Margherita Pizza",category:"Pizza",price:11.5,desc:"Tomato, mozzarella, basil and olive oil.",tags:["vegetarian"],allergens:["gluten","milk"],mods:["Extra cheese","Thin crust","No basil"]},
  {id:4,name:"Chicken Fajita Pizza",category:"Pizza",price:13.5,desc:"Fajita chicken, peppers, onions and mozzarella.",tags:["halal","popular"],allergens:["gluten","milk"],mods:["Extra cheese","No onions","Jalapeños"]},
  {id:5,name:"Creamy Alfredo Pasta",category:"Pasta",price:12.75,desc:"Penne with creamy garlic parmesan sauce.",tags:["vegetarian"],allergens:["gluten","milk"],mods:["Grilled chicken","Extra parmesan","No garlic"]},
  {id:6,name:"Grilled Chicken Bowl",category:"Mains",price:12.25,desc:"Grilled chicken, rice, greens and herb dressing.",tags:["halal","healthy"],allergens:["milk"],mods:["No dairy dressing","Extra rice","Extra greens"]},
  {id:7,name:"Loaded Fries",category:"Sides",price:5.25,desc:"Crispy fries, cheese sauce and herbs.",tags:["vegetarian"],allergens:["milk"],mods:["Jalapeños","No cheese sauce","Extra sauce"]},
  {id:8,name:"Fresh Lemon Mint",category:"Drinks",price:3.5,desc:"Fresh lemon, mint and chilled water.",tags:["vegan"],allergens:[],mods:["Less sugar","No sugar","Extra mint"]},
  {id:9,name:"Chocolate Brownie",category:"Desserts",price:5.0,desc:"Warm chocolate brownie with vanilla cream.",tags:["popular"],allergens:["gluten","milk","egg"],mods:["No cream","Extra chocolate"]},
  {id:10,name:"Mango Lassi",category:"Drinks",price:4.25,desc:"Creamy mango yogurt drink.",tags:["vegetarian"],allergens:["milk"],mods:["Less sugar","Extra chilled"]}
];

const initialOrders = [
  {id:"#1048",table:"T12",items:"2 × Classic Chicken Burger, 1 × Fries",total:23.23,status:"Preparing",time:"3 min ago"},
  {id:"#1047",table:"T04",items:"1 × Margherita Pizza, 1 × Lemon Mint",total:15.0,status:"Ready",time:"7 min ago"},
  {id:"#1046",table:"T08",items:"2 × Grilled Chicken Bowl",total:24.5,status:"Completed",time:"12 min ago"}
];

function App(){
  const [page,setPage]=useState("menu");
  const [cart,setCart]=useState([]);
  const [category,setCategory]=useState("All");
  const [query,setQuery]=useState("");
  const [lang,setLang]=useState("English");
  const [voice,setVoice]=useState(false);
  const [offline,setOffline]=useState(!navigator.onLine);
  const [toast,setToast]=useState("");
  const [orders,setOrders]=useState(initialOrders);
  const [admin,setAdmin]=useState(false);
  const [mobileNav,setMobileNav]=useState(false);

  useEffect(()=>{
    const on=()=>setOffline(false), off=()=>setOffline(true);
    window.addEventListener("online",on); window.addEventListener("offline",off);
    return ()=>{window.removeEventListener("online",on);window.removeEventListener("offline",off)};
  },[]);

  const filtered=useMemo(()=>menu.filter(x=>
    (category==="All"||x.category===category) &&
    (x.name.toLowerCase().includes(query.toLowerCase())||x.desc.toLowerCase().includes(query.toLowerCase()))
  ),[category,query]);

  const count=cart.reduce((s,x)=>s+x.qty,0);
  const subtotal=cart.reduce((s,x)=>s+x.price*x.qty,0);
  const tax=subtotal*.05, total=subtotal+tax;

  function notify(t){setToast(t);setTimeout(()=>setToast(""),2600)}
  function add(item){
    setCart(c=>{
      const found=c.find(x=>x.id===item.id);
      return found?c.map(x=>x.id===item.id?{...x,qty:x.qty+1}:x):[...c,{...item,qty:1,mod:""}]
    });
    notify(`${item.name} added to cart`);
  }
  function change(id,delta){
    setCart(c=>c.map(x=>x.id===id?{...x,qty:x.qty+delta}:x).filter(x=>x.qty>0))
  }
  function checkout(){
    if(!cart.length){notify("Your cart is empty");return}
    const newId="#"+(1049+orders.length);
    setOrders(o=>[{id:newId,table:"T12",items:cart.map(x=>`${x.qty} × ${x.name}`).join(", "),total:total,status:"Received",time:"just now"},...o]);
    setCart([]);setPage("orders");notify("Order placed successfully");
  }
  function startVoice(){
    setVoice(true);
    const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(SpeechRecognition){
      const r=new SpeechRecognition();
      r.lang=lang==="English"?"en-US":lang==="Urdu"?"ur-PK":"ar-SA";
      r.onresult=e=>{
        const text=e.results[0][0].transcript;
        setQuery(text);
        const match=menu.find(x=>text.toLowerCase().includes(x.name.toLowerCase().split(" ")[0].toLowerCase()));
        if(match)add(match); else notify("I heard you. Please choose the matching menu item.");
        setVoice(false);
      };
      r.onerror=()=>{setVoice(false);notify("Voice input could not be started. You can type your order.");};
      r.onend=()=>setVoice(false); r.start();
    } else setTimeout(()=>{setVoice(false);notify("Voice input is unavailable in this browser. Text ordering is ready.");},1200);
  }

  const nav=[
    ["menu","Menu",UtensilsCrossed],
    ["orders","Orders",ClipboardList],
    ["kitchen","Kitchen",ChefHat],
    ["admin","Admin",Settings]
  ];

  return <div className="app">
    <header className="topbar">
      <div className="brand" onClick={()=>setPage("menu")}><div className="logo"><UtensilsCrossed size={21}/></div><div><b>TableTalk</b><span>Restaurant</span></div></div>
      <nav className="topnav">
        {nav.map(([id,label,Icon])=><button key={id} className={page===id?"active":""} onClick={()=>setPage(id)}><Icon size={17}/>{label}</button>)}
      </nav>
      <div className="top-actions">
        <div className={"connection "+(offline?"off":"")}><span className="dot"></span>{offline?<WifiOff size={15}/>:<Wifi size={15}/>} {offline?"Offline":"Online"}</div>
        <button className="lang" onClick={()=>setLang(l=>l==="English"?"Urdu":l==="Urdu"?"Arabic":"English")}><Globe2 size={16}/>{lang}</button>
        <button className="cart-btn" onClick={()=>setPage("cart")}><ShoppingBag size={18}/><span>Cart</span>{count>0&&<em>{count}</em>}</button>
        <button className="mobile-menu" onClick={()=>setMobileNav(!mobileNav)}>{mobileNav?<X/>:<Menu/>}</button>
      </div>
    </header>

    {mobileNav&&<div className="mobile-nav">{nav.map(([id,label,Icon])=><button key={id} onClick={()=>{setPage(id);setMobileNav(false)}}><Icon size={18}/>{label}</button>)}</div>}

    <main>
      {page==="menu"&&<MenuPage filtered={filtered} category={category} setCategory={setCategory} query={query} setQuery={setQuery} add={add} startVoice={startVoice} voice={voice} lang={lang}/>}
      {page==="cart"&&<Cart cart={cart} subtotal={subtotal} tax={tax} total={total} change={change} checkout={checkout} setPage={setPage}/>}
      {page==="orders"&&<Orders orders={orders}/>}
      {page==="kitchen"&&<Kitchen orders={orders} setOrders={setOrders}/>}
      {page==="admin"&&<Admin menu={menu} notify={notify}/>}
    </main>

    <div className="assistant-bar">
      <div><Sparkles size={17}/><span><b>Voice ordering</b> — Say what you want, in English, Urdu or Arabic.</span></div>
      <button onClick={startVoice}><Mic size={17}/>{voice?"Listening…":"Speak your order"}</button>
    </div>
    {toast&&<div className="toast"><CheckCircle2 size={18}/>{toast}</div>}
  </div>
}

function MenuPage({filtered,category,setCategory,query,setQuery,add,startVoice,voice,lang}){
  const cats=["All","Burgers","Pizza","Pasta","Mains","Sides","Drinks","Desserts"];
  return <section className="page">
    <div className="hero">
      <div><div className="eyebrow">TABLE T12 · ORDER AT YOUR TABLE</div><h1>What are you craving?</h1><p>Browse the menu or use your voice to order. We'll ask if anything is unclear.</p>
        <div className="voice-box"><button onClick={startVoice} className={"mic "+(voice?"listening":"")}><Mic size={25}/></button><div><b>{voice?"Listening for your order…":"Try voice ordering"}</b><span>{voice?"Tell us your dish and preferences.":"For example: “two zinger burgers, no mayo”"}</span></div><Volume2 size={19}/></div>
      </div>
      <div className="hero-card"><div className="hero-icon"><UtensilsCrossed/></div><b>Freshly prepared</b><span>Kitchen status updates appear in Orders.</span><div className="mini-status"><span></span> Kitchen accepting orders</div></div>
    </div>
    <div className="toolbar"><div className="search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search dishes, ingredients…"/></div><div className="categories">{cats.map(c=><button key={c} className={category===c?"selected":""} onClick={()=>setCategory(c)}>{c}</button>)}</div></div>
    <div className="allergy-note"><AlertTriangle size={17}/><div><b>Allergy notice</b><span>Menu items show common allergens. If you have a severe allergy, please confirm with staff before ordering.</span></div></div>
    <div className="section-head"><div><h2>Our menu</h2><p>{filtered.length} items available</p></div><span className="ai-chip"><Sparkles size={15}/> Smart matching enabled</span></div>
    <div className="grid">{filtered.map(item=><FoodCard key={item.id} item={item} add={add}/>)}</div>
  </section>
}

function FoodCard({item,add}){
  return <article className="food-card">
    <div className="food-image"><div className="food-symbol">{item.category==="Drinks"?"🥤":item.category==="Desserts"?"🍫":item.category==="Pizza"?"🍕":item.category==="Burgers"?"🍔":"🍽️"}</div><span className="price">${item.price.toFixed(2)}</span></div>
    <div className="food-body"><div className="food-title"><h3>{item.name}</h3>{item.tags.includes("popular")&&<span className="popular">Popular</span>}</div><p>{item.desc}</p>
    <div className="tags">{item.tags.map(t=><span key={t}>{t}</span>)}{item.allergens.length>0&&<span className="allergen">Contains: {item.allergens.join(", ")}</span>}</div>
    <button className="add" onClick={()=>add(item)}><Plus size={17}/> Add to order</button></div>
  </article>
}

function Cart({cart,subtotal,tax,total,change,checkout,setPage}){
 return <section className="page narrow"><div className="page-title"><div><div className="eyebrow">TABLE T12</div><h1>Your order</h1><p>Review items, modifiers and allergy notes before paying.</p></div></div>
 <div className="cart-layout"><div className="cart-list">{!cart.length?<div className="empty"><ShoppingBag size={34}/><h3>Your cart is empty</h3><p>Add something delicious from the menu.</p><button onClick={()=>setPage("menu")}>Browse menu</button></div>:cart.map(x=><div className="cart-row" key={x.id}><div className="cart-thumb">{x.category==="Pizza"?"🍕":x.category==="Drinks"?"🥤":x.category==="Desserts"?"🍫":"🍔"}</div><div className="cart-info"><b>{x.name}</b><span>${x.price.toFixed(2)} · Allergens: {x.allergens.length?x.allergens.join(", "):"none listed"}</span></div><div className="qty"><button onClick={()=>change(x.id,-1)}><Minus size={15}/></button><b>{x.qty}</b><button onClick={()=>change(x.id,1)}><Plus size={15}/></button></div><strong>${(x.price*x.qty).toFixed(2)}</strong></div>)}</div>
 <aside className="summary"><h3>Payment summary</h3><div><span>Subtotal</span><b>${subtotal.toFixed(2)}</b></div><div><span>Tax (5%)</span><b>${tax.toFixed(2)}</b></div><hr/><div className="total"><span>Total</span><b>${total.toFixed(2)}</b></div><div className="payment"><CreditCard size={17}/><span>Secure card payment</span><CheckCircle2 size={16}/></div><button className="checkout" onClick={checkout}>Place order · ${total.toFixed(2)}</button><small>Payment processing is securely handled by the connected payment provider.</small></aside></div></section>
}

function Orders({orders}){return <section className="page"><div className="page-title"><div><div className="eyebrow">ORDER TRACKING</div><h1>Your orders</h1><p>Live kitchen progress for your table.</p></div><button className="outline"><Bell size={17}/> Notify me when ready</button></div><div className="orders">{orders.map(o=><div className="order-card" key={o.id}><div className="order-main"><div className="order-id"><b>{o.id}</b><span>{o.time}</span></div><h3>{o.items}</h3><p>Table {o.table} · ${o.total.toFixed(2)}</p></div><div className={"status "+o.status.toLowerCase()}>{o.status==="Preparing"?<ChefHat size={17}/>:o.status==="Ready"?<PackageCheck size={17}/>:<CheckCircle2 size={17}/>} {o.status}</div><ChevronRight/></div>)}</div></section>}

function Kitchen({orders,setOrders}){const advance=id=>setOrders(os=>os.map(o=>o.id===id?{...o,status:o.status==="Received"?"Preparing":o.status==="Preparing"?"Ready":"Completed"}:o)); return <section className="page"><div className="page-title"><div><div className="eyebrow">STAFF VIEW</div><h1>Kitchen display</h1><p>Manage incoming orders and update guests in real time.</p></div><div className="live"><span></span>Live kitchen</div></div><div className="kitchen-grid">{["Received","Preparing","Ready"].map(status=><div className="k-column" key={status}><h3>{status} <span>{orders.filter(o=>o.status===status).length}</span></h3>{orders.filter(o=>o.status===status).map(o=><div className="k-card" key={o.id}><div><b>{o.id}</b><span>{o.table}</span></div><p>{o.items}</p><small>{o.time}</small><button onClick={()=>advance(o.id)}>{status==="Received"?"Start preparing":status==="Preparing"?"Mark ready":"Complete order"}</button></div>)}</div>)}</div></section>}

function Admin({menu,notify}){const [items,setItems]=useState(menu); const [enabled,setEnabled]=useState(true); return <section className="page"><div className="page-title"><div><div className="eyebrow">MANAGEMENT</div><h1>Menu management</h1><p>Control availability, modifiers, allergens and pricing.</p></div><button className="primary" onClick={()=>notify("New menu item form is ready")}> <Plus size={17}/> Add menu item</button></div><div className="admin-grid"><div className="admin-panel"><div className="panel-head"><div><h3>Menu items</h3><p>{items.length} published items</p></div><div className="toggle-row"><span>Online ordering</span><button className={"toggle "+(enabled?"on":"")} onClick={()=>setEnabled(!enabled)}><i></i></button></div></div>{items.map(x=><div className="admin-row" key={x.id}><div className="admin-food">{x.category==="Pizza"?"🍕":"🍔"}</div><div><b>{x.name}</b><span>{x.category} · ${x.price.toFixed(2)}</span></div><div className="admin-tags">{x.allergens.map(a=><span key={a}>{a}</span>)}</div><button className="icon-btn" onClick={()=>notify(`Editing ${x.name}`)}><Settings size={17}/></button></div>)}</div><div className="admin-side"><div className="info-card"><Sparkles size={20}/><h3>Structured AI ordering</h3><p>Voice requests are converted into menu items, quantities, modifiers and allergy flags before checkout.</p><pre>{`{
  "items": [{
    "menuItem": "Zinger",
    "quantity": 2,
    "modifiers": ["no mayo"],
    "allergies": []
  ],
  "needsClarification": false
}`}</pre></div><div className="info-card"><AccessibilityIcon/><h3>Accessibility</h3><p>Large touch targets, keyboard navigation, high-contrast status labels and screen-reader-friendly controls.</p></div></div></div></section>}

function AccessibilityIcon(){return <CircleHelp size={20}/>}

createRoot(document.getElementById("root")).render(<App/>);