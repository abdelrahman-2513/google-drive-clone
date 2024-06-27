import "./NavBar.css";
import { Link } from "react-router-dom";
import AddNewBtn from "../AddNew/AddNew";
import { HiHome } from "react-icons/hi";
import { BsStar } from "react-icons/bs";
import { BiCloud, BiTrash } from "react-icons/bi";
import { useState } from "react";
import { CgCloud } from "react-icons/cg";
import { TiCloudStorageOutline } from "react-icons/ti";

const firstLinks = [
  {
    id: 1,
    name: "Home",
    link: "/home",
  },
  {
    id: 1,
    name: "My Drive",
    link: "/my-drive",
  },
];
const secondLinks = [
  {
    id: 1,
    name: "Starred",
    link: "/starred",
  },
  {
    id: 1,
    name: "Trash",
    link: "/trash",
  },
];
const NavBar = () => {
  const [selected, setSelected] = useState("Home");
  return (
    <div className="nav-bar">
      <AddNewBtn />
      <ul className="my-list">
        {firstLinks.map((link, i) => {
          return (
            <li
              key={i}
              className={selected === link.name ? "active" : ""}
              onClick={() => setSelected(link.name)}
            >
              <Link to={link.link}>
                {link.name === "Home" ? (
                  <>
                    <HiHome className="mini-icon" />
                    {link.name}
                  </>
                ) : (
                  <>
                    <BiCloud className="mini-icon" />
                    {link.name}
                  </>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
      <ul className="my-list">
        {secondLinks.map((link, i) => {
          return (
            <li
              key={i}
              className={selected === link.name ? "active" : ""}
              onClick={() => setSelected(link.name)}
            >
              <Link to={link.link}>
                {link.name === "Starred" ? (
                  <>
                    <BsStar className="mini-icon" />
                    {link.name}
                  </>
                ) : (
                  <>
                    <BiTrash className="mini-icon" />
                    {link.name}
                  </>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="progress-chart">
        <div className="title">
          <TiCloudStorageOutline className="mini-icon" />
          Storage
        </div>
        <progress className="progress" value={20} max={100}></progress>
        <div className="data">20GB out of 100GB</div>
      </div>
    </div>
  );
};

export default NavBar;
