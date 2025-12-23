
import { AuthContext } from "../../context/AuthContext";
import {  useContext, type ReactNode } from "react";
import { Navigate } from "react-router-dom";


interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}
