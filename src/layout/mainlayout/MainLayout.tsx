import { Outlet } from "react-router-dom";
import { NavBar, Footer } from "../../components";
import "./mainlayout.css";

const MainLayout = () => {
  return (
    <div className='main'>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
