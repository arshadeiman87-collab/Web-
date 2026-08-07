import { memo } from "react";

const Search = memo(({ onSearch }) => {
  console.log("Search Render");

  return (
    <input
      type="text"
      placeholder="Search Item..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
});

export default Search;