import { useRoutes } from "react-router-dom";
import { AdminRoutes } from "./AdminRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const AppRoutes = () => {
  const element = useRoutes([
    ...PublicRoutes,
    {
      path: "/status/admin",
      children: AdminRoutes,
    }
  ]); 

  return element;
};
