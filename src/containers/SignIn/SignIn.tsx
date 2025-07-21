"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Logo from "@/components/Logo/Logo";
import { AuthContext } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import {
  LOCAL_STORAGE_AUTH_KEY,
  LOCAL_STORAGE_USER_ID,
} from "@/utilities/constants";
import { routes } from "@/utilities/routes";
import { requestType } from "@/utilities/types";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import classes from "./SignIn.module.css";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import Link from "next/link";
import { login } from "@/services/api";

const SignIn = () => {
  // States
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  //   Router
  const router = useRouter();

  //   Context
  const { setUser } = useContext(AuthContext);

  // Hooks
  const { errorFlowFunction } = useError();

  const loginHandler = async () => {
    setRequestState({ isLoading: true, data: null, error: null });

    try {
      const response = await login({
        name: loginData?.email,
        password: loginData?.password,
        timeZoneSecond: 28800,
        lang: "en-GB",
      });

      setUser(response?.data?.data);
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, response?.data?.data?.token);
      localStorage.setItem(LOCAL_STORAGE_USER_ID, response?.data?.data?.userId);

      setTimeout(() => {
        router.replace(routes.DASHBOARD);
      }, 1000);
    } catch (error) {
      errorFlowFunction(error);
    } finally {
      setRequestState((prevState) => {
        return { ...prevState, isLoading: false };
      });
    }
  };

  return (
    <AuthLayout>
      <form className={classes.container}>
        <Logo />
        <h4>Welcome back!</h4>
        <p>
          Sign in securely to check your devices and give you full remote
          control.
        </p>
        <Input
          label="Email"
          isRequired
          name="email"
          value={loginData?.email}
          onChange={(e) => inputChangeHandler(e, setLoginData)}
        />
        <Input
          label="Password"
          type="password"
          isRequired
          name="password"
          value={loginData?.password}
          onChange={(e) => inputChangeHandler(e, setLoginData)}
          tip="Your password should be at least 8 characters"
        />

        <Button
          loading={requestState?.isLoading}
          onClick={(e) => {
            e.preventDefault();
            loginHandler();
          }}
          disabled={!loginData?.email || !loginData?.password}
        >
          Sign In
        </Button>

        <span className={classes.alt}>
          Do not have an account? <Link href={routes.SIGN_UP}>Sign Up</Link>
        </span>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
