// components ---------------------------------------------------------------------------------------------------------------------------------
import "./Header.css";
import SearchBar from "./SearchBar";
import UserIcon from "./UserIcon";
import MoreIcon from "./MoreIcon";
import { useState } from "react";
import ItemsBox from "./ItemsBox";

export default function Header() {
  const [showApps, SetShowApps] = useState(false);
  return (
    <div className="header">
      <div className="logo">
        <img className="logo-img" alt="googel drive icon" src={"logo.png"} />
        Drive
      </div>
      <SearchBar />
      <div className="rounded-items">
        <MoreIcon setShow={SetShowApps} />
        <UserIcon />
      </div>
      {showApps && <ItemsBox />}
    </div>
  );
}
