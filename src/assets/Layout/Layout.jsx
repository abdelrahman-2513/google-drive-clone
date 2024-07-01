import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import { Suspense } from "react";
import Home from "../../Pages/Home/Home";
import MyDrive from "../../Pages/MyDrive/MyDrive";
import Trash from "../../Pages/Trash/Trash";
import Starred from "../../Pages/Starred/Starred";
import Login from "../../Pages/Login/Login";
import Protected from "../../components/Protected/Protected";
import Loading from "../../components/Loading/Loading";
import FolderHome from "../../Pages/Home/FolderHome";

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
      element: <Protected children={<MainPage />} />,

      children: [
        { path: "/", element: <Protected children={<Home />} /> },
        { path: "/home", element: <Protected children={<Home />} /> },
        { path: "/my-drive", element: <Protected children={<MyDrive />} /> },
        { path: "/trash", element: <Protected children={<Trash />} /> },
        { path: "/starred", element: <Protected children={<Starred />} /> },
        {
          path: "/folders/:folderName/:folderId",
          element: <Protected children={<FolderHome />} />,
        },
      ],
    },

    ,
    {
      path: "/login",
      element: <Login />,
    },
  ];

  return (
    <Suspense fallback={<Loading load={true} />}>
      <RouterProvider router={createBrowserRouter(routes)} />
    </Suspense>
  );
}

export default Layout;
