import classes from "./AuthLayout.module.css";
import Image from "next/image";

type AuthLayoutTypes = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutTypes) => {
  return (
    <main className={classes.container}>
      <div>
        <Image
          src="https://res.cloudinary.com/dfilepe0f/image/upload/v1738855635/simon-lee-XX5RQgTuD8o-unsplash_1_eoxrrz.svg"
          alt="Auth Layout Image"
          height={500}
          width={339}
        />
      </div>

      <form>{children}</form>
    </main>
  );
};

export default AuthLayout;
