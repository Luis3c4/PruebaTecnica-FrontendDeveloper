import { Outlet } from "react-router-dom";
import Header from "./header";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
