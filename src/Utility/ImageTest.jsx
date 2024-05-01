import React, { useEffect, useRef, useState } from "react";
import {
  AllTemplate,
  CreateTemplate,
  UpdateTemplate,
} from "../Store/Slice/TemplateSlice";
import { Toast } from "primereact/toast";
import { Checkbox } from "primereact/checkbox";
import { FileUpload } from "primereact/fileupload";
import Compressor from "compressorjs";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const ImageTest = ({ data }) => {
  const [formData, setFormData] = useState();
  const [checked, setChecked] = useState(false);
  const [template, setTemplate] = useState(``);
  const [TemplateText, setTemplateText] = useState(``);
  const [student, setStudent] = useState(``);
  const [temp, setTemp] = useState();
  const dispatch = useDispatch();
  const toast = useRef();
  const { Templates } = useSelector((state) => state.Templete);
  const formHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    axios
      .get("https://655302f75449cfda0f2dfe0f.mockapi.io/student")
      .then((response) => {
        setStudent(response.data[0]);
      });
    dispatch(AllTemplate(data)).then((doc) => {
      setTemplate(doc.payload[0]?.temp);
      setFormData(doc.payload[0]);
      setTemp(doc.payload[0]?.tempimage);
      setChecked(doc.payload[0]?.status);
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(AllTemplate(data)).then((doc) => {
      setTemplate(doc.payload[0]?.temp);
      setFormData(doc.payload[0]);
      setTemp(doc.payload[0]?.tempimage);
      setChecked(doc.payload[0]?.status);
    });
  }, [dispatch]);


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

  // Replace placeholders in template with student data
  const renderTemplate = () => {
    let modifiedTemplate = template || "";
    modifiedTemplate = modifiedTemplate.replace("${name}", student?.name);
    modifiedTemplate = modifiedTemplate.replace("${class}", student?.class);
    modifiedTemplate = modifiedTemplate.replace("${father_name}",student?.father_name);
    modifiedTemplate = modifiedTemplate.replace("${dob}", student?.dob);
    modifiedTemplate = modifiedTemplate.replace("${transport}",student?.transport);
    modifiedTemplate = modifiedTemplate.replace("${mothername}",student?.mothername);
    modifiedTemplate = modifiedTemplate.replace("${rollno}", student?.rollno);
    modifiedTemplate = modifiedTemplate.replace("${remark}", student?.remark);
    modifiedTemplate = modifiedTemplate.replace("${mobile}", student?.mobile);
    modifiedTemplate = modifiedTemplate.replace("${address}", student?.address);
    modifiedTemplate = modifiedTemplate.replace("${PuchSheelIcard}", temp);
    return modifiedTemplate;
  };

  const onSave = () => {
    dispatch(
      CreateTemplate({
        ...formData,
        tempimage: temp,
        status: checked,
        temp: template,
        schoolid: data,
      })
    ).then((e) => showSuccessToast(e.payload?.message));
  };

  const onUpdate = () => {
    dispatch(
      UpdateTemplate({
        ...formData,
        tempimage: temp,
        status: checked,
        temp: template,
        schoolid: data,
      })
    ).then((e) => showSuccessToast(e.payload?.message));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const blob = await fetch(event.target.result).then((res) => res.blob());
        const compressedFile = await compressFile(blob);
        const base64 = await convertToBase64(compressedFile);
        console.log(base64);
        setTemp("data:image/png;base64," + base64); // Prepend data URI prefix
      };
      reader.readAsDataURL(file);
    }
  };

  const compressFile = async (fileData) => {
    return new Promise((resolve, reject) => {
      new Compressor(fileData, {
        // maxWidth: 800, // Change this as per your requirements
        // maxHeight: 600, // Change this as per your requirements
        quality: 0.8, // Change this as per your requirements
        success(result) {
          resolve(result);
        },
        error(error) {
          reject(error);
        },
      });
    });
  };

  const convertToBase64 = (fileData) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(fileData);
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <div dangerouslySetInnerHTML={{ __html: renderTemplate() }}></div>
      <span className="flex items-center gap-3">
        <label className="capitalize font-medium">select Icard template</label>
        <input type="file" onChange={handleFileChange} accept="image/*" />
      </span>
      <span className="flex flex-col gap-3">
        <label className="capitalize font-medium">Paste Template</label>
        <textarea
          name="temp"
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="border border-black h-32"
        ></textarea>
      </span>
      <span className="flex items-center gap-3 my-3">
        <Checkbox
          type="checkbox"
          className="outline outline-1 rounded-md"
          name="status"
          onChange={(e) => setChecked(e.checked)}
          checked={checked}
        ></Checkbox>
        <label className="capitalize font-medium">Active Template</label>
      </span>
      <span className="flex flex-col">
        {!Templates[0] ? (
          <button
            onClick={onSave}
            className="bg-cyan-500 text-white py-3 rounded-lg"
          >
            Create
          </button>
        ) : (
          <button
            onClick={onUpdate}
            className="bg-cyan-500 text-white py-3 rounded-lg"
          >
            Update
          </button>
        )}
      </span>
    </>
  );
};

export default ImageTest;
