import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import DeviceValidation from "./DeviceValidation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSchool } from "../Store/Slice/SchoolSlice";
import { PiMoonStarsFill, PiSunFill } from "react-icons/pi";
export default function Navbar({ title, username }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(localStorage.getItem("storeMode") || false);
  const {loading } = useSelector((state) => state.School);
  
  useEffect(() => {
    if(localStorage.getItem("storeMode")){

    }
    if (darkMode) {
      localStorage.setItem("storeMode" , true);      
      document.documentElement.classList.add('dark');
    } else {
      localStorage.removeItem("storeMode");      
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useLayoutEffect(() => {
    dispatch(getAllSchool());
  }, [dispatch]);

  const accept = () => {
    localStorage.removeItem("Superemail");
    localStorage.removeItem("Supertoken");
    navigate("/login");
  };

  const confirm1 = () => {
    confirmDialog({
      message: "Are you sure you want to Logout ?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "bg-primary text-white px-5 py-2 ml-5 ",
      rejectClassName: "px-5 py-2",
      defaultFocus: "accept",
      accept,
    });
  };

  const start = (
    <div className="flex items-center gap-2">
      <h1 className="font-medium  text-xs capitalize  dark:text-white">{title}</h1>
    </div>
  );

  const end = (
    <div className="flex items-center gap-3">
      {/* <div>
        {darkMode ? 
        
        <PiSunFill size={15} className="dark:text-white cursor-pointer" onClick={()=>setDarkMode(!darkMode)} />  :
        <PiMoonStarsFill size={15} className="cursor-pointer" onClick={()=>setDarkMode(!darkMode)}/>
        }
      </div> */}
      <Avatar
        label={username?.charAt(0)}  
        shape="circle"
        className="flex justify-center items-center w-5 h-5 text-xs"
      />
      <p className="text-xs italic dark:text-white">{username}</p>
      <Badge
        value={"Logout"}
        onClick={confirm1}
        className="cursor-pointer bg-gray hover:bg-black hover:text-white duration-300 text-white"
      />
    </div>
  );

  return (
    <>
      <ConfirmDialog />
      <DeviceValidation />
      <Menubar
        start={start}
        end={end}
        className="w-full dark:bg-slate-700 px-10 py-1.5 z-50 rounded-none shadow-slate-300 dark:shadow-none shadow-md"
      />
    </>
  );
}
