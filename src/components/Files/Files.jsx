import "./File.css";
import File from "./File";
const files = [
  {
    name: "drive.png",
    url: "drive.png",
    starred: false,
    type: "png",
    bin: false,
  },
  {
    name: "file.txt",
    starred: false,
    type: "txt",
    bin: false,
  },
  {
    name: "file.doc",
    starred: false,
    type: "docx",
    bin: false,
  },
  {
    name: "drive.zip",
    starred: false,
    type: "zip",
    bin: false,
  },
];

function Files() {
  return (
    <div className="files-container">
      <h5>files</h5>
      <div className="files">
        <>
          {files.map((file, i) => {
            return <File file={file} key={i} />;
          })}
        </>
      </div>
    </div>
  );
}

export default Files;
