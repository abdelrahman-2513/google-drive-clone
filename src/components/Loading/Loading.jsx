import {
  BarLoader,
  BounceLoader,
  ClockLoader,
  HashLoader,
  PacmanLoader,
} from "react-spinners";

function Loading({ load }) {
  return (
    <div className="overlay">
      <div className="loading">
        <BounceLoader className="loading-indicator" loading={load} />
      </div>
    </div>
  );
}

export default Loading;
