import { PanelMenu } from "primereact/panelmenu";
import { useEffect } from "react";
import { MdBackup, MdSchool } from "react-icons/md";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import DeviceValidation from "../Utility/DeviceValidation";
import Navbar from "../Utility/NavBar";
export default function Home() {
  const navigate = useNavigate();
  const param = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("Supertoken")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    // Disable scroll
    document.body.style.overflow = "hidden";

    // Re-enable scroll on cleanup
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const items = [
    {
      label: "School",
      labelClassName: `${
        param.pathname === "/school" ? "text-white " : "text-black"
      }`,
      icon: (
        <MdSchool
          className="mr-3"
          color={param.pathname === "/school" ? "#ffff " : "#000"}
          size={20}
        />
      ),
      className: `${
        param.pathname === "/school" ? "bg-blue-500 " : "bg-slate-200"
      } `,
      url: "school",
    },
    {
      label: "Backup",
      labelClassName: `${
        param.pathname === "/backup" ? "text-white " : "text-black"
      }`,
      icon: (
        <MdBackup
          className="mr-3"
          color={param.pathname === "/backup" ? "#fff" : "#000"}
          size={20}
        />
      ),
      className: `${
        param.pathname === "/backup" ? "bg-blue-500 " : "bg-slate-200"
      } `,
      url: "backup",
    },
  ];
  return (
    <>
      <Navbar />
      <DeviceValidation />
      <div className="flex gap-3 mt-14">
        <div className="h-full">
          <div className="relative w-72 h-[94vh] p-0 rounded-none  shadow-gray-500 shadow-md">
            <PanelMenu
              model={items.map((item) => ({
                ...item,
                template: (item, options) => {
                  return (
                    <Link
                      to={item.url}
                      className={`p-panelmenu-header ${item.className} ${options.className}`}
                      style={{
                        color:
                          param.pathname === "/school" || "/backup"
                            ? "#fff"
                            : "#000",
                      }}
                    >
                      <span className={options.iconClassName}>{item.icon}</span>
                      <span className={item.labelClassName}>{item.label}</span>
                    </Link>
                  );
                },
              }))}
            />
            <small className="absolute bottom-0 py-5 flex justify-center w-full">
              Amit Pandey ©Copyright v1
            </small>
          </div>
        </div>
        <div className="w-full p-2">
          <div className="w-full h-[92vh] overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
