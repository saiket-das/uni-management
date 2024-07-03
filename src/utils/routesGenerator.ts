import { ReactNode } from "react";

type RouteProps = {
  path: string;
  element: ReactNode;
};

type UserPathProps = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: UserPathProps[];
};

// Routes
export const routesGenerator = (items: UserPathProps[]) => {
  const routes = items.reduce((acc: RouteProps[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path!,
          element: child.element,
        });
      });
    }
    return acc;
  }, []);
  return routes;
};
