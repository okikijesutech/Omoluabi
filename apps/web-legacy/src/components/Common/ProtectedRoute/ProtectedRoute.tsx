import { Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  // Authentication is temporarily suspended. Always allow access.
  return <Outlet />;
};

export default ProtectedRoute;
