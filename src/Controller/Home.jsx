import { PanelMenu } from "primereact/panelmenu";
import { useEffect } from "react";
import { MdBackup, MdSchool,MdSpeed } from "react-icons/md";
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

  const items = [{
    label:"Dashborad",
    url:"/",
    className: `${
      param.pathname === "/" ? "bg-primary " : ""
    } `,
    labelClassName: `${
      param.pathname === "/" ? "text-white " : "text-black"
    }`,
    icon: (
      <MdSpeed
        className="mr-3"
        color={param.pathname === "/" ? "#ffff " : "#000"}
        size={20}
      />
    ),
  },
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
        param.pathname === "/school" ? "bg-primary " : ""
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
        param.pathname === "/backup" ? "bg-primary " : ""
      } `,
      url: "backup",
    },
  ];
  return (
    <>
      <Navbar />
      <DeviceValidation />
      <div className="flex gap-3">
        <div className="flex-1">
          <div className="relative w-72 h-full p-0 rounded-none  shadow-gray-500 shadow-md">
            <PanelMenu
            
              model={items.map((item) => ({
                ...item,
                template: (item, options) => {
                  return (
                    <Link
                      to={item.url}
                      className={`p-panelmenu-header ${item.className} ${options.className} h-12`}
                   
                    >
                      <span className={options.iconClassName}>{item.icon}</span>
                      <span className={item.labelClassName}>{item.label}</span>
                    </Link>
                  );
                },
              }))}
            />
            <small className="absolute bottom-0 py-5 flex justify-center w-full">
              Amit Pandey © Copyright 2024 v1
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
