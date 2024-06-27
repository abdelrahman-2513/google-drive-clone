import Folder from "./Folder";
import "./Folder.css";
const folders = [
  {
    name: "drive.png",
  },
  {
    name: "file.txt",
  },
  {
    name: "file.doc",
  },
  {
    name: "drive.zip",
  },
];

function Folders() {
  return (
    <div className="folders-container">
      <h5>folders</h5>
      <div className="folders">
        <>
          {folders.map((folder, i) => {
            return <Folder folder={folder} key={i} />;
          })}
        </>
      </div>
    </div>
  );
}

export default Folders;
