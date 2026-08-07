import { useMemo, useState, useCallback } from "react";
import Search from "./components/Search";
import ItemList from "./components/ItemList";

function App() {
  const [search, setSearch] = useState("");

  const items = useMemo(() => {
    return Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  const handleSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  return (
    <div className="container">
      <h1>React Performance Demo</h1>

      <Search onSearch={handleSearch} />

      <h3>Total Items: {filteredItems.length}</h3>

      <ItemList items={filteredItems} />
    </div>
  );
}

export default App;