import { toastWarn } from "components/Toast";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({
  children,
  redirectPath = "/login",
}: any) {
  const alowed = localStorage.getItem("email");
  useEffect(() => {
    if (!alowed) {
      toastWarn("Você precisa estar logado para acessar essa página");
    }
  });

  if (!alowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
}
