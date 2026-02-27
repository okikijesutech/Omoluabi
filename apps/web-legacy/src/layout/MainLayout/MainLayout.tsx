import { Outlet } from "react-router-dom";
import { NavBar, Footer } from "../../components";

export const MainLayout = () => {
  return (
    <>
      <NavBar />
      <main style={{ paddingTop: "72px" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
