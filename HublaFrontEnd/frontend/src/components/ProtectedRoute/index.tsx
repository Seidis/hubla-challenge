import { toastWarn } from "components/Toast";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({
  isAlowed,
  children,
  redirectPath = "/login",
}: any) {
  useEffect(() => {
    if (!isAlowed) {
      toastWarn("Você precisa estar logado para acessar essa página");
    }
  }, []);

  if (!isAlowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
}
