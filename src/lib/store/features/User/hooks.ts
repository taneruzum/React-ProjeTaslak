import { useAppSelector } from "../../hooks";

export const useUserSession = () => {
  return useAppSelector((state) => state.userSession);
};
