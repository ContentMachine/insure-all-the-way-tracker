import Car from "@/assets/svgIcons/Car";
import Dashboard from "@/assets/svgIcons/Dashboard";
import File from "@/assets/svgIcons/File";
import Profile from "@/assets/svgIcons/Profile";
import Settings from "@/assets/svgIcons/Settings";
import Video from "@/assets/svgIcons/Video";

export const routes = Object.freeze({
  BASE_URL: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  DASHBOARD: "/dashboard",
  POLICIES: "/policies",
  USERS: "/users",
  CLAIMS: "/claims",
  LEADS: "/leads",
  REPORT: "/reports",
  DEVICES: "/devices",
});

export const dashboardRoutes = [
  {
    title: "Dashboard",
    route: routes.DASHBOARD,
    properties: ["isProtected"],
    icon: <Dashboard />,
  },
  {
    title: "Devices",
    route: routes.DEVICES,
    properties: ["isProtected"],
    icon: <Car />,
  },
  {
    title: "Reports",
    route: routes.REPORT,
    properties: ["isProtected"],
    icon: <File />,
  },
];
