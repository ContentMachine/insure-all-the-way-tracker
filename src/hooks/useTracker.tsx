import useGetHook from "./useGetHook";

export const useTestWhatGps = () => {
  const url = "/user/login.do?name=test01&password=123456";

  return useGetHook(url);
};
