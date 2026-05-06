import { useRoutes, useNavigate } from "react-router-dom";
import { AdminRoutes } from "./AdminRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { AdminProtectedRoute } from "../components/admin/AdminProtectedRoute";
import { StatusAdminPage } from "../pages/admin/StatusAdminPage";

export const AppRoutes = () => {
  const navigate = useNavigate();
  const element = useRoutes([
    ...PublicRoutes,
    {
      path: "/status/admin",
      children: [
        {
          path: "login",
          element: <StatusAdminPage navigate={navigate} />,
        },
        {
          element: <AdminProtectedRoute />,
          children: AdminRoutes.filter(route => route.path !== "login"),
        }
      ],
    }
  ]); 

  return element;
};
