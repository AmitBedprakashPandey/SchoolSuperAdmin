import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { confirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { TabPanel, TabView } from "primereact/tabview";
import { Toast } from "primereact/toast";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BiDetail, BiGroup } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { AllClassBySchoolStatus } from "../Store/Slice/ClassSlice";
import { AllSectionBySchoolStatus } from "../Store/Slice/SectionSlice";
import {
  createTeacherLogin,
  findlogger,
  updateTeacherLogin,
} from "../Store/Slice/TeacherLoginSlice";
import TeacherFrom from "./TeacherForm";

export default function TeacherLoginUpdate({ data }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AllClassBySchoolStatus(data?.school));
    dispatch(AllSectionBySchoolStatus(data?.school));
  }, [data, dispatch]);
  return (
    <>
      <TabView>
        <TabPanel
          header="Update Teacher"
          leftIcon={<BiDetail className="mr-3" />}
        >
          <TeacherFrom data={data} label={"u"} />
        </TabPanel>
        <TabPanel
          header="Create Teacher login"
          leftIcon={<BiGroup className="mr-3" />}
        >
          <RegisterForm data={data} />
        </TabPanel>
      </TabView>
    </>
  );
}

const RegisterForm = ({ data }) => {
  const [formData, setFormData] = useState();
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const formHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useLayoutEffect(() => {
    if (data) {
      dispatch(findlogger(data?._id)).then((e) => {
        setChecked(e.payload.data?.status);
        setFormData(e.payload.data);
      });
    }
  }, [dispatch, data]);

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
  const onChangeUserPassword = () => {
    dispatch(updateTeacherLogin({ ...formData, status: checked })).then(
      (doc) => {
        if (doc.payload?.message) {
          showSuccessToast(doc.payload?.message);
        }
        if (doc.payload?.error) {
          showErrorToast(doc.payload?.error);
        }
      }
    );
  };
  const onRegister = () => {
    dispatch(
      createTeacherLogin({
        ...formData,
        status: checked,
        auth: true,
        user: data?._id,
      })
    ).then((doc) => {
      if (doc.payload?.message) {
        showSuccessToast(doc.payload?.message);
      }
      if (doc.payload?.error) {
        showErrorToast(doc.payload?.error);
      }
    });
  };

  const confirm1 = () => {
    confirmDialog({
      message: "Are you sure you want to save ?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      acceptClassName: "bg-blue-500 px-5 py-3 text-white",
      rejectClassName: "px-5 py-3 mx-3 ",
      accept: onChangeUserPassword,
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
      accept: onRegister,
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="flex gap-3">
        <span className="p-float-label mt-7 w-full">
          <InputText
            id="username"
            value={data?.name}
            name="email"
            onChange={formHandler}
            disabled
            className="w-full border-gray-300 border px-2 py-3"
          />
          <label htmlFor="username">First Name</label>
        </span>
        <span className="p-float-label mt-7 w-full">
          <InputText
            id="username"
            value={data?.lastnm}
            name="email"
            onChange={formHandler}
            disabled
            className="w-full border-gray-300 border px-2 py-3"
          />
          <label htmlFor="username">Last Name</label>
        </span>
      </div>
      <span className="p-float-label mt-7">
        <InputText
          id="username"
          value={formData?.email}
          name="email"
          onChange={formHandler}
          className="w-full border-gray-300 border px-2 py-3"
        />
        <label htmlFor="username">Username</label>
      </span>
      {formData?.auth ? (
        <>
          <span className="p-float-label mt-7 w-full">
            <InputText
              id="username"
              value={formData?.ogpass}
              name="ogpass"
              onChange={formHandler}
              feedback={false}
              disabled
              className="w-full pl-2 border-gray-300 border  h-12 rounded-md"
            />
            <label htmlFor="username">Enter Password</label>
          </span>
          <span className="p-float-label mt-7 w-full">
            <Password
              id="username"
              value={formData?.newpass}
              name="newpass"
              onChange={formHandler}
              feedback={false}
              toggleMask
              inputClassName="w-full pl-3"
              className="w-full border-gray-300 border  h-12 rounded-md"
            />
            <label htmlFor="username">Enter Password</label>
          </span>
        </>
      ) : (
        <span className="p-float-label mt-7 w-full">
          <Password
            id="username"
            value={formData?.pass}
            name="pass"
            onChange={formHandler}
            feedback={false}
            inputClassName="w-full pl-3"
            toggleMask
            className="w-full border-gray-300 border  h-12 rounded-md"
          />
          <label htmlFor="username">Enter Password</label>
        </span>
      )}

      <span className="flex justify-center gap-3 mt-7">
        <Checkbox
          id="status"
          name="status"
          className="outline-gray-300 outline outline-1 rounded-md"
          onChange={(e) => setChecked(e.checked)}
          checked={checked}
        ></Checkbox>
        <label htmlFor="address">Active</label>
      </span>
      {formData?.auth ? (
        <Button
          label="Update"
          onClick={confirm2}
          className="bg-blue-600 hover:bg-blue-700 duration-300 text-white w-full py-3 mt-5"
        />
      ) : (
        <Button
          label="Create"
          onClick={confirm1}
          className="bg-blue-600 hover:bg-blue-700 duration-300 text-white w-full py-3 mt-5"
        />
      )}
    </>
  );
};
