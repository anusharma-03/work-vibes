import { StatusWebPage } from "../pages/StatusWebPage";

export const PublicRoutes = [
  {
    path: "/",
    element: <StatusWebPage navigate={() => {}} />,
  },
  {
    path: "/status",
    element: <StatusWebPage navigate={() => {}} />,
  }
];
