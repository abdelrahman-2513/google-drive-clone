import Files from "../../components/Files/Files";
import Folders from "../../components/Folders/Folders";

function Starred() {
  return (
    <div className="starred">
      <div className="message">
        <h3>Starred</h3>
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

export default Starred;
