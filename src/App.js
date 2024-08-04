import './App.css';
import { createBrowserRouter ,RouterProvider} from "react-router-dom"
import { Homepage } from './components/Homepage';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { useEffect, useState } from 'react';
import {useSelector,useDispatch} from "react-redux";
import io from "socket.io-client";
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';
import { BASE_URL } from './config'; // Correct path to config.js


const router= createBrowserRouter([
  {
    path:"/",
    element:<Homepage/>
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/Login",
    element:<Login/>
  },
 
])
function App() { 
  const {authUser} = useSelector(store=>store.user);
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(authUser){
      const socketio = io(`${BASE_URL}`, {
          query:{
            userId:authUser._id
          }
      });
      dispatch(setSocket(socketio));

      socketio?.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      });
      return () => socketio.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }

  },[authUser]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router}/>
    </div>

  );
}
export default App;
