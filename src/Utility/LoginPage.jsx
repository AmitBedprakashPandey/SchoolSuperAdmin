import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Message } from "primereact/message";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Store/Slice/LoginSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeviceValidation from "./DeviceValidation";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", pass: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.Login);

  const formHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!localStorage.getItem("Supertoken")) {
      navigate("/login");
    }
  }, [navigate]);

  const onLogin = (e) => {
    e.preventDefault(); // Prevent form submission
    dispatch(loginUser(formData)).then(() => {
      navigate("/");
    });
  };

  return (
    <Dialog maximized visible={true} showHeader={false}>
      <DeviceValidation />
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex items-center gap-5">
          <div>
            <span className="flex gap-2 font-medium text-3xl">
              Digital Branded<p className="text-blue-500 font-extrabold">School </p>
            </span>
          </div>
        </div>
        <div className="bg-white absolute top-0 right-10 h-full flex items-center w-96">
          <div className="w-full">
            {error && <Message severity="error" text={error} className="w-full" />}
            <div className="text-center font-bold text-2xl">
              <h1>Super Admin</h1>
            </div>
            <form onSubmit={onLogin}>
              <span className="p-float-label mt-7">
                <InputText
                  id="username"
                  name="email"
                  value={formData.email}
                  onChange={formHandler}
                  autoComplete="username"
                  className="w-full h-12 p-2 border-gray-300 border"
                />
                <label htmlFor="username">Username</label>
              </span>
              <span className="p-float-label mt-7">
                <Password
                  id="password"
                  name="pass"
                  value={formData.pass}
                  onChange={formHandler}
                  inputClassName="pl-3 w-full h-12 rounded-md border-gray-300 border"
                  autoComplete="current-password"
                  
                  toggleMask
                  feedback={false}
                />
                <label htmlFor="password">Password</label>
              </span>
              <Button
                type="submit"
                label="Login"
                disabled={!formData.email || !formData.pass}
                className="w-full bg-blue-500 text-white py-3 outline-none mt-7"
              />
            </form>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
