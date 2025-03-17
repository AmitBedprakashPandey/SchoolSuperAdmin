import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllSchool } from "../Store/Slice/SchoolSlice";
import SchoolDasboard from "../Utility/SchoolDasboard";
import SchoolForm from "../Utility/SchoolForm";
import { PiPlus } from "react-icons/pi";
export default function School() {
  const [selectSchool, setSelectSchool] = useState();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [lable, setLable] = useState();
  const { School } = useSelector((state) => state.School);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem("Supertoken")) {
      navigate("/login");
    }
    
    if(School == []){
      dispatch(getAllSchool()).then((doc) => {
        if (doc.payload?.response?.status === 403) {
          localStorage.removeItem("email");
          localStorage.removeItem("Admintoken");
          localStorage.removeItem("schoolid");
          localStorage.removeItem("schoolName");
          navigate("/login");
        }
      })
    }
  }, [dispatch, navigate]);

  const [filters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const [statuses] = useState([true, false]);

  const statusItemTemplate = (option) => {
    return (
      <Tag
        value={option ? "Active" : "De-active"}
        severity={getSeverity(option)}
      />
    );
  };

  const statusBodyTemplate = (School) => {
    return (
      <Tag
        value={School.status === true ? "Active" : "De-active"}
        severity={getSeverity(School.status)}
      ></Tag>
    );
  };

  const getSeverity = (School) => {
    switch (School) {
      case true:
        return "success";

      case false:
        return "danger";
      default:
        return "no status";
    }
  };

  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterApplyCallback(e.value)}
        itemTemplate={statusItemTemplate}
        placeholder="Select One"
        className="h-11"
        showClear
        style={{ minWidth: "12rem" }}
      />
    );
  };

  const header = (
    <div className="flex justify-between items-center">
      <span className="text-xs text-900 font-bold">School List</span>
      <Button
        icon={<PiPlus />}
        label="Create"
        className="bg-blue-500 gap-1.5 hover:bg-blue-700 duration-300 px-3 py-1.5 text-white text-xs"
        onClick={() => {
          setVisible(true);
          setLable("s");
        }}
      />
    </div>
  );

  const footer = <div className="text-xs">Total School : {School ? School.length : 0}</div>

  return (
    <>
      <Dialog
        header={"Create School"}
        draggable={false}
        visible={visible}
        onHide={() => setVisible(false)}
        className="w-96 "
        headerClassName="dark:text-white dark:bg-slate-700"
        contentClassName="dark:bg-slate-700"
      >
        <SchoolForm label={lable} close={() => setVisible(false)} />
      </Dialog>

      <Dialog
        header={<div className="text-xs">Dashboard - ( {selectSchool?.name} )</div>}
        visible={visible2}
        onHide={() => {
          setVisible2(false);
          setSelectSchool();
        }}
        maximized
        draggable={false}
        className="dark:bg-slate-700"
             headerClassName="dark:text-white dark:bg-slate-700 p-2 border"
        contentClassName="dark:bg-slate-700 p-0"
      >
        <SchoolDasboard data={selectSchool} />
      </Dialog>

      <div className="flex-1">
        <DataTable
          value={School}
          header={header}
          size="small"
          dataKey="_id"
          stripedRows
          filterDisplay="row"
          filters={filters}
          selectionMode="single"
          footer={footer}
          rows={10}
          scrollable
          scrollHeight="80vh"
          selection={selectSchool}
          rowClassName={"border-b "}
          onSelectionChange={(e) => {
            setSelectSchool(e.value);
            setVisible2(true);
          }}
          className="h-full dark:bg-black border-slate-700 dark:text-white"
        >
          <Column
            header="#"
            headerClassName="text-xs "
            bodyClassName="px-4 text-xs capitalize "
            className="w-8"
            body={(rowData, options) => options.rowIndex + 1}
          ></Column>
          <Column
            filter
            filterPlaceholder="Search"
            field="name"
            showFilterMenu={false}
            headerClassName="text-xs "
            bodyClassName="px-4 text-sm  "
            header="School Name"
            className="w-56 capitalize"
          ></Column>
          <Column
            field="address"
            header="Address"
            headerClassName="text-xs "
            bodyClassName="px-4 text-sm   capitalize"
            className="w-64"
          ></Column>
          <Column
            filter
            field="city"
            header="City"
            showFilterMenu={false}
            headerClassName="text-xs "
            bodyClassName="px-4 text-sm   capitalize"
            className="w-40"
            filterPlaceholder="Search"
          ></Column>
          <Column
            filter
            field="state"
            header="State"
            headerClassName="text-xs "
            showFilterMenu={false}
            bodyClassName="px-4 text-sm   capitalize"
            className="w-40"
            filterPlaceholder="Search"
          ></Column>
          <Column
            field="office1"
            header="Office No."
            headerClassName="text-xs "
            bodyClassName="px-4 text-sm   capitalize"
            className="w-40"
          ></Column>
          <Column
            field="office2"
            header="Office No."
            headerClassName="text-xs "
            bodyClassName="px-4 text-sm   capitalize"
            className="w-40"
          ></Column>
          <Column
            field="status"
            header="Status"
            headerClassName="text-xs "
            bodyClassName="px-4 text-sm   capitalize"
            className="w-40"
            showFilterMenu={false}
            body={statusBodyTemplate}
            sortable
          />
        </DataTable>
      </div>
    </>
  );
}
