import HomePage from "./Pages/homePage/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./Pages/listPage/listPage";
import Layout from "./Pages/layout/layout";
import SinglePage from "./Pages/singlePage/singlePage";

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
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
