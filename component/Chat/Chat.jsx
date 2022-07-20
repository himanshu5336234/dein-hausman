import React, { useEffect, useState } from "react";
import { Button, MessageList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import cookieCutter from "cookie-cutter";
import * as moment from "moment-timezone";
const { NEXT_PUBLIC_WEB_SOCKET } = process.env;
const HOST = NEXT_PUBLIC_WEB_SOCKET;

const Chat = (props) => {
  const dispatch = useDispatch();
  const [Chat, setChat] = useState([]);
  const [msg, setMsg] = useState([])
  const [message, setMessage] = useState([]);
  const { user, ws, chat } = useSelector((state) => ({
    user: state.user.user,
    ws: state.services.ws,
    chat: state.user.chat
  }));

  get(ws.ws, "on", false) && ws.ws.on("gotchat", (payload) => {
    const newMess = {
      position:
        get(payload.msg, "postedBy", "") === get(user, "_id", "") ? "right" : "left",
      type: "text",
      text: get(payload.msg, "messages", ""),
      date: get(payload.msg, "createdAt", ""),
    }
    setChat([...Chat, newMess])
    let el = document.getElementById("chat-box")
    el.scrollTop = el.scrollHeight;
  })

  useEffect(() => {
    const newMessage = [];
    get(chat, "msg[0].messages", []).map((data) => {
      newMessage.push({
        position:
          get(data, "postedBy", "") === get(user, "_id", "") ? "right" : "left",
        type: "text",
        text: get(data, "messages", ""),
        date: get(data, "createdAt", ""),
      });
    });
    setChat(newMessage);

  }, [chat]);

  function onSend() {
    if (message != "") {
      let payload = {
        message,
        postedBy: get(user, "id", ""),
        order: get(props, "chat[0].order._id", ""),
        createdAt: new Date().toLocaleTimeString(),
      };
      setMsg(payload)
      get(ws.ws, "on", false) && ws.ws.emit("sendMessage", payload);
      setMessage("");
      // let el = document.getElementById("chat-box")
      // el.scrollTop = el.scrollHeight;
      // someElement.= someElement.scrollHeight
    }

  }


  return (
    <div className="chat">
      <div className="chat-header">
        <div className="d-flex align-items-center mb-2">
          <div className="online"></div>
          <h4>{get(props, "user.description", "")}</h4>
          <p className="name">- {get(props, "chat[0].seller.username", "")}</p>
        </div>
        <p className="h6 mb-0">
          {get(props, "chat[0].message.user.status", "")} | Local Time{" "}
          {moment
            .tz(get(props, "chat.message.user.country", ""))
            .format("HH:MMA, MMM DD")}
        </p>
      </div>
      <hr className="line" />
      <div id="chat-box" style={{ height: "440px", overflow: "auto" }} cl assName="chat-box">
        {/* <div className="chatbox-empty"> */}
        <MessageList
          className="message-list"
          // lockable={true}
          toBottomHeight={"100%"}
          dataSource={Chat}
        />
        {/* <p>
            Your request for a quotation for <a href="">Moving Out Services</a> has been sent to <a href="">user1234</a>. You will be 
            notified when the handyman confirms the booking.
          </p> */}
        {/* </div> */}
      </div>
      <div className="chat-footer d-flex justify-content-center align-items-center">
        {ATTACHMENT_ICON}
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Type A Message Here"
        />
        <p style={{ cursor: "pointer" }} onClick={onSend} className="h6 mb-0">
          Send
        </p>
      </div>
    </div>
  );
};

const ATTACHMENT_ICON = (
  <svg
    width="24"
    height="22"
    viewBox="0 0 24 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mr-2"
  >
    <path
      d="M22.7929 2.08606L21.914 1.20705C20.3046 -0.402341 17.6953 -0.402341 16.0859 1.207C16.0859 1.207 16.0859 1.207 16.0859 1.20705L4.85366 12.4392C3.71565 13.5772 3.71565 15.4223 4.85366 16.5603L5.43965 17.1463C6.5988 18.2321 8.4016 18.2321 9.56074 17.1463L17.8539 8.8532C18.0525 8.66133 18.058 8.34483 17.8662 8.14617C17.6743 7.94756 17.3578 7.94207 17.1591 8.13389C17.155 8.13792 17.1509 8.142 17.1468 8.14617L8.85371 16.4393C8.09207 17.152 6.90832 17.152 6.14668 16.4393L5.56069 15.8533C4.81316 15.1059 4.81306 13.894 5.5605 13.1465C5.56054 13.1464 5.56064 13.1463 5.56069 13.1463L16.7928 1.91403C18.0288 0.736882 19.971 0.736882 21.2069 1.91403L22.0859 2.79304C23.3044 4.01214 23.3044 5.98801 22.0859 7.20711L9.56069 19.7323C7.87021 21.4222 5.13008 21.4222 3.4396 19.7323L2.26757 18.5613C0.577692 16.8708 0.577692 14.1307 2.26757 12.4402L11.8538 2.85408C12.0524 2.66221 12.0579 2.34571 11.866 2.14705C11.6742 1.94843 11.3577 1.9429 11.159 2.13477C11.1548 2.1388 11.1508 2.14288 11.1467 2.14705L1.56058 11.7322C-0.520187 13.8129 -0.520187 17.1865 1.56054 19.2673C1.56054 19.2673 1.56058 19.2673 1.56058 19.2673L2.73262 20.4394C4.81334 22.5201 8.1869 22.5202 10.2677 20.4394C10.2677 20.4394 10.2677 20.4394 10.2677 20.4394L22.7929 7.91413C24.4023 6.30479 24.4024 3.69545 22.7929 2.08606C22.793 2.08606 22.793 2.08606 22.7929 2.08606Z"
      fill="#252525"
    />
    <path
      d="M6.49971 22.0004C5.08575 22.0035 3.72917 21.4415 2.73165 20.4394L1.5606 19.2683C-0.520169 17.1876 -0.520216 13.8141 1.56055 11.7333L1.5606 11.7332L11.1468 2.14705C11.3387 1.94843 11.6552 1.9429 11.8538 2.13477C12.0524 2.32663 12.058 2.64313 11.8661 2.84179C11.8621 2.84597 11.858 2.85004 11.8538 2.85408L2.26763 12.4392C0.577756 14.1297 0.577756 16.8699 2.26763 18.5603L3.43966 19.7324C5.13014 21.4222 7.87027 21.4222 9.56075 19.7324L22.086 7.20715C23.3044 5.98805 23.3044 4.01219 22.086 2.79309L21.2069 1.91407C19.971 0.736929 18.0288 0.736929 16.7929 1.91407L5.56065 13.1462C4.81312 13.8937 4.81303 15.1055 5.56046 15.8531C5.56051 15.8531 5.5606 15.8532 5.56065 15.8533L6.14665 16.4393C6.90828 17.1519 8.09204 17.1519 8.85367 16.4393L17.1468 8.14612C17.3387 7.94751 17.6552 7.94198 17.8538 8.13384C18.0524 8.3257 18.0579 8.64221 17.8661 8.84087C17.8621 8.84504 17.858 8.84912 17.8538 8.85315L9.56075 17.1463C8.4016 18.2321 6.59881 18.2321 5.43966 17.1463L4.85367 16.5603C3.71567 15.4223 3.71567 13.5772 4.85367 12.4392L16.0859 1.20705C17.6952 -0.402341 20.3045 -0.402341 21.9139 1.207C21.9139 1.207 21.9139 1.207 21.914 1.20705L22.793 2.08606C24.4024 3.69545 24.4024 6.30475 22.793 7.91413C22.793 7.91413 22.793 7.91413 22.793 7.91418L10.2678 20.4394C9.27026 21.4415 7.91367 22.0035 6.49971 22.0004Z"
      fill="#252525"
    />
  </svg>
);

export default Chat;
