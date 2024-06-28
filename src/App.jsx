import "./App.css";
import Layout from "./assets/Layout/Layout";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <Layout />
    </AuthContextProvider>
  );
}

export default App;
