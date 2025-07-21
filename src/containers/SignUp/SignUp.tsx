"use client";

import Logo from "@/components/Logo/Logo";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import React, { useContext, useEffect, useState } from "react";
import classes from "../SignIn/SignIn.module.css";
import Input from "@/components/Input/Input";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import { GENDERS, STATES } from "@/utilities/constants";
import { requestType } from "@/utilities/types";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import useError from "@/hooks/useError";
import { requestHandler } from "@/helpers/requestHandler";
import { routes } from "@/utilities/routes";
import Link from "next/link";
import { capitalize } from "@mui/material";

const SignUp = () => {
  // States
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    state: "",
    gender: "",
    occupation: "",
  });
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [state, setState] = useState("");
  const [gender, setGender] = useState("");

  //   Router
  const router = useRouter();

  // Hooks
  const { errorFlowFunction } = useError();
  const { showToast } = useToast();

  //   Requests
  const signUp = () => {
    requestHandler({
      url: "/agent/sign-up",
      method: "POST",
      data: signUpData,
      state: requestState,
      setState: setRequestState,
      id: "sign-in",
      requestCleanup: true,
      successFunction() {
        showToast("Account created successfully. Please sign in", "success");

        setSignUpData({
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          phone: "",
          address: "",
          state: "",
          gender: "",
          occupation: "",
        });

        router.push(routes.SIGN_IN);
      },
      errorFunction(err) {
        errorFlowFunction(err);
      },
    });
  };

  //   Effects
  useEffect(() => {
    if (state) {
      setSignUpData((prevState) => {
        return { ...prevState, state };
      });
    }

    if (gender) {
      setSignUpData((prevState) => {
        return { ...prevState, gender };
      });
    }
  }, [state, gender]);

  return (
    <AuthLayout>
      <form className={classes.container}>
        <Logo />
        <h4>Welcome back, Agent</h4>
        <p>
          Sign up to apply and begin tracking your vehicles with ease and
          confidence.
        </p>

        <Input
          label="First Name"
          isRequired
          name="firstName"
          value={signUpData?.firstName}
          onChange={(e) => inputChangeHandler(e, setSignUpData)}
        />

        <Input
          label="Last Name"
          isRequired
          name="lastName"
          value={signUpData?.lastName}
          onChange={(e) => inputChangeHandler(e, setSignUpData)}
        />

        <Input
          label="Email"
          isRequired
          name="email"
          value={signUpData?.email}
          onChange={(e) => inputChangeHandler(e, setSignUpData)}
        />
        <Input
          label="Phone"
          isRequired
          type="phone"
          name="phone"
          value={signUpData?.phone}
          onChange={(e) => inputChangeHandler(e, setSignUpData)}
        />

        <Input
          label="Address"
          isRequired
          name="address"
          value={signUpData?.address}
          onChange={(e) => inputChangeHandler(e, setSignUpData)}
        />
        <Dropdown
          label="State of Residence"
          isRequired
          options={STATES}
          selected={state}
          setSelected={setState}
        />

        <Input
          label="Occupation"
          isRequired
          name="occupation"
          value={signUpData?.occupation}
          onChange={(e) => inputChangeHandler(e, setSignUpData)}
        />
        <Dropdown
          label="Gender"
          isRequired
          options={GENDERS?.map((data) => capitalize(data))}
          selected={gender}
          setSelected={setGender}
        />

        <Input
          label="Password"
          type="password"
          isRequired
          name="password"
          value={signUpData?.password}
          onChange={(e) => inputChangeHandler(e, setSignUpData)}
          tip="Your password should be at least 8 characters"
        />

        <Button
          loading={requestState?.isLoading}
          onClick={(e) => {
            e.preventDefault();
            signUp();
          }}
          disabled={
            !signUpData?.email ||
            !signUpData?.password ||
            !signUpData?.address ||
            !signUpData?.firstName ||
            !signUpData?.lastName ||
            !signUpData?.phone ||
            !signUpData?.state ||
            !signUpData?.gender ||
            !signUpData?.occupation
          }
        >
          Sign Up
        </Button>

        <span className={classes.alt}>
          Already have an account? <Link href={routes.SIGN_IN}>Sign In</Link>
        </span>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
