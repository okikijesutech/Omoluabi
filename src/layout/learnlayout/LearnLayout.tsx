import { Outlet } from "react-router-dom";
// import { LanguageLanding } from "../../pages";
import { InfoBar, SideBar } from "../../components";
import "./learnlayout.css";

const LearnLayout = () => {
  return (
    <div className='layout'>
      <SideBar />
      <div className='vline'></div>
      <Outlet />
      {/* <LanguageLanding /> */}
      <InfoBar />
    </div>
  );
};

export default LearnLayout;
