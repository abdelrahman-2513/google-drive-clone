import { useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import "./Login.css";

import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) navigate("/");
  }, [user]);
  const handleSignin = () => {
    try {
      googleSignIn();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-btn">
        <button type="button" className="btn btn-google" onClick={handleSignin}>
          <FaGoogle className="google-icon mini-icon" />
          <h3>SignIn with google</h3>
        </button>
      </div>
    </div>
  );
}

export default Login;
