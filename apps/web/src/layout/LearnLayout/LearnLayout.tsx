import { Outlet } from "react-router-dom";
import { SideBar, InfoBar } from "../../components";
import "./LearnLayout.css";

export const LearnLayout = () => {
  return (
    <div className='learnLayout'>
      <SideBar />
      <div className='learnContent'>
        <Outlet />
      </div>
      <InfoBar />
    </div>
  );
};
