import { Menubar } from "primereact/menubar";
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
export default function Navbar(params) {
  const start = (
    <div className="flex items-center gap-2">
      <img
        alt="logo"
        src="https://primefaces.org/cdn/primereact/images/logo.png"
        className="h-10"
      />
      <h1 className="font-semibold">Digital Branded School</h1>
    </div>
  );
  const end = (
    <div className="flex align-items-center items-center gap-2">
      <Avatar
        image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
        shape="circle"
      />
      <p>pandey@gmail.com</p>
      <Badge severity={"info"} value={"Logout"} className="cursor-pointer hover:bg-cyan-600 duration-300"/>
    </div>
  );
  return (
    <Menubar
      start={start}
      end={end}
      className="fixed top-0 w-full px-10 py-2 shadow-gray-300 shadow"
    />
  );
}
