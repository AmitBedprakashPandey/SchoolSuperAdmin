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
      <TabView
      panelContainerClassName="dark:text-white dark:bg-slate-700"
      >
        <TabPanel
          headerClassName="text-sm"
          header="Update Teacher"
          leftIcon={<BiDetail className="mr-3" />}
        >
          <div className="flex justify-center   dark:text-white dark:bg-slate-700">
            <div className="w-96">
              <TeacherFrom data={data} label={"u"} />
            </div>
          </div>
        </TabPanel>
        <TabPanel
          headerClassName="text-sm"
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
      <div className="flex justify-center">
        <div className="w-96">
          <div className="w-96 flex gap-3">
            <span className="p-float-label mt-7 w-full">
              <InputText
                id="firstname"
                value={data?.name}
                disabled
                className="w-full border-slate-300 border px-2 py-3"
              />
              <label htmlFor="firstname">First Name</label>
            </span>
            <span className="p-float-label mt-7 w-full">
              <InputText
                id="lastname"
                value={data?.lastnm}
                disabled
                className="w-full border-slate-300 border px-2 py-3"
              />
              <label htmlFor="lastname">Last Name</label>
            </span>
          </div>
          <span className="p-float-label mt-7">
            <InputText
              id="email"
              value={formData?.email}
              name="email"
              autoComplete="email"
              onChange={formHandler}
              className="w-96 border-slate-300 border px-2 py-3"
            />
            <label htmlFor="email">
              Username id <span className="text-red-500">*</span>
            </label>
          </span>
          {formData?.auth ? (
            <div className="w-full">
              <span className="p-float-label mt-7 w-full">
                <InputText
                  id="ogpass"
                  value={formData?.ogpass}
                  name="ogpass"
                  autoComplete="current-password"
                  onChange={formHandler}
                  feedback={false}
                  disabled
                  className="w-96 pl-2 border-slate-300 border  h-12 rounded-md"
                />
                <label htmlFor="ogpass">Orignal Password</label>
              </span>
              <span className="p-float-label mt-7 w-full">
                <Password
                  id="newpass"
                  value={formData?.newpass}
                  name="newpass"
                  autoComplete="new-password"
                  onChange={formHandler}
                  feedback={false}
                  toggleMask
                  inputClassName="w-96 h-12 pl-3 border-slate-300 border"
                  className="rounded-md"
                />
                <label htmlFor="newpass">Enter New Password</label>
              </span>
            </div>
          ) : (
            <span className="p-float-label mt-7 w-full">
              <Password
                id="pass"
                value={formData?.pass}
                name="pass"
                autoComplete="new-password"
                onChange={formHandler}
                feedback={false}
                inputClassName="w-96 h-12 pl-3 border-slate-300 border"
                className="rounded-md"
                toggleMask
              />
              <label htmlFor="pass">
                Enter Password <span className="text-red-500">*</span>
              </label>
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
              disabled={formData?.email && formData?.pass ? false : true}
              className="bg-blue-600 hover:bg-blue-700 duration-300 text-white w-full py-3 mt-5"
            />
          )}
        </div>
      </div>
    </>
  );
};
