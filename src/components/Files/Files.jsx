import "./File.css";
import React from "react";
import File from "./File";

function Files({ files, isTrash = false, search }) {
  return (
    <div className="files-container">
      {files && files.length > 0 && (
        <>
          <h5>Files</h5>
          <div className="files">
            <>
              {files.map((file, i) => {
                return file.isTrashed && !isTrash ? (
                  <></>
                ) : (
                  <File file={file} key={i} search={search} />
                );
              })}
            </>
          </div>
        </>
      )}
    </div>
  );
}

export default Files;
