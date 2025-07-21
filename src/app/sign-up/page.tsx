import Loader from "@/components/Loader/Loader";
import SignUp from "@/containers/SignUp/SignUp";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <SignUp />
    </Suspense>
  );
};

export default page;
