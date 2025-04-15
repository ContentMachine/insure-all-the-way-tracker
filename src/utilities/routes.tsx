import Dashboard from "@/assets/svgIcons/Dashboard";
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
});

export const dashboardRoutes = [
  {
    title: "Dashboard",
    route: routes.DASHBOARD,
    properties: ["isProtected"],
    icon: <Dashboard />,
  },
  {
    title: "Video",
    route: routes.LEADS,
    properties: ["isProtected"],
    icon: <Video />,
  },
  {
    title: "Settings",
    route: routes.POLICIES,
    properties: ["isProtected"],
    icon: <Settings />,
  },
  {
    title: "Profile",
    route: routes.POLICIES,
    properties: ["isProtected"],
    icon: <Profile />,
  },
];
