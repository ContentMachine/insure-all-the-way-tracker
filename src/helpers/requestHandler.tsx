import { AxiosError, AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { requestType } from "../utilities/types";

type RequestHandlerOptions = {
  method: string;
  url: string;
  data?: any;
  headers?: HeadersInit;
  isMultipart?: boolean;
  useProxy?: boolean;
  setState?: Dispatch<SetStateAction<requestType>>;
  successFunction?: (res: any) => void;
  errorFunction?: (err: any) => void;
  load?: boolean;
  requestCleanup?: boolean;
  id?: string;
};

export async function requestHandler({
  method,
  url,
  data,
  headers = {},
  isMultipart = false,
  useProxy = true,
  setState,
  successFunction,
  errorFunction,
  load,
  requestCleanup,
  id,
}: RequestHandlerOptions) {
  const setLoadingState = (
    isLoading: boolean,
    error: any = null,
    responseData: any = null
  ) => {
    if (setState) {
      setState({
        isLoading,
        error,
        data: responseData,
        id: id ?? "",
      });

      if (requestCleanup && !isLoading) {
        setTimeout(() => {
          setState({
            isLoading: false,
            error: null,
            data: null,
            id: id ?? "",
          });
        }, 5000);
      }
    }
  };

  // Set loading
  if ((setState && load === true) || (setState && load === undefined)) {
    setLoadingState(true);
  }

  try {
    const finalUrl = useProxy ? "/api/proxy" : url;
    const fetchOptions: RequestInit = {
      method,
      headers: {},
    };

    if (useProxy) {
      fetchOptions.headers = {
        "Content-Type": "application/json",
      };
      fetchOptions.body = JSON.stringify({
        method,
        url,
        data,
        isMultipart,
        headers,
      });
    } else {
      if (method !== "GET") {
        if (isMultipart && data instanceof FormData) {
          fetchOptions.body = data;
          fetchOptions.headers = headers; // Let browser set boundary
        } else {
          fetchOptions.body = JSON.stringify(data);
          fetchOptions.headers = {
            "Content-Type": "application/json",
            ...headers,
          };
        }
      } else {
        fetchOptions.headers = headers;
      }
    }

    const response = await fetch(finalUrl, fetchOptions);

    const responseData = await response.json();

    setLoadingState(false, null, responseData);

    if (successFunction) successFunction(responseData);
  } catch (error: any) {
    setLoadingState(false, error.message || "Request failed");

    if (errorFunction) errorFunction(error);
  }
}
