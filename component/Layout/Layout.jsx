import Head from "next/head";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
export default function Layout(props) {
  const WEB_SOCKET = "http://localhost:1337";
  const [ws, setWs] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token !== null && token) {
      const sData = io(WEB_SOCKET, {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: "Bearer" + " " + token,
            },
          },
        },
      });
      console.log("testing socket", sData);
      setWs(sData);
    }
  }, []);

  useEffect(() => {
    console.log("testing socket", ws);
    dispatch({ type: "CONNECT_WS", ws });
  }, [ws]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar ws={props.ws} setWebSoket={props.setWebSoket} />
      {props.children}
    </div>
  );
}
