import { useQuery } from "@tanstack/react-query";
import Files from "../../components/Files/Files";
import Folders from "../../components/Folders/Folders";
import { UserAuth } from "../../context/AuthContext";
import { getTrashedFiles, getTrashedFolders } from "../../assets/Api/API";
import Loading from "../../components/Loading/Loading";
import NoContent from "../../components/no-content/NoContent";

function Trash() {
  const { user } = UserAuth();
  const { data: files, isFetching: filesFetching } = useQuery({
    queryKey: ["trashed-files", user?.email],
    queryFn: () => getTrashedFiles(user?.email),
  });
  const { data: folders, isFetching: foldersFetching } = useQuery({
    queryKey: ["trashed-folders", user?.email],
    queryFn: () => getTrashedFolders(user?.email),
  });

  if (filesFetching || foldersFetching) {
    return <Loading />;
  }
  return (
    <div className="starred">
      <div className="message">
        <h3>Starred</h3>
      </div>
      {(files && files.length > 0) || (folders && folders.length > 0) ? (
        <>
          {folders && folders.length > 0 && (
            <div className="folders-content">
              <Folders folders={folders} isTrash={true} />
            </div>
          )}
          {files && files.length > 0 && (
            <div className="files-content">
              <Files files={files} isTrash={true} />
            </div>
          )}
        </>
      ) : (
        <NoContent
          type={"trashed"}
          message={"Bin data will be deleted automatically after 30 days!"}
        />
      )}
    </div>
  );
}

export default Trash;
