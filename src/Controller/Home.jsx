import { PanelMenu } from "primereact/panelmenu";
import { useEffect } from "react";
import { MdBackup, MdSchool, MdSpeed } from "react-icons/md";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import DeviceValidation from "../Utility/DeviceValidation";
import Navbar from "../Utility/NavBar";
import SideBar from "../Utility/SideBar";
export default function Home() {
  const navigate = useNavigate();
  const param = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("Supertoken")) {
      navigate("/login");
    }
  }, [navigate]);

  const itemTemplate = (item) => {
    return (
      <>
        <Link
          to={item?.url}
          className="w-full dark:bg-slate-700 dark:hover:bg-slate-500  flex items-center gap-3 px-4 py-2 hover:bg-blue-200  duration-300 transition-all"
        >
          <span className="text-slate-500 text-2xl dark:text-white">{item?.icon}</span>
          <label className="text-slate-500 text-xs font-semibold capitalize dark:text-white">
            {item?.label}
          </label>
        </Link>
      </>
    );
  };

  const items = [
    {
      label: "Dashborad",
      url: "dashboard",
      icon: <MdSpeed size={15}/>,
      template: itemTemplate,
    },
    {
      label: "School",
      icon: <MdSchool size={15}/>,
      url: "school",
      template: itemTemplate,
    },
    {
      label: "Backup",
      icon: <MdBackup size={15}/>,
      url: "backup",
      template: itemTemplate,
    },
  ];
  return (
    <div className="flex h-screen w-screen relative bg-slate-200 dark:bg-slate-600">
      <div className="">
        <SideBar menuList={items} title={"School Management"} />
      </div>
      <div className="flex flex-col w-full">
        <Navbar
          title={"Super Admin"}
          username={localStorage.getItem("Superemail")}
        />
        <div className="p-1 shadow-sm">
          <Outlet />
        </div>
      </div>
      <DeviceValidation />
    </div>
  );
}
