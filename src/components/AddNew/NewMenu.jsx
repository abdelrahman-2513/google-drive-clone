import { FaFileUpload } from "react-icons/fa";
import { ImFolderUpload } from "react-icons/im";
import { MdCreateNewFolder } from "react-icons/md";

function NewMenu() {
  return (
    <div className="small-menu">
      <ul>
        <li className="last-item">
          <MdCreateNewFolder className="mini-icon" />
          New Folder
        </li>
        <hr />
        <li>
          <FaFileUpload className="mini-icon" />
          file upload
        </li>
        <li>
          <ImFolderUpload className="mini-icon" />
          folder upload
        </li>
      </ul>
    </div>
  );
}

export default NewMenu;
