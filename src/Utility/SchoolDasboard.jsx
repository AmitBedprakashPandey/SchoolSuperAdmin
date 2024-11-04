import { Calendar } from "primereact/calendar";
import { confirmDialog } from "primereact/confirmdialog";
import { FloatLabel } from "primereact/floatlabel";
import { TabPanel, TabView } from "primereact/tabview";
import ImageTest from "./ImageTest";
import SchoolForm from "./SchoolForm";
import TeacherTab from "./TeacherTab";
import ThirdParty from "./ThirdParty";

import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  SchoolAdminCreate,
  SchoolAdminFind,
  SchoolAdminUpdate,
} from "../Store/Slice/AdminLoginSlice";
import AdmitCardTemplate from "./AdmitCardTemplate";
export default function SchoolDasboard({ data }) {
  const [tabNm,setTabNm] =useState('school');
  return (
    <>
      <TabView panelContainerClassName="dark:text-white dark:bg-slate-700 p-0">
        <TabPanel header={<span onClick={()=>setTabNm('school')} className={`${tabNm === 'school' ?  'border-b-2' : 'border-none' }  border-black dark:border-white pb-0.5 text-xs`}>Update School</span>}>
          <div className="flex justify-center">
          <div className="w-96">
          <SchoolForm label="u" data={data} />
          </div>
          </div>
        </TabPanel>
        <TabPanel header={<span onClick={()=>setTabNm('tracher')} className={`${tabNm === 'tracher' ?  'border-b-2' : 'border-none' } border-black dark:border-white pb-0.5 text-xs`}>Tracher</span>}>
          <TeacherTab schoolid={data} />
        </TabPanel>
        <TabPanel header={<span onClick={()=>setTabNm('Third Party')} className={`${tabNm === 'Third Party' ?  'border-b-2' : 'border-none' } border-black dark:border-white pb-0.5 text-xs`}>Third Party</span>}>
          <ThirdParty data={data} />
        </TabPanel>
        <TabPanel header={<span onClick={()=>setTabNm('Template')} className={`${tabNm === 'Template' ?  'border-b-2' : 'border-none' } border-black dark:border-white pb-0.5 text-xs`}>ICard Template</span>}>
          <ImageTest data={data?._id} />
        </TabPanel>
        <TabPanel header={<span onClick={()=>setTabNm('AdmitCardTemplate')} className={`${tabNm === 'AdmitCardTemplate' ?  'border-b-2' : 'border-none' } border-black dark:border-white pb-0.5 text-xs`}>Admit Card Template</span>}>
          <AdmitCardTemplate data={data?._id} />
        </TabPanel>
        <TabPanel header={<span onClick={()=>setTabNm('admin')} className={`${tabNm === 'admin' ?  'border-b-2' : 'border-none' } border-black dark:border-white pb-0.5 text-xs`}>School Admin</span>}>
          <RegisterForm data={data} />
        </TabPanel>
      </TabView>
    </>
  );
}

const RegisterForm = ({ data }) => {
  const [formData, setFormData] = useState();
  const [checked, setChecked] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const dispatch = useDispatch();

  const formHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useLayoutEffect(() => {
    if (data) {
      dispatch(SchoolAdminFind(data?._id)).then((e) => {
        setChecked(e.payload.data?.status);
        setStartDate(e.payload.data?.startexpired);
        setEndDate(e.payload.data?.expired);
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
    dispatch(
      SchoolAdminUpdate({
        ...formData,
        status: checked,
        expired: endDate,
        startexpired: startDate,
      })
    ).then((doc) => {
      if (doc.payload?.message) {
        dispatch(SchoolAdminFind(data?._id)).then((e) => {
          setChecked(e.payload.data?.status);
          setStartDate(e.payload.data?.startexpired);
          setEndDate(e.payload.data?.expired);
          setFormData(e.payload.data);
        });
        showSuccessToast(doc.payload?.message);
      }
      if (doc.payload?.error) {
        showErrorToast(doc.payload?.error);
      }
    });
  };

  const onRegister = () => {
    dispatch(
      SchoolAdminCreate({
        ...formData,
        status: checked,
        auth: true,
        schoolid: data?._id,
        expired: endDate,
        startexpired: startDate,
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
      accept: onRegister,
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
      accept: onChangeUserPassword,
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="flex justify-center">
      <div className="">
        <form>
          <div className="flex gap-3 w-96">
            <span className="p-float-label mt-7 w-full">
              <InputText
                id="schoolname"
                value={data?.name}
                name="email"
                onChange={formHandler}
                disabled
                className="w-full border-slate-300 dark:bg-slate-700 dark:text-white dark:disabled:text-white border px-2 py-3"
              />
            </span>
          </div>
          <span className="p-float-label mt-7 w-96">
            <InputText
              id="email"
              value={formData?.email}
              autoComplete="email"
              name="email"
              onChange={formHandler}
              className="w-full border-slate-300 dark:bg-slate-700 dark:text-white border px-2 py-3"
            />
            <label htmlFor="email" className="dark:text-white">Username</label>
          </span>
          {formData?.auth ? (
            <>
              <span className="p-float-label mt-7 w-full">
                <InputText
                  id="ogpass"
                  value={formData?.ogpass}
                  name="ogpass"
                  autoComplete="current-password"
                  onChange={formHandler}
                  feedback={false}
                  disabled
                  className="w-full pl-2 dark:bg-slate-700 dark:text-white border-slate-300 border  h-12 rounded-md"
                />
                <label htmlFor="ogpass" className="dark:text-white">Original Password</label>
              </span>
              <span className="p-float-label mt-7">
                <FloatLabel>
                  <Password
                    id="newpass"
                    value={formData?.newpass}
                    name="newpass"
                    autoComplete="new-password"
                    onChange={formHandler}
                    feedback={false}
                    toggleMask
                    inputClassName="pl-3 h-12 w-96 dark:bg-slate-700 dark:text-white"
                    className="border-slate-300 dark:bg-slate-700 dark:text-white border rounded-md"
                  />
                  <label htmlFor="newpass" className="dark:text-white">Enter New Password</label>
                </FloatLabel>
              </span>
            </>
          ) : (
            <span className="p-float-label mt-7 w-full">
              <Password
                id="pass"
                value={formData?.pass}
                name="pass"
                onChange={formHandler}
                feedback={false}
                autoComplete="new-password"
                inputClassName="pl-3 h-12 w-96 dark:bg-slate-700 dark:text-white"
                className="border-slate-300 border dark:bg-slate-700 dark:text-white rounded-md"
                toggleMask
              />
              <label htmlFor="pass" className="dark:text-white">Enter Password</label>
            </span>
          )}
          <div className=" flex gap-3 mt-7 hidden">
            <span className="w-full">
              <FloatLabel>
                <Calendar
                  invalid="start_date"
                  value={startDate}
                  dateFormat="dd/mm/yy"
                  inputClassName="w-full pl-3"
                  onChange={(e) => setStartDate(e.value)}
                  className="w-full border-slate-300 border dark:bg-slate-700 dark:text-white  h-12 rounded-md"
                  showIcon
                />
                <label htmlFor="start_date" className="dark:text-white">Start Expired Date</label>
              </FloatLabel>
            </span>
            <span className="w-full">
              <FloatLabel>
                <Calendar
                  invalid="end_date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.value)}
                  dateFormat="dd/mm/yy"
                  inputClassName="w-full pl-3 dark:bg-slate-700 dark:text-white"
                  className="w-full border-slate-300 border dark:bg-slate-700 dark:text-white  h-12 rounded-md"
                />
                <label htmlFor="end_date" className="dark:text-white">End Expired Date</label>
              </FloatLabel>
            </span>
          </div>
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
        </form>

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
            className="bg-green-600 hover:bg-green-700 duration-300 text-white w-full py-3 mt-5"
          />
        )}
      </div>
      </div>
    </>
  );
};
