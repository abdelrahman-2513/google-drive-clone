import "./Folder.css";
import Folder from "./Folder";

function Folders({ folders }) {
  return (
    <div className="folders-container">
      <h5>Folders</h5>
      {folders && folders.length > 0 ? (
        <div className="folders">
          <>
            {folders.map((folder, i) => {
              return <Folder folder={folder} key={i} />;
            })}
          </>
        </div>
      ) : (
        <p className="no-content">No folders yet!</p>
      )}
    </div>
  );
}

export default Folders;
