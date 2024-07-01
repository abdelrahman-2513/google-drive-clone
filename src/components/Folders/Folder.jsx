import { FaFolder } from "react-icons/fa6";
import Menu from "../Menu/Menu";

function Folder({ folder }) {
  return (
    <div className="folder">
      <FaFolder className="mini-icon" />
      <h5>{folder.folderName}</h5>
      <Menu file={folder} />
    </div>
  );
}

export default Folder;
