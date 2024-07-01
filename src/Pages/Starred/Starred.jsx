import { useParams } from "react-router";
import Files from "../../components/Files/Files";
import Folders from "../../components/Folders/Folders";
import { UserAuth } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getStarredFiles, getStarredFolders } from "../../assets/Api/API";
import Loading from "../../components/Loading/Loading";
import NoContent from "../../components/no-content/NoContent";

function Starred() {
  const { user } = UserAuth();
  const { data: files, isFetching: filesFetching } = useQuery({
    queryKey: ["starred-files", user?.email],
    queryFn: () => getStarredFiles(user?.email),
  });
  const { data: folders, isFetching: foldersFetching } = useQuery({
    queryKey: ["starred-folders", user?.email],
    queryFn: () => getStarredFolders(user?.email),
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
          <div className="folders-content">
            <Folders folders={folders} isTrash={true} />
          </div>
          <div className="files-content">
            <Files files={files} isTrash={true} />
          </div>
        </>
      ) : (
        <NoContent type={"starred"} message={"Starred data will be here"} />
      )}
    </div>
  );
}

export default Starred;
