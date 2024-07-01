// components ---------------------------------------------------------------------------------------------------------------------------------
import "./Header.css";
import SearchBar from "./SearchBar";
import UserIcon from "./UserIcon";
import MoreIcon from "./MoreIcon";
import { useState } from "react";
import ItemsBox from "./ItemsBox";
import { useNavigate } from "react-router";

export default function Header() {
  const [showApps, SetShowApps] = useState(false);
  const nav = useNavigate();
  const handleLogoClick = () => {
    nav("/");
  };
  return (
    <div className="header">
      <div className="logo" onClick={handleLogoClick}>
        <img className="logo-img" alt="googel drive icon" src={"/logo.png"} />
        Drive
      </div>
      <SearchBar />
      <div className="rounded-items">
        <MoreIcon setShow={SetShowApps} />
        <UserIcon />
      </div>
      {showApps && <ItemsBox setShowMenu={SetShowApps} />}
    </div>
  );
}
