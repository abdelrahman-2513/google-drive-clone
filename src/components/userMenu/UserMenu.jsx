import "./UserMenu.css";
import { CgClose } from "react-icons/cg";
import { UserAuth } from "../../context/AuthContext";

import { FaSignOutAlt } from "react-icons/fa";

function UserMenu() {
  const { user, logOut } = UserAuth();
  const handleLogout = () => {
    try {
      logOut();
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className="small-user-menu">
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
