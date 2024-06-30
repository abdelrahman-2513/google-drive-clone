import Files from "../../components/Files/Files";
import Folders from "../../components/Folders/Folders";

function Trash() {
  return (
    <div className="trash">
      <div className="message">
        <h3>Trash</h3>
      </div>
      <div className="folders-content">
        <Folders />
      </div>
      <div className="files-content">
        <Files />
      </div>
    </div>
  );
}

export default Trash;
