import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Layout from "./assets/Layout/Layout";
import { AuthContextProvider } from "./context/AuthContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});
function App() {
  return (
    <>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <Layout />
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </AuthContextProvider>
      <Toaster />
    </>
  );
}

export default App;
