"use client";

import { requestHandler } from "@/helpers/requestHandler";
import {
  LOCAL_STORAGE_AUTH_KEY,
  LOCAL_STORAGE_USER_ID,
} from "@/utilities/constants";
import { routes } from "@/utilities/routes";
import {
  loginDataRequestBody,
  loginResponseType,
  requestType,
  userType,
} from "@/utilities/types";
import { useRouter } from "../../node_modules/next/navigation";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getUser } from "@/services/api";
import useError from "@/hooks/useError";
import { TOKEN, USER_ID } from "@/config";

type AuthContextValuesType = {
  user: loginResponseType | null;
  setUser: Dispatch<SetStateAction<loginResponseType | null>>;
  requestState: requestType;
  logout: () => void;
};

type AuthContextProviderType = {
  children: React.ReactNode;
};

export const AuthContext = createContext({} as AuthContextValuesType);

const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  // States
  const [user, setUser] = useState<null | loginResponseType>(null);
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  // ROuter
  const router = useRouter();

  // Hooks
  const { errorFlowFunction } = useError();

  // Utils
  const token = TOKEN;
  const userId = USER_ID;

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
      localStorage.removeItem(LOCAL_STORAGE_USER_ID);
    }
    router.replace(routes.SIGN_IN);
    setUser(null);
  };

  const getUserInfoHandler = async () => {
    setRequestState({ isLoading: true, data: null, error: null });

    try {
      const response = await getUser({
        token: token as string,
        userId: userId as string,
      });

      setUser(response?.data?.data);
    } catch (error) {
      errorFlowFunction(error);
      logout();
    } finally {
      setRequestState((prevState) => {
        return { ...prevState, isLoading: false };
      });
    }
  };

  useEffect(() => {
    if (token && userId) {
      getUserInfoHandler();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, requestState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
