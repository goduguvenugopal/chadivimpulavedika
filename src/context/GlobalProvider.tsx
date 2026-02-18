import type { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";

interface Props {
  children: ReactNode;
}

const GlobalProvider = ({ children }: Props) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default GlobalProvider;
