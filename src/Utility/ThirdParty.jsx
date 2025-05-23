import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { confirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createPartyLogin,
  findlogger,
  updatePartyLogin,
} from "../Store/Slice/PartySlice";
import { Dropdown } from "primereact/dropdown";
import moment from "moment/moment";

export default function ThirdParty({ data }) {
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


  const Year = [
    { year: (moment().year()-1)+"-"+moment().year() },
    { year: moment().year()+"-"+(moment().year() + 1)},
  ];

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
    dispatch(updatePartyLogin({ ...formData, status: checked })).then((doc) => {
      if (doc.payload?.message) {
        showSuccessToast(doc.payload?.message);
      }
      if (doc.payload?.error) {
        showErrorToast(doc.payload?.error);
      }
    });
  };

  const onRegister = () => {
    dispatch(
      createPartyLogin({
        ...formData,
        status: checked,
        auth: true,
        schoolid: data?._id,
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
        <div className="">

        
      <div className="flex gap-3">
        <span className="p-float-label mt-7 w-full">
          <InputText
            id="schoolname"
            value={data?.name}
            disabled
            className="w-full border-slate-300 dark:text-white dark:bg-slate-700 border px-2 py-3"
          />
          <label htmlFor="schoolname" className="dark:text-white">School Name</label>
        </span>
      </div>
      <span className="p-float-label mt-7">
        <InputText
          id="email"
          value={formData?.email}
          autoComplete="email"
          name="email"
          onChange={formHandler}
          className="w-full border-slate-300 dark:text-white dark:bg-slate-700 border px-2 py-3"
        />
        <label htmlFor="email" className="dark:text-white">
          Username id <span className="text-red-500">*</span>
        </label>
      </span>
      <span className="p-float-label mt-7">
        
        <Dropdown
          id="year"
          options={Year}
          value={formData?.sessionyear}
          optionLabel="year"
          optionValue="year"
          name="sessionyear"
          onChange={formHandler}
          className="w-full  border-slate-300 dark:text-white dark:bg-slate-700 border"
        />
        <label htmlFor="email" className="dark:text-white">
          Acdemic Year <span className="text-red-500">*</span>
        </label>
      </span>
      {formData?.auth ? (
        <>
          <span className="p-float-label mt-7 w-full">
            <InputText
              id="ogpass"
              autoComplete="current-password"
              value={formData?.ogpass}
              name="ogpass"
              onChange={formHandler}
              disabled
              feedback={false}
              className="w-full pl-2 border-slate-300 border dark:text-white dark:bg-slate-700  h-12 rounded-md"
            />
            <label htmlFor="ogpass" className="dark:text-white">Original Password</label>
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
              inputClassName="w-96  h-12 p-3 border-slate-300 dark:text-white dark:bg-slate-700 border rounded-md"
              className=""
            />
            <label htmlFor="newpass" className="dark:text-white">Enter New Password</label>
          </span>
        </>
      ) : (
        <span className="p-float-label mt-7 w-full">
          <Password
            id="pass"
            value={formData?.pass}
            name="pass"
            autoComplete="current-password"
            onChange={formHandler}
            feedback={false}
            inputClassName="w-96  h-12 p-3 border-slate-300 dark:text-white dark:bg-slate-700 border rounded-md"
            toggleMask
            className="w-full"
          />
          <label htmlFor="pass" className="dark:text-white">Enter Password</label>
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
        <label htmlFor="address" className="dark:text-white">Active</label>
      </span>
      {formData?.auth ? (
        <Button
          label="Update"
          onClick={confirm1}
          className="bg-blue-600 hover:bg-blue-700 duration-300 text-white w-full py-3 mt-5"
        />
      ) : (
        <Button
          label="Create"
          onClick={confirm2}
          className="bg-green-600 hover:bg-green-700 duration-300 text-white w-full py-3 mt-5"
        />
      )}

</div>
      </div>
    </>
  );
}
