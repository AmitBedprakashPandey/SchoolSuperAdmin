import React, { useEffect, useRef, useState } from "react";
import {
  AllTemplateBySchoolStatus,
  CreateTemplate,
  UpdateTemplate,
} from "../Store/Slice/TemplateSlice";
import { Toast } from "primereact/toast";
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
  const formHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    axios
      .get("https://655302f75449cfda0f2dfe0f.mockapi.io/student")
      .then((response) => {
        setStudent(response.data[0]);
      });
    renderTemplate();
  }, [temp]);

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
    let modifiedTemplate = template;
    modifiedTemplate = modifiedTemplate.replace("${name}", student?.name);
    modifiedTemplate = modifiedTemplate.replace("${class}", student?.class);
    modifiedTemplate = modifiedTemplate.replace(
      "${father_name}",
      student?.father_name
    );
    modifiedTemplate = modifiedTemplate.replace("${dob}", student?.dob);
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
    );
  };

  const onUpdate = () => {
    dispatch(
      UpdateTemplate({
        ...formData,
        tempimage: temp,
        status: checked,
        schoolid: data,
      })
    )
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const blob = await fetch(event.target.result).then((res) => res.blob());
        const compressedFile = await compressFile(blob);
        const base64 = await convertToBase64(compressedFile);
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
      {/* <span className="flex flex-col">
        <label>Enter School Id</label>
        <input
          type="text"
          name="schoolid"
          value={formData?.tempimage}
          onChange={formHandler}
          className=""
        ></input>
      </span> */}
      <div dangerouslySetInnerHTML={{ __html: renderTemplate() }}></div>
      <span className="flex flex-col">
        <label>select Icard template</label>
        <input
          type="file"
          name="tempimage"
          value={formData?.tempimage}
          onChange={handleFileChange}
          className=""
        ></input>
      </span>
      <span className="flex flex-col">
        <label>Paste Template</label>
        <textarea
          name="temp"
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="border border-black h-32"
        ></textarea>
      </span>
      <span className="flex items-center gap-3">
        <input
          type="checkbox"
          className="border border-black"
          name="status"
          value={checked}
          onChange={(e) => setChecked(e.target.checked)}
        ></input>
        <label>Paste Template</label>
      </span>
      <span className="flex flex-col">
        <button
          onClick={onSave}
          className="bg-cyan-500 text-white py-3 rounded-lg"
        >
          Create
        </button>
        {/* {formData?.temp && formData?.tempimage ? (
          <button
            onClick={onSave}
            className="bg-cyan-500 text-white py-3 rounded-lg"
          >
            Create
          </button>
        ) : ( */}
        {/* )} */}
      </span>
    </>
  );
};

export default ImageTest;