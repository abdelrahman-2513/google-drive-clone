import React from "react";
import Files from "../../components/Files/Files";
import Folders from "../../components/Folders/Folders";

import { getFiles, getFolders } from "../../assets/Api/API";
import { UserAuth } from "../../context/AuthContext";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";

import NoContent from "../../components/no-content/NoContent";
function FolderHome() {
  const { folderId, folderName } = useParams();
  const { user } = UserAuth();
  const { data: files, isFetching: filesFetching } = useQuery({
    queryKey: ["files", user?.email, folderId],
    queryFn: () => getFiles(user?.email, folderId || 0),
  });
  const { data: folders, isFetching: foldersFetching } = useQuery({
    queryKey: ["folders", user?.email, folderId],
    queryFn: () => getFolders(user?.email, folderId || 0),
  });

  if (filesFetching || foldersFetching) {
    return <Loading />;
  }

  return (
    <div className="home">
      <div className="message">
        <h3>{folderName}</h3>
      </div>
      {(files && files.length > 0) || (folders && folders.length > 0) ? (
        <>
          <div className="folders-content">
            <Folders folders={folders} />
          </div>
          <div className="files-content">
            <Files files={files} />
          </div>
        </>
      ) : (
        <NoContent type={"home"} message={"Add files or folders"} />
      )}
    </div>
  );
}

export default FolderHome;
