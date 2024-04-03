import Navbar from "../Utility/NavBar";
import { PanelMenu } from 'primereact/panelmenu';
import { MdSchool } from "react-icons/md";
import { Outlet } from "react-router-dom";
export default function Home(params) {
    const items = [     
        {
            label: 'School',
            icon: <MdSchool className="mr-3" size={20}/>,
            url:"/school"
        },]
  return (
    <>
      <Navbar />
      <div className="flex gap-3 mt-14">
        <div className="h-full">
          <div className="w-72 h-[93vh] p-0  rounded-none shadow-gray-400 shadow">
          <PanelMenu model={items} className="w-full" />
           
          </div>
        </div>
        <div className="w-full p-2">
          <div className="w-full h-[92vh] overflow-y-auto">
           <Outlet/>
          </div>
        </div>
      </div>
    </>
  );
}
