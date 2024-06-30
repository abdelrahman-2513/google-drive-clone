import { MdOutlineCreateNewFolder } from "react-icons/md";
import { RiFileUploadLine, RiFolderUploadLine } from "react-icons/ri";

function NewMenu({ setShowMenu, setShowNewFolder, uploadFile }) {
  const handleCreateFolder = () => {
    setShowNewFolder(true);
    setShowMenu(false);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    uploadFile(file);
  };
  return (
    <>
      <div className="small-menu">
        <ul>
          <li className="last-item" onClick={handleCreateFolder}>
            <MdOutlineCreateNewFolder className="mini-icon" />
            New Folder
          </li>
          <hr />
          <li>
            <RiFileUploadLine className="mini-icon" />
            <label htmlFor="file">File Upload</label>
            <input
              type="file"
              name="file"
              className="upload-input"
              title="File Upload"
              id="file"
              onChange={handleFileChange}
            />
          </li>
          <li>
            <RiFolderUploadLine className="mini-icon" />
            <label htmlFor="folder">Folder Upload</label>

            <input
              type="file"
              name="file"
              webkitdirectory
              mozdirectory
              msdirectory
              odirectory
              directory
              multiple
              className="upload-input"
              title="Folder Upload"
              id="folder"
            />
          </li>
        </ul>
      </div>
    </>
  );
}

export default NewMenu;
