import classes from "./SideNav.module.css";
import { dashboardRoutes } from "@/utilities/routes";
import Link from "next/link";
import Close from "@/assets/svgIcons/Close";
import { usePathname, useRouter } from "next/navigation";

type SidenavTypes = {
  onClose: () => void;
};

const Sidenav = ({ onClose }: SidenavTypes) => {
  // Router
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className={classes.container}>
      <div>
        <Close onClick={onClose} />
      </div>
      <nav>
        {dashboardRoutes?.map((route, i) => {
          return (
            <Link
              key={i}
              href={route?.route}
              className={
                pathname.includes(route?.route)
                  ? classes.active
                  : classes.inActive
              }
            >
              {route?.title}
            </Link>
          );
        })}
      </nav>
    </section>
  );
};

export default Sidenav;
