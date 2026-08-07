import { memo } from "react";

const ItemList = memo(({ items }) => {
  console.log("ItemList Render");

  return (
    <div className="list">
      {items.map((item) => (
        <div className="card" key={item}>
          {item}
        </div>
      ))}
    </div>
  );
});

export default ItemList;