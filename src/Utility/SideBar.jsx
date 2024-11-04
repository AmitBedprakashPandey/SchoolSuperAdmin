import { Avatar } from "primereact/avatar";
import React, { createContext } from "react";
import Image from "../Assets/Image";
import { PanelMenu } from "primereact/panelmenu";

const SidebarContext = createContext();
export default function SideBar({title,menuList}) {
  return (
    <aside className="h-screen relative">
      <nav className="h-full sticky top-0 flex flex-col bg-white dark:bg-slate-700 border-r border-slate-300 dark:border-none">
        <div className="py-2 px-4 w-full flex items-center gap-3">
          {/* <Avatar image={Image.Brandlogo} size="large" shape="circle" /> */}
          <Avatar
        label={title?.substring(0,2)}
        shape="circle"
        size="normal"
        className="font-bold uppercase"
      />
          <h1 className="text-xs font-bold text-nowrap dark:text-white">{title}</h1>
        </div>
        <SidebarContext.Provider>
          <div className="flex-1">
            <PanelMenu  model={menuList}/>
          </div>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}
