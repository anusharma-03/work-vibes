import { lazyImport } from "../lib/lazyImport";

const { DashboardPage } = lazyImport(() => import("../pages/admin/DashboardPage"), "DashboardPage");
const { UsersPage } = lazyImport(() => import("../pages/admin/UsersPage"), "UsersPage");
const { ProjectsPage } = lazyImport(() => import("../pages/admin/ProjectsPage"), "ProjectsPage");
const { TeamsPage } = lazyImport(() => import("../pages/admin/TeamsPage"), "TeamsPage");
const { HistoryPage } = lazyImport(() => import("../pages/admin/HistoryPage"), "HistoryPage");
const { SettingsPage } = lazyImport(() => import("../pages/admin/SettingsPage"), "SettingsPage");
const { StatusAdminPage } = lazyImport(() => import("../pages/admin/StatusAdminPage"), "StatusAdminPage");

export const AdminRoutes = [
  {
    path: "",
    element: <DashboardPage />,
  },
  {
    path: "users",
    element: <UsersPage />
  },
  {
    path: "projects",
    element: <ProjectsPage />
  },
  {
    path: "teams",
    element: <TeamsPage />
  },
  {
    path: "history",
    element: <HistoryPage />
  },
  {
    path: "settings",
    element: <SettingsPage />
  },
  {
    path: "login",
    element: <StatusAdminPage navigate={() => {}} />
  }
];
