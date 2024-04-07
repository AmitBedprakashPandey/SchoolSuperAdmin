import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useDispatch } from "react-redux";
import { loginUser } from "../Store/Slice/LoginSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage(params) {
  const [formData, setFormData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!localStorage.getItem("Supertoken")) {
      return navigate("/login");
    }
  }, {});
  const onLogin = () => {
    dispatch(loginUser(formData)).then((doc) => {
      navigate("/");
    });
  };
  return (
    <>
      <Dialog maximized visible={true} showHeader={false}>
        <div className="grid h-full  place-content-center ">
          <div className="grid grid-cols-1 place-content-center p-5 w-96">
           <div className="text-center font-bold text-2xl">
              <h1>Super Admin Login</h1>
            </div>
            <form>
            <span className="p-float-label mt-7">
              <InputText
                id="username"
                name="email"
                value={formData?.email}
                onChange={formHandler}
                className="w-full h-11 p-2 border-gray-300 border"
              />
              <label htmlFor="username">Username </label>
            </span>
            <span className="p-float-label mt-7">
              <Password
                id="username"
                name="pass"
                value={formData?.pass}
                onChange={formHandler}
                inputClassName="pl-3 w-full"
                className="w-full h-11 rounded-md border-gray-300 border"
                toggleMask
                feedback={false}
              />
              <label htmlFor="username">Password</label>
            </span>
            <Button
            type="button"
              label="Login"
              onClick={onLogin}
              className=" w-full bg-cyan-500 text-white py-2 mt-7"
            />
            </form>
          </div>
        </div>
      </Dialog>
    </>
  );
}
