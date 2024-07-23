import { Outlet } from "react-router-dom";
import { InfoBar, SideBar } from "../../components";
import "./learnlayout.css";

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
