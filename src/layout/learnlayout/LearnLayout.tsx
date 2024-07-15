import { Outlet } from "react-router-dom";
import "./learnlayout.css";
import { InfoBar, SideBar } from "../../components";

const LearnLayout = () => {
  return (
    <div className='layout'>
      <SideBar />
      <div className='vline'></div>
      <Outlet />
      <InfoBar />
    </div>
  );
};

export default LearnLayout;
