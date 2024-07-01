import {
  BarLoader,
  BounceLoader,
  ClockLoader,
  HashLoader,
  PacmanLoader,
} from "react-spinners";

function Loading() {
  return (
    <div className="overlay">
      <div className="loading">
        <BounceLoader className="loading-indicator" loading={true} />
      </div>
    </div>
  );
}

export default Loading;
