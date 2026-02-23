import { Outlet } from "react-router-dom";
import { NavBar, Footer } from "../../components";

export const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};
