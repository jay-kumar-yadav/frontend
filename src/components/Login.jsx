import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

export const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandel = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/user/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      navigate("/");
      console.log(res);
      dispatch(setAuthUser(res.data))
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
     // dispatch(setAuthUser(res.data));
    }
    setUser({
      username: "",
      password: "",
    });
  };
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-200 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0">
        <h1 className="text-3xl font-bold text-center text-black">Login</h1>
        <form onSubmit={onSubmitHandel} action="">
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
          <p className="text-center text-black my-2">
            Don't Have an account?
            <Link className="text-black " to="/Register">
              Signup
            </Link>
          </p>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border-slate-700"
            >
              login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
