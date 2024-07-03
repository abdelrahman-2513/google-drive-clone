import React from "react";
import { useQuery } from "@tanstack/react-query";
import Files from "../../components/Files/Files";
import Folders from "../../components/Folders/Folders";
import { searchFiles, searchFolders } from "../../assets/Api/API";
import { UserAuth } from "../../context/AuthContext";
import { useLocation, useParams } from "react-router";
import Loading from "../../components/Loading/Loading";
import NoContent from "../../components/no-content/NoContent";
function useSearchQuery() {
  return new URLSearchParams(useLocation().search);
}
function MyDrive() {
  const { folderId } = useParams();
  const { user } = UserAuth();
  const query = useSearchQuery();
  const search = query.get("search");
  console.log(search);
  const { data: files, isFetching: filesFetching } = useQuery({
    queryKey: ["search-files", user?.email, search === null ? "" : search],
    queryFn: () => searchFiles(user?.email, search),
  });
  const { data: folders, isFetching: foldersFetching } = useQuery({
    queryKey: ["search-folders", user?.email, search === null ? "" : search],
    queryFn: () => searchFolders(user?.email, search),
  });
  if (filesFetching || foldersFetching) {
    return <Loading />;
  }
  return (
    <div className="my-drive">
      <div className="message">
        <h3>My Drive</h3>
      </div>
      {(files && files.length > 0) || (folders && folders.length > 0) ? (
        <>
          <div className="folders-content">
            <Folders folders={folders} search={search} />
          </div>
          <div className="files-content">
            <Files files={files} search={search} />
          </div>
        </>
      ) : (
        <NoContent type={"search"} message={"No data found"} />
      )}
    </div>
  );
}

export default MyDrive;
