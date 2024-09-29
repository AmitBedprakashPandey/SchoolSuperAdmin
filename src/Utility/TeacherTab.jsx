import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeacherBySchool } from "../Store/Slice/TeacherSlice";
import TeacherLogin from "../Utility/TeacherLoginUpdate";
import TeacherForm from "./TeacherForm";
import { PiPlus } from "react-icons/pi";
export default function TeacherTab({ schoolid }) {
  const [selectSchool, setSelectSchool] = useState();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [lable, setLable] = useState();
  const { Teacher } = useSelector((state) => state.Teacher);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTeacherBySchool(schoolid?._id));
  }, [dispatch, schoolid]);

  const [filters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
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
        return "NO Satus";
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
        className="p-column-filter"
        showClear
        style={{ minWidth: "12rem" }}
      />
    );
  };

  const header = (
    <div className="flex justify-between items-center">
      <span className="text-sm font-bold">Teacher List</span>
      <Button
        icon={<PiPlus />}
        onClick={() => {
          setVisible(true);
          setLable("s");
        }}
        label="Create Teacher"
        className="gap-2 text-sm bg-blue-500 hover:bg-blue-700 duration-300 px-3 py-2 text-white"
      />
    </div>
  );
  const footer = `Total   Teacher : ${Teacher ? Teacher.length : 0}`;

  return (
    <>
      <Dialog
        header={"Create Teacher"}
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: "50vh" }}
        draggable={false}
      >
        <TeacherForm
          data={schoolid}
          label={lable}
          close={() => setVisible(false)}
        />
      </Dialog>

      <Dialog
        header={`${selectSchool?.name} ${selectSchool?.lastnm}`}
        visible={visible2}
        onHide={() => {
          setSelectSchool();
          setVisible2(false);
        }}
        maximized
          headerClassName="dark:text-white dark:bg-slate-700"
        contentClassName="dark:bg-slate-700"
      >
        <TeacherLogin data={selectSchool} />
      </Dialog>

      <DataTable
        value={Teacher}
        header={header}
        size="small"
        dataKey="_id"
        stripedRows
        filterDisplay="row"
        filters={filters}
        selectionMode="single"
        footer={footer}
        selection={selectSchool}
        rows={10}
        className="text-xs"
        sortable
        scrollHeight="70vh"
        onSelectionChange={(e) => {
          setSelectSchool(e.value);
          setVisible2(true);
        }}
      >
        <Column
          header="#"
          body={(newData, option) => option.rowIndex + 1}
          className="w-10"
        ></Column>
        <Column
          filter
          filterPlaceholder="First Name"
          field="name"
          showFilterMenu={false}
          header="First Name"
          className="w-72"
        ></Column>
        <Column
          filter
          filterPlaceholder="Search school"
          field="lastnm"
          showFilterMenu={false}
          header="Last Name"
          className="w-72"
        ></Column>
        <Column field="address" header="Address" className="w-96"></Column>
        <Column
          filter
          field="classs"
          header="Class"
          showFilterMenu={false}
          className="w-40"
          filterPlaceholder="Search city"
        ></Column>
        <Column
          filter
          field="section"
          header="Section"
          showFilterMenu={false}
          className="w-[10rem]"
          filterPlaceholder="Search state"
        ></Column>
        <Column
          field="status"
          header="Status"
          sortable
          showFilterMenu={false}
          filterMenuStyle={{ width: "8rem" }}
          style={{ minWidth: "8rem" }}
          body={statusBodyTemplate}
          filterElement={statusRowFilterTemplate}
        />
      </DataTable>
    </>
  );
}
