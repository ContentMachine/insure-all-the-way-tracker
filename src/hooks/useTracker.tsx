import useGetHook from "./useGetHook";

export const useTestWhatGps = () => {
  const url =
    "https://www.whatsgps.com/user/login.do?name=test01&password=123456";

  return useGetHook(url);
};
