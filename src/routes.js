import { createBrowserRouter } from "react-router-dom";
import ChartPage from "./pages/chart-page";
import NewPage from "./pages/new-page";
import EditPage from "./pages/edit-page";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <ChartPage />,
  },
  {
    path: "/new",
    element: <NewPage />,
  },
  {
    path: "/edit",
    element: <EditPage />,
  },
]);
