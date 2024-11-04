import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { confirmDialog } from "primereact/confirmdialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSchool, updateSchool } from "../Store/Slice/SchoolSlice";
import { PiFloppyDisk, PiUpload, PiUploadDuotone } from "react-icons/pi";
export default function SchoolForm({ label, data, close }) {
  const [formData, setFormData] = useState();
  const [checked, setChecked] = useState(false);
  const { School } = useSelector((state) => state.School);
  const dispatch = useDispatch();

  const formHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (label === "u" && data) {
      const sch = School.filter((item) => item?._id === data?._id);
      setFormData(sch[0]);
      setChecked(sch[0]?.status);
    }
  }, [data, label, School]);

  const toast = useRef(null);

  const showSuccessToast = (message) => {
    toast.current.show({
      severity: "info",
      detail: message,
      life: 3000,
    });
  };

  const onSubmit = () => {
    dispatch(
      createSchool({
        ...formData,
        status: checked,
      })
    ).then((doc) => {
      if (doc.payload.message) {
        showSuccessToast(doc.payload.message);
      }
      if (doc.payload.error) {
        showSuccessToast(doc.payload.error);
      }
    });
  };

  const onUpdate = () => {
    dispatch(
      updateSchool({
        ...formData,

        status: checked,
      })
    ).then((doc) => showSuccessToast(doc.payload.message));
  };

  const confirm1 = () => {
    confirmDialog({
      message: "Are you sure you want to save ?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      acceptClassName: "bg-blue-500 px-5 py-3 text-white",
      rejectClassName: "px-5 py-3 mx-3 ",
      accept: onSubmit,
    });
  };

  const confirm2 = () => {
    confirmDialog({
      message: "Are you sure you want to update ?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      acceptClassName: "bg-blue-500 px-5 py-3 text-white",
      rejectClassName: "px-5 py-3 mx-3 ",
      accept: onUpdate,
    });
  };

  return (
    <>
      {/* {error && showErrorToast(error)} */}
      <Toast ref={toast} />
      <div className="dark:bg-slate-700">
        <span className="p-float-label mt-5">
          <InputText
            id="schoolnm"
            name="name"
            value={formData?.name}
            onChange={formHandler}
            className="w-full dark:bg-slate-500 dark:text-white  border-slate-300 border px-2 py-1.5 text-xs"
          />
          <label htmlFor="schoolnm" className="dark:text-white text-xs">
            School Name <span className="text-red-500">*</span>
          </label>
        </span>
        <span className="p-float-label mt-7">
          <InputText
            id="address"
            name="address"
            value={formData?.address}
            onChange={formHandler}
            className="w-full dark:bg-slate-500 dark:text-white  border-slate-300 border px-2 py-1.5 text-xs"
          />
          <label htmlFor="address" className="dark:text-white text-xs">
            Address <span className="text-red-500">*</span>
          </label>
        </span>
        <span className="p-float-label mt-7">
          <InputNumber
            id="office1"
            useGrouping={false}
            name="office1"
            inputClassName="pl-1.5 dark:bg-slate-500 dark:text-white text-xs"
            value={formData?.office1}
            autoComplete={false}
            onChange={(e) => formHandler(e.originalEvent)}
            aria-autocomplete="none"
            className="border dark:bg-slate-500 dark:text-white  border-slate-300 h-8 w-full rounded-md text-xs"
          />
          <label htmlFor="office1" className="dark:text-white text-xs">
            Office Number <span className="text-red-500">*</span>
          </label>
        </span>
        <span className="p-float-label mt-7">
          <InputNumber
            id="office2"
            useGrouping={false}
            name="office2"
            inputClassName="pl-1.5 dark:bg-slate-500 dark:text-white text-xs"
            className="border dark:bg-slate-500 dark:text-white  border-slate-300 h-8 w-full rounded-md"
            value={formData?.office2}
            onChange={(e) => formHandler(e.originalEvent)}
          />
          <label htmlFor="21" className="dark:text-white text-xs">Office Number</label>
        </span>
        <div className="flex items-center gap-2 mt-7">
          <span className="p-float-label w-full md:w-14rem">
            <InputText
              id="state"
              useGrouping={false}
              name="state"
              inputClassName="pl-1.5 "
              value={formData?.state}
              onChange={formHandler}
              className=" pl-1.5 dark:bg-slate-500 dark:text-white text-xs border-slate-300 border h-8 w-full rounded-md"
            />
            <label htmlFor="dd-state" className="dark:text-white text-xs">
              State <span className="text-red-500">*</span>
            </label>
          </span>
          <span className="p-float-label ">
            <InputText
              id="city"
              name="city"
              value={formData?.city}
              onChange={formHandler}
              className="w-full dark:bg-slate-500 dark:text-white text-xs  border-slate-300 border px-2 py-1.5"
            />
            <label htmlFor="city" className="dark:text-white text-xs">
              City <span className="text-red-500">*</span>
            </label>
          </span>
          <span className="p-float-label ">
            <InputNumber
              id="address"
              name="pincode"
              useGrouping={false}
              value={formData?.pincode}
              maxLength={6}
              onChange={(e) => formHandler(e.originalEvent)}
              inputClassName="w-full dark:bg-slate-500 dark:text-white border-slate-300 border px-2 py-1.5 text-xs"
            />
            <label htmlFor="address" className="dark:text-white text-xs">
              Pincode <span className="text-red-500">*</span>
            </label>
          </span>
        </div>
        <div className=" flex justify-center mt-7">
          <span className="flex items-center gap-1.5">
            <Checkbox
              id="address"
              size={10}
              className="outline-gray-300 outline outline-1 rounded-md"
              
              onChange={(e) => setChecked(e.checked)}
              checked={checked}
            ></Checkbox>
            <label htmlFor="address" className="dark:text-white">Active</label>
          </span>
        </div>
        <div className="w-full flex justify-center">

        {label === "s" ? (
          <Button
          icon={<PiFloppyDisk strokeWidth={5} />}
          className="bg-green-700 hover:bg-green-700 text-white py-2 px-10 flex gap-2 justify-center items-center mt-5 text-xs"
            onClick={confirm1}
            label="Create"
            disabled={
              formData?.name &&
              formData?.address &&
              formData?.office1 &&
              formData?.state &&
              formData?.city &&
              formData?.pincode
              ? false
                : true
            }
            />
          ) : (
            <Button
            onClick={confirm2}
            icon={<PiUpload />}
            className="bg-blue-600 hover:bg-blue-700 duration-300 text-white py-2 px-10 font-normal  text-xs mt-5 flex gap-2 justify-center items-center"
            label="Update"
          />
        )}
        </div>
      </div>
    </>
  );
}
