import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { BASE_URL } from "../config.js";

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser?._id) return; // Early return if no selectedUser

      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${BASE_URL}/api/v1/message/${selectedUser._id}`);
        console.log(res);
        dispatch(setMessages(res.data));

      } catch (error) {
        console.error('Failed to fetch messages:', error); // Improved error logging
      }
    };

    fetchMessages();
  }, [selectedUser?._id, dispatch]); // Only re-run when selectedUser._id changes
};

export default useGetMessages;
