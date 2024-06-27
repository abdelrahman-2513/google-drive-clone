import "./AddNew.css";
import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import NewMenu from "./NewMenu";

export default function AddNewBtn() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div className="add-btn">
        <button
          type="button"
          title="add new file"
          className="btn"
          onClick={() => setShowMenu((t) => !t)}
        >
          <IoAdd className="icon" />
          <h4>New</h4>
        </button>
        {showMenu && <NewMenu />}
      </div>
    </>
  );
}
