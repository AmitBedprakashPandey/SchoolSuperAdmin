import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { confirmDialog } from "primereact/confirmdialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSchool, updateSchool } from "../Store/Slice/SchoolSlice";
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
      <div className="">
        <span className="p-float-label mt-7">
          <InputText
            id="schoolnm"
            name="name"
            value={formData?.name}
            onChange={formHandler}
            className="w-full border-gray-300 border px-2 py-3"
          />
          <label htmlFor="schoolnm">
            School Name <span className="text-red-500">*</span>
          </label>
        </span>
        <span className="p-float-label mt-7">
          <InputText
            id="address"
            name="address"
            value={formData?.address}
            onChange={formHandler}
            className="w-full border-gray-300 border px-2 py-3"
          />
          <label htmlFor="address">
            Address <span className="text-red-500">*</span>
          </label>
        </span>
        <span className="p-float-label mt-7">
          <InputNumber
            id="office1"
            useGrouping={false}
            name="office1"
            inputClassName="pl-3 "
            value={formData?.office1}
            autoComplete={false}
            onChange={(e) => formHandler(e.originalEvent)}
            aria-autocomplete="none"
            className="w-full outline-gray-300 outline outline-1 h-12 rounded-md"
          />
          <label htmlFor="office1">
            Office Number <span className="text-red-500">*</span>
          </label>
        </span>
        <span className="p-float-label mt-7">
          <InputNumber
            id="office2"
            useGrouping={false}
            name="office2"
            inputClassName="pl-3 "
            value={formData?.office2}
            onChange={(e) => formHandler(e.originalEvent)}
            className=" outline-gray-300 outline outline-1 h-12 w-full rounded-md"
          />
          <label htmlFor="21">Office Number</label>
        </span>
        <div className="flex gap-2 mt-7">
          <span className="p-float-label w-full md:w-14rem">
            <InputText
              id="state"
              useGrouping={false}
              name="state"
              inputClassName="pl-3 "
              value={formData?.state}
              onChange={formHandler}
              className=" pl-3 outline-gray-300 outline outline-1 h-12 w-full rounded-md"
            />
            <label htmlFor="dd-state">
              State <span className="text-red-500">*</span>
            </label>
          </span>
          <span className="p-float-label ">
            <InputText
              id="city"
              name="city"
              value={formData?.city}
              onChange={formHandler}
              className="w-full border-gray-300 border px-2 py-3"
            />
            <label htmlFor="city">
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
              inputClassName="w-full border-gray-300 border px-2 py-3"
            />
            <label htmlFor="address">
              Pincode <span className="text-red-500">*</span>
            </label>
          </span>
        </div>
        <div className=" flex justify-center mt-7">
          <span className="flex gap-3">
            <Checkbox
              id="address"
              className="outline-gray-300  outline outline-1 rounded-md"
              onChange={(e) => setChecked(e.checked)}
              checked={checked}
            ></Checkbox>
            <label htmlFor="address">Active</label>
          </span>
        </div>
        {label === "s" ? (
          <Button
            onClick={confirm1}
            className="bg-green-500 text-white w-full py-3 mt-5"
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
            className="bg-blue-600 hover:bg-blue-700 duration-300 text-white w-full py-3 mt-5"
            label="Update"
          />
        )}
      </div>
    </>
  );
}
