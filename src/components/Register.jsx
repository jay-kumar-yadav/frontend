import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


export const Register = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate =useNavigate();
  const handlecheckbox = (gender) => {
    setUser({ ...user, gender });
  };
  const onSubmitHandel = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
          navigate("/login");
        toast.success(res.data.message);
      };
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-200 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0">
        <h1 className="text-3xl font-bold text-center text-black">Signup</h1>
        <form onSubmit={onSubmitHandel} action="">
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">Fullname</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Fullname"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="username"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="password"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">
                confirmPassword
              </span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="ConfirmPassword"
            />
          </div>
          <div className="flex items-center my-4">
            <div className="flex items-center">
              <p className="text-black">Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => {
                  handlecheckbox("male");
                }}
                defaultChecked
                className="checkbox mx-2"
              />
            </div>
            <div className="flex items-center">
              <p className="text-black">Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => {
                  handlecheckbox("female");
                }}
                defaultChecked
                className="checkbox mx-2 "
              />
            </div>
          </div>
          <p className="text-center text-black my-2">
            Already Have an account?
            <Link className="text-black " to="/login">
              Login
            </Link>
          </p>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border-slate-700"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
