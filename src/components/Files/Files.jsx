import "./File.css";
import File from "./File";

function Files({ files }) {
  return (
    <div className="files-container">
      <h5>Files</h5>

      {files && files.length > 0 ? (
        <div className="files">
          <>
            {files.map((file, i) => {
              return <File file={file} key={i} />;
            })}
          </>
        </div>
      ) : (
        <p className="no-content">No files yet!</p>
      )}
    </div>
  );
}

export default Files;
