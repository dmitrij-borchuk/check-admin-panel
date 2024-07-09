import { FC, PropsWithChildren } from "react";
import { Layout } from "react-admin";
import { AdminAppBar } from "./AppBar";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => (
  <Layout appBar={AdminAppBar}>{children}</Layout>
);
