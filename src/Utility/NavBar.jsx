import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import DeviceValidation from "./DeviceValidation";

export default function Navbar() {
  const navigate = useNavigate();
  const start = (
    <div className="flex items-center gap-2">
      <img
        alt="logo"
        src="https://primefaces.org/cdn/primereact/images/logo.png"
        className="h-10"
      />
      <h1 className="text-white font-bold">Digital Branded School</h1>
    </div>
  );

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
      acceptClassName: "bg-blue-500 text-white px-5 py-2 ml-5",
      rejectClassName: "px-5 py-2",
      defaultFocus: "accept",
      accept,
    });
  };

  const end = (
    <div className="flex align-items-center items-center gap-2">
      <Avatar
        image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
        shape="circle"
      />
      <p className="text-white italic">{localStorage.getItem("Superemail")}</p>
      <Badge
        value={"Logout"}
        onClick={confirm1}
        className="cursor-pointer bg-white hover:bg-black hover:text-white duration-300 text-black"
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
        className="fixed top-0 w-full px-10 py-2 z-50 bg-blue-500 shadow-gray-400 shadow-sm rounded-none"
      />
    </>
  );
}
