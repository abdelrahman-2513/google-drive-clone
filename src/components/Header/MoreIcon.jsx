import { PiDotsNine, PiDotsNineBold } from "react-icons/pi";

export default function MoreIcon({ setShow }) {
  return (
    <div className="rounded">
      <PiDotsNineBold
        className="icon more"
        title="Google Apps"
        onClick={() => setShow((t) => !t)}
      />
    </div>
  );
}
