import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import UserMenu from "../userMenu/UserMenu";

export default function UserIcon() {
  const { user } = UserAuth();
  const [open, setOpen] = useState(false);
  return (
    <div className="user-data" onClick={() => setOpen((t) => !t)}>
      <img src={user.photoURL} alt={user.name} />
      {open && <UserMenu />}
    </div>
  );
}
