import { toastWarn } from "components/Toast";
import { firebaseUser } from "config/auth";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({
  children,
  redirectPath = "/login",
}: any) {
  useEffect(() => {
    if (firebaseUser()) {
      toastWarn("Você precisa estar logado para acessar essa página");
    }
  }, []);

  if (firebaseUser()) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
}
