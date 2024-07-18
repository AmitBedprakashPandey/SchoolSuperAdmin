import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { confirmDialog } from "primereact/confirmdialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllClassBySchoolStatus } from "../Store/Slice/ClassSlice";
import { AllSectionBySchoolStatus } from "../Store/Slice/SectionSlice";
import { createTeacher, updateTeacher } from "../Store/Slice/TeacherSlice";
export default function TeacherForm({ label, data }) {
  const [formData, setFormData] = useState();
  const [checked, setChecked] = useState(false);
  const { Teacher } = useSelector((state) => state.Teacher);
  const { Classs } = useSelector((state) => state.Class);
  const { Sections } = useSelector((state) => state.Section);
  const dispatch = useDispatch();
  const formHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useLayoutEffect(() => {
    dispatch(AllClassBySchoolStatus(data?.schoolid));
    dispatch(AllSectionBySchoolStatus(data?.schoolid));
  }, [data, dispatch]);

  useEffect(() => {
    if (label === "u" && data) {
      dispatch(AllClassBySchoolStatus(data?.schoolid));
      dispatch(AllSectionBySchoolStatus(data?.schoolid));
      const sch = Teacher.filter((item) => item?._id === data?._id);
      setFormData(sch[0]);
      setChecked(sch[0]?.status);
    }
  }, [data, label, Teacher, dispatch]);

  const toast = useRef(null);

  const showSuccessToast = (message) => {
    toast.current.show({
      severity: "success",
      summary: "Success Message",
      detail: message,
      life: 3000,
    });
  };

  const showErrorToast = (error) => {
    toast.current.show({
      severity: "info",
      summary: "Error Message",
      detail: error,
      life: 3000,
    });
  };

  const onSubmit = () => {
    dispatch(
      createTeacher({
        ...formData,
        status: checked,
        school: data?.school,
      })
    ).then((doc) => {
      if (doc.payload?.response?.status !== 302) {
        showSuccessToast(doc.payload?.message);
      }
      if (doc.payload.response?.data.error) {
        showErrorToast(doc.payload.response?.data.error);
      }
    });
  };
  const onUpdate = () => {
    dispatch(
      updateTeacher({
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
        <div className="flex gap-3">
          <span className="p-float-label mt-7 w-full">
            <InputText
              id="name"
              name="name"
              value={formData?.name}
              onChange={formHandler}
              className="w-full border-gray-300 border px-2 py-3"
            />
            <label htmlFor="address">Enter Name <span className="text-red-500">*</span></label>
          </span>
          <span className="p-float-label mt-7 w-full">
            <InputText
              id="lastnm"
              name="lastnm"
              value={formData?.lastnm}
              onChange={formHandler}
              className="w-full border-gray-300 border px-2 py-3"
            />
            <label htmlFor="address">Last Name <span className="text-red-500">*</span></label>
          </span>
        </div>
        <span className="p-float-label mt-7">
          <InputText
            id="address"
            name="address"
            value={formData?.address}
            onChange={formHandler}
            className="w-full border-gray-300 border px-2 py-3"
          />
          <label htmlFor="address">Address</label>
        </span>

        <span className="p-float-label mt-7">
          <InputNumber
            id="mobile"
            name="mobile"
            value={formData?.mobile}
            onChange={(e) => formHandler(e.originalEvent)}
            useGrouping={false}
            inputClassName="pl-2"
            className="w-full h-12 rounded-lg  border-gray-300 border"
          />
          <label htmlFor="address">Enter Mobile <span className="text-red-500">*</span></label>
        </span>

        <div className="flex gap-2 mt-7">
          <span className="p-float-label w-full md:w-14rem">
            <Dropdown
              inputId="dd-class"
              value={formData?.classs}
              onChange={formHandler}
              options={Classs}
              name="classs"
              optionLabel="class"
              optionValue="class"
              className="w-full border-gray-300 border"
            />
            <label htmlFor="dd-clas">Select Class <span className="text-red-500">*</span></label>
          </span>
          <span className="p-float-label w-full md:w-14rem">
            <Dropdown
              inputId="dd-section"
              name="section"
              value={formData?.section}
              onChange={formHandler}
              options={Sections}
              optionLabel="section"
              optionValue="section"
              className="w-full border-gray-300 border"
            />
            <label htmlFor="dd-section">Select Section <span className="text-red-500">*</span></label>
          </span>
        </div>
        <div className=" flex justify-center mt-7">
          <span className="flex gap-3">
            <Checkbox
              id="status"
              name="status"
              className="outline-gray-300 outline outline-1 rounded-md"
              onChange={(e) => setChecked(e.checked)}
              checked={checked}
            ></Checkbox>
            <label htmlFor="address">Active</label>
          </span>
        </div>
        {label === "s" ? (
          <Button
            onClick={confirm1}
            className="bg-green-600 hover:bg-green-700 duration-300 text-white w-full py-3 mt-5"
            label="Create"
            disabled={
              formData?.name &&
              formData?.lastnm &&
              formData?.mobile &&
              formData?.section &&
              formData?.classs
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
