import Logo from "@/components/Logo/Logo";
import classes from "./DashboardSideNav.module.css";
import { dashboardRoutes } from "@/utilities/routes";
import Link from "next/link";
import RequireAuth from "@/components/RequireAuth/RequireAuth";
import { usePathname } from "next/navigation";
import Logout from "@/assets/svgIcons/Logout";
import { useEffect, useRef, useState } from "react";

const DashboardSideNav = () => {
  // Router
  const pathname = usePathname();

  // States
  const [isWide, setIsWide] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isWideHandler = (e: any) => {
        if (
          containerRef?.current &&
          !containerRef?.current?.contains(e.target)
        ) {
          const timeOut = setTimeout(() => {
            setIsWide(false);
          }, 100);

          return () => {
            clearTimeout(timeOut);
          };
        } else {
          setIsWide(true);
        }
      };

      document.addEventListener("mouseover", isWideHandler);

      return () => {
        document.removeEventListener("mouseover", isWideHandler);
      };
    }
  });

  return (
    <nav
      className={classes.container}
      style={
        isWide ? { flexBasis: "250px" } : { flexBasis: "100px", width: "0px" }
      }
      ref={containerRef}
    >
      <Logo className={!isWide ? classes.inVisible : classes.visible} />

      {isWide ? (
        <ul>
          {dashboardRoutes?.map((data) => {
            return (
              <li
                className={
                  pathname === data?.route ? classes.active : classes.inActive
                }
              >
                <Link href={data?.route}>
                  {data?.icon}
                  <span>{data?.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul>
          {dashboardRoutes?.map((data) => {
            return (
              <li
                className={
                  pathname === data?.route ? classes.active : classes.inActive
                }
              >
                <Link href={data?.route}>{data?.icon}</Link>
              </li>
            );
          })}
        </ul>
      )}

      <div className={classes.logout}>
        <Logout />
        {isWide && <span>Logout</span>}
      </div>
    </nav>
  );
};

export default DashboardSideNav;
