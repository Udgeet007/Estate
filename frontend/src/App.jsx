import HomePage from "./Pages/homePage/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./Pages/listPage/listPage";
import  { Layout,RequireAuth } from "./Pages/layout/layout";
import Login from "./Pages/login/login";
import SinglePage from "./Pages/singlePage/singlePage";
import ProfilePage from "./Pages/profilePage/profilePage";
import Register from "./Pages/register/register";
import ProfileUpdatePage from "./Pages/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./Pages/newPostPage/newPostPage";
import { listPageLoader, singlePageLoader } from "./libraries/loader";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
        {
          path: "/",
          element: <RequireAuth />,
          children: [
            {
              path: "/profile",
              element: <ProfilePage />,
            },
            {
              path: "/profile/update",
              element: <ProfileUpdatePage />,
            },
            {
              path: "/add",
              element: <NewPostPage />,
            },
          ],
      },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
