import { signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../../firebaseConfig";

export const signIn = () => {
  signInWithRedirect(auth, provider);
};
