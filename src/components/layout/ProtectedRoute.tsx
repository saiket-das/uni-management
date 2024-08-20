import { ReactNode } from "react";
import {
  logout,
  useCurrentToken,
  UserProps,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";

interface ProtectedRouteProps {
  role: string | undefined;
  children: ReactNode;
}

const ProtectedRoute = ({ role, children }: ProtectedRouteProps) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as UserProps;
  }
  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to={"/login"} replace={true} />;
  }
  if (!token) return <Navigate to={"/login"} replace={true} />;

  return children;
};

export default ProtectedRoute;
