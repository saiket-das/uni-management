import { ReactNode } from "react";

export type UserPathProps = {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: UserPathProps[];
};

export type RouteProps = {
  path: string;
  element: ReactNode;
};

export type SidebarItemProps =
  | {
      key: string;
      label: ReactNode;
      children?: SidebarItemProps[];
    }
  | undefined;
