import Menu from "../Menu/Menu";
import GetFileIcon from "./fileIcons";

function File({ file }) {
  return (
    <div className="file">
      <div className="file-header">
        <GetFileIcon file={file} />
        <h5>{file.name}</h5>
        <Menu />
      </div>
      <div className="file-content">
        {file.type === "png" && <img src={`./${file.url}`} alt={file.name} />}
      </div>
    </div>
  );
}

export default File;
