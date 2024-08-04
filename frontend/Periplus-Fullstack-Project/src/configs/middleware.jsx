import { Navigate, Outlet } from "react-router-dom";

const Required = () => {
  const token = localStorage.getItem("token");
  // bisa disesuaikan untuk navigasi jika user belum login contoh ke /login or /register
  return <>{!token ? <Navigate to={"/login"} replace /> : <Outlet></Outlet>}</>;
};
export default Required;
