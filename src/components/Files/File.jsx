import React from "react";
import Menu from "../Menu/Menu";
import GetFileIcon from "./fileIcons";

function File({ file }) {
  const handleOpenFile = () => {
    console.log(file.fileLink);
    window.open(file.fileLink, "_blank");
  };
  return (
    <div className="file" onDoubleClick={handleOpenFile}>
      <div className="file-header">
        <GetFileIcon file={file} />
        <div className="name">
          <h5>{file.fileName}</h5>
        </div>
        <Menu file={file} />
      </div>
      <div className="file-content">
        {file.type.split("/")[0] === "image" && (
          <img src={`${file.fileLink}`} alt={file.fileName} />
        )}
      </div>
    </div>
  );
}

export default File;
