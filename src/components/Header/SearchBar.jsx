import React from "react";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    console.log(search);
  }, [search]);
  const handleSearch = () => {
    navigate(`/my-drive?search=${search}`);
    console.log(search);
    setSearch("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };
  return (
    <div className="search-div flex">
      <BiSearch className="icon" />
      <input
        placeholder="Search in Drive"
        type="search"
        name="search"
        value={search}
        className="search"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
