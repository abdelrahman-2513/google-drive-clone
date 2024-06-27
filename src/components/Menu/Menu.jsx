import "./Menu.css";
import { useState } from "react";
import { BiDownload } from "react-icons/bi";
import { BsStarFill, BsThreeDotsVertical } from "react-icons/bs";
import { TbTrashFilled } from "react-icons/tb";

function Menu() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <div>
        <BsThreeDotsVertical
          className="mini-icon"
          title="Options"
          onClick={() => setOpenMenu((t) => !t)}
        />
      </div>
      {openMenu && <SmallMenu />}
    </>
  );
}

function SmallMenu() {
  return (
    <div className="small-menu1">
      <ul>
        <li className="last-item">Open</li>
        <hr />
        <li>
          <BiDownload className="mini-icon" />
          Download
        </li>
        <li>
          <BsStarFill className="mini-icon" />
          Add to star
        </li>
        <hr />
        <li>
          <TbTrashFilled className="mini-icon" />
          Move to Trash
        </li>
      </ul>
    </div>
  );
}

export default Menu;
