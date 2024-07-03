import "./Folder.css";
import React from "react";
import Folder from "./Folder";

function Folders({ folders, isTrash = false, search }) {
  return (
    <div className="folders-container">
      {folders && folders.length > 0 && (
        <>
          <h5>Folders</h5>
          <div className="folders">
            <>
              {folders.map((folder, i) => {
                return folder.isTrashed && !isTrash ? (
                  <></>
                ) : (
                  <Folder folder={folder} key={i} search={search} />
                );
              })}
            </>
          </div>
        </>
      )}
    </div>
  );
}

export default Folders;
