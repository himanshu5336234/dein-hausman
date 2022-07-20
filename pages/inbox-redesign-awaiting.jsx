import { useEffect, useState } from "react";
import { Layout, Footer } from "../component";
import {
  Inbox,
  Chat,
  Timeline,
  TimelineItem,
  TimelineOrder,
} from "../component";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";

export default function InboxWidePage(props) {
  const [user, setUser] = useState({});
  const [tim, setTim] = useState(false);
  const [selectedChatId, setId] = useState("");
  const dispatch = useDispatch();
  const {
    inbox,
    inboxLoading,
    chatLoading,
    quotations,
    chat,
    messageLoading,
    messages,
    proposalData,
    proposal

  } = useSelector((state) => ({
    inbox: state.user.inbox,
    inboxLoading: state.user.inboxLoading,
    chatLoading: state.user.chatLoading,
    chat: state.user.chat,
    messageLoading: state.user.messageLoading,
    messages: state.user.messages,
    quotations: state.user.quotations,
    quotationsLoading: state.user.quotationsLoading,
    proposalData: state.user.orders,
    proposal: state.services.proposals
  }));



  function onSelectChat(id, mainID, chatUser) {
    setId(mainID);
    setUser(chatUser);
    if ("addEventListener" in props.ws) {
      props.ws.addEventListener("message", function (event) {
        let message = JSON.parse(event.data);
        if (event.request === "notificationReceived") {
          // dispatch({ type: "GET_INBOX" })
          dispatch({ type: "GET_ORDER" });
        }
      });
    }
  }

  function getOrderStatus() {
    if (selectedChatId !== "") {
 
      const index = inbox.findIndex((x) => x._id === selectedChatId);
      return inbox[index];
    }
    return false;
  }
  useEffect(() => {
 
    dispatch({ type: "GET_ORDER" });
   
  }, [quotations]);


 
  return (
    <Layout setWebSoket={props.setWebSoket}>
      {inboxLoading && (
        <div className="loading-wrapper">
          <div className="loader"></div>
        </div>
      )}
      <div className="inbox-wide-page">
        <div className="container">
          <div className="row">
            <div className=" " style={{display:"flex"}}>
              <Inbox
                onSelectChat={onSelectChat}
                ws={props.ws}
                inbox={inbox}
                proposalData={proposalData}
                proposal={proposal}
              />
            </div>
            {/* <div className="col-lg-4 col-md-12">

               {tim === true ? (<><Timeline data={proposalData} /></>) : null} 
            </div> */}
            {/* <div style={{width:"30%"}}>
              {chat.success===true? (
                <Chat
                  onSelectChat={onSelectChat}
                  roomId={chat.roomID}
                  chat={chat.msg}
                  ws={props.ws}
                  user={user}
                />
              ) : (
                <></>
              )}
            </div> */}
          </div>
        </div>
        <div className="home-section-padding">
          <Footer ws={props.ws} />
        </div>
      </div>
    </Layout>
  );
}
