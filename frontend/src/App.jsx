import HomePage from "./Pages/homePage/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./Pages/listPage/listPage";
import  { Layout,RequireAuth } from "./Pages/layout/layout";
import Login from "./Pages/login/login";
import SinglePage from "./Pages/singlePage/singlePage";
import ProfilePage from "./Pages/profilePage/profilePage";
import Register from "./Pages/register/register";

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
        },
        {
          path: "/:id",
          element: <SinglePage />,
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
          ],
      },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
