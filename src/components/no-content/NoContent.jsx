import { MdSearchOff } from "react-icons/md";
import { TbTagStarred, TbTrashFilled } from "react-icons/tb";
import { VscNewFolder } from "react-icons/vsc";

function NoContent({ message, type }) {
  return (
    <div className="no-content">
      {type === "home" ? (
        <VscNewFolder className="huge-icon" />
      ) : type === "trashed" ? (
        <TbTrashFilled className="huge-icon" />
      ) : type === "starred" ? (
        <TbTagStarred className="huge-icon" />
      ) : (
        type === "search" && <MdSearchOff className="huge-icon" />
      )}
      <h3>{message}</h3>
    </div>
  );
}

export default NoContent;
