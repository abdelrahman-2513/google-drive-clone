import React from "react";
import { FaFolder } from "react-icons/fa6";
import Menu from "../Menu/Menu";
import { useNavigate } from "react-router-dom";

function Folder({ folder, search }) {
  const navigate = useNavigate();

  const handleOpenFolder = (e) => {
    e.preventDefault();
    console.log(folder.id, folder.folderName);
    navigate(`/folders/${folder.folderName}/${folder.id}`);
  };
  return (
    <div className="folder" onDoubleClick={handleOpenFolder}>
      <FaFolder className="mini-icon" />
      <h5>{folder.folderName}</h5>
      <Menu file={folder} search={search} />
    </div>
  );
}

export default Folder;
