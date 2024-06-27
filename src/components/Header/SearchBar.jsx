import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  useEffect(() => {
    console.log(search);
  }, [search]);
  return (
    <div className="search-div flex">
      <BiSearch className="icon" />
      <input
        placeholder="Search in Drive"
        type="search"
        name="search"
        className="search"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
