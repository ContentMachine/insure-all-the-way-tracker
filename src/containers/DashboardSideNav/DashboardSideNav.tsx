"use client";

import Logo from "@/components/Logo/Logo";
import classes from "./DashboardSideNav.module.css";
import { dashboardRoutes, routes } from "@/utilities/routes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logout from "@/assets/svgIcons/Logout";
import { useContext, useEffect, useRef, useState } from "react";
import { modalGenericType } from "@/utilities/types";
import Modal from "@/components/Modal/Modal";
import LogoutModalBody from "../LogoutModalBody/LogoutModalBody";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import { AuthContext } from "@/context/AuthContext";

const DashboardSideNav = () => {
  // Router
  const pathname = usePathname();
  const router = useRouter();

  // States
  const [isWide, setIsWide] = useState(false);
  const [modals, setModals] = useState<modalGenericType>({
    logout: false,
  });

  // Context
  const { logout } = useContext(AuthContext);

  // Ref
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
    <>
      {modals?.logout && (
        <Modal
          body={
            <LogoutModalBody
              onClose={() => setAllModalsFalse(setModals)}
              onLogout={() => {
                logout();
              }}
            />
          }
          onClick={() => setAllModalsFalse(setModals)}
        />
      )}
      <nav
        className={classes.container}
        style={
          isWide ? { flexBasis: "200px" } : { flexBasis: "80px", width: "0px" }
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
                  key={data?.route}
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

        <div
          className={classes.logout}
          onClick={() => setModalTrue(setModals, "logout")}
        >
          <Logout />
          {isWide && <span>Logout</span>}
        </div>
      </nav>
    </>
  );
};

export default DashboardSideNav;
