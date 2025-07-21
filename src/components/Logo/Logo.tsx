import { routes } from "@/utilities/routes";
import Link from "../../../node_modules/next/link";
import React from "react";
import logo from "../../assets/images/logo.png";
import Image from "../../../node_modules/next/image";
import classes from "./Logo.module.css";

type LogoTypes = {
  className?: string;
};

const Logo = ({ className }: LogoTypes) => {
  return (
    <Link href={routes.BASE_URL} className={`${classes.logo} ${className}`}>
      <Image src={logo} alt="Insure All The Way Logo" />
    </Link>
  );
};

export default Logo;
