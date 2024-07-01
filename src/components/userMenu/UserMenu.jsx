import "./UserMenu.css";
import { CgClose } from "react-icons/cg";
import { UserAuth } from "../../context/AuthContext";

import { FaSignOutAlt } from "react-icons/fa";
import { useEffect, useRef } from "react";

function UserMenu({ setOpen }) {
  const menuRef = useRef();
  const { user, logOut } = UserAuth();
  const handleLogout = () => {
    try {
      logOut();
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);
  return (
    <div className="small-user-menu" ref={menuRef}>
      <div className="container2">
        <div className="menu-header">
          <h5>{user.email}</h5>
          <CgClose className="mini-icon" />
        </div>
        <div className="user-content">
          <img src={user.photoURL} alt={user.name} className="rounded-image" />
          <h3>Hi, {user.displayName}</h3>
          <button className="btn manage-btn">Manage your account</button>
        </div>
        <div className="actions">
          <button className="btn sign-out-btn" onClick={handleLogout}>
            <FaSignOutAlt className="mini-icon" />
            Signout from your account
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserMenu;
