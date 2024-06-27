import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import { Suspense } from "react";
import Home from "../../Pages/Home/Home";
import MyDrive from "../../Pages/MyDrive/MyDrive";
import Trash from "../../Pages/Trash/Trash";
import Starred from "../../Pages/Starred/Starred";

function Layout() {
  // feed-------------------------------
  const MainPage = () => {
    return (
      <>
        <>
          <Header />
          <main>
            <NavBar />
            <div className="container">
              <Outlet />
            </div>
          </main>
        </>
      </>
    );
  };

  const routes = [
    {
      path: "/",
      element: <MainPage />,

      children: [
        { path: "/", element: <Home /> },
        { path: "/home", element: <Home /> },
        { path: "/my-drive", element: <MyDrive /> },
        { path: "/trash", element: <Trash /> },
        { path: "/starred", element: <Starred /> },
      ],
    },

    // {
    //   path: "/login",
    //   element: <Login />,
    // },
    // { path: "*", element: <PageNotFound /> }, // Wildcard route for 404 errors
  ];

  return (
    <Suspense fallback={<div>Loading......</div>}>
      <RouterProvider router={createBrowserRouter(routes)} />
    </Suspense>
  );
}

export default Layout;
