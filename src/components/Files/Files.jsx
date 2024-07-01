import "./File.css";
import File from "./File";

function Files({ files, isTrash = false }) {
  return (
    <div className="files-container">
      {files && files.length > 0 && (
        <>
          <h5>Files</h5>
          <div className="files">
            <>
              {files.map((file, i) => {
                return file.isTrashed && !isTrash ? (
                  <></>
                ) : (
                  <File file={file} key={i} />
                );
              })}
            </>
          </div>
        </>
      )}
    </div>
  );
}

export default Files;
