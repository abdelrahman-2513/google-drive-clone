import Files from "../../components/Files/Files";
import Folders from "../../components/Folders/Folders";
import { getFiles, getFolders } from "../../assets/Api/API";
import { UserAuth } from "../../context/AuthContext";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
function Home() {
  const { folderId } = useParams();
  const { user } = UserAuth();
  const { data: files, isPending: filesFetching } = useQuery({
    queryKey: ["files", user?.email],
    queryFn: () => getFiles(user?.email, folderId || 0),
  });
  const { data: folders, isLoading: foldersFetching } = useQuery({
    queryKey: ["folders", user?.email],
    queryFn: () => getFolders(user?.email, folderId || 0),
  });
  return (
    <div className="home">
      <div className="message">
        <h3>Welcome to Drive</h3>
      </div>
      <div className="folders-content">
        <Folders folders={folders} />
      </div>
      <div className="files-content">
        <Files files={files} />
      </div>
      {filesFetching ||
        (foldersFetching && (
          <Loading load={filesFetching || foldersFetching} />
        ))}
      {/* <Loading load={true} /> */}
    </div>
  );
}

export default Home;
