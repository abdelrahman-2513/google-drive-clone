import Files from "../../components/Files/Files";
import Folders from "../../components/Folders/Folders";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="message">
        <h3>Welcome to Drive</h3>
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

export default Home;
