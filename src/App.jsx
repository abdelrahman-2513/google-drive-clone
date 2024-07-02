import "./App.css";
import React from "react";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/AuthContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Loading from "./components/Loading/Loading";
// components --------------------------------------------------------------------
const Layout = React.lazy(() => import("./assets/Layout/Layout"));

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
          <Suspense fallback={<Loading />}>
            <div className="main-container">
              <Layout />
            </div>
          </Suspense>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </AuthContextProvider>
      <Toaster />
    </>
  );
}

export default App;
