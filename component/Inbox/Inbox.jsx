import React, { useEffect, useState } from "react";
import Image from "next/image";
import { withTranslation } from "../../constent/i18n/i18n";
import { get, set } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import Timeline from "../Timeline/Timeline";
import QuotationDialog from "../QuotationDialog/QuotationDialog";
import { useHistory } from "react-router";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CheckoutForm from "./Pay";
import Chat from "../Chat/Chat";
// const Wrapper = (props) => (
//   <Elements stripe={stripePromise}>
//     <Inbox {...props} />
//   </Elements>
// );
const Inbox = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const { proposal, ws, chat } = useSelector((state) => ({
    ws: state.services.ws,
    proposal: state.services.proposals,
    chat: state.user.chat,
  }));
  const [paybtn, setPaybtn] = useState(true);
  const [timeline, setTimeline] = useState({ state: false, data: [] });
  const [popup, setPopup] = useState(false);
  const [loader, setLoader] = useState(false)
  const [orderID, setOrderId] = useState();
  const [chatopen, setchatopen] = useState(false);
  const [infoDialog, setInfoDialog] = useState({
    quotationReceived: { show: false, timeline: {} },
    quotationAccepted: { show: false, timeline: {} },
    paymentDone: { show: false, timeline: {} },
    orderCancelled: { show: false, timeline: {} },
    serviceRequest: { show: false, timeline: {} },
    revisionRequest: { show: false, timeline: {} },
  });
  const [inboxData, setInbox] = useState({});

  useEffect(() => {
    get(ws.ws, "on", false) &&
      ws.ws.on("getproposals", (data) => {
        dispatch({ type: "GET_ORDER" });
      });
  }, [ws]);


  // get(ws.ws, "on", false) &&
  //     ws.ws.on("gotchat", (data) => {
  //     console.log(orderID,"paa")
  //      dispatch({ type: "GET_CHAT", payload: data });
  //     });
  function getchat(params) {
    console.log(params,"pa")
       dispatch({ type: "GET_CHAT", payload:params })
    // get(ws.ws, "on", false) && ws.ws.emit("getchat", params);
  }
  function getorder(data) {
    if (data.clientStatus == "payment done") {
       getchat(data._id);
      setOrderId(data._id)
      setTimeline({ state: true, data: data.timeline, orderId: data.id });
      setPopup(false);
      setchatopen(true);
    } else if (
      JSON.parse(localStorage.user)?.role?.name == "buyer" &&
      data.clientStatus == "Quotation Accepted"
    ) {
      setPaybtn(!paybtn);
      setTimeline({ state: true, data: data.timeline, orderId: data.id });
      setchatopen(false);
    } else if (
      JSON.parse(localStorage.user)?.role?.name == "seller" &&
      (data.clientStatus == "Quotation Received" ||
        data.clientStatus == "Quotation Accepted" ||
        data.clientStatus == "Revision Request" ||
        data.clientStatus == "payment done")
    ) {
      setTimeline({ state: true, data: data.timeline, orderId: data.id });
    } else if (
      JSON.parse(localStorage.user)?.role?.name == "seller" &&
      data.clientStatus == "Awaiting"
    ) {
      const today = new Date();
      const time = today.getHours() + ":" + today.getMinutes();
      setInbox({
        ...inboxData,
        ["status"]: "Quotation Received",
        ["time"]: time,
        ["orderId"]: data.id,
      });
      setPopup(!popup);
      setchatopen(false);
      setTimeline({ state: false });
    } else if (
      JSON.parse(localStorage.user)?.role?.name == "buyer" &&
      (data.clientStatus == "Quotation Received" ||
        data.clientStatus == "Quotation Accepted" ||
        data.clientStatus == "Revision Request" ||
        data.clientStatus == "payment done")
    ) {
      setTimeline({ state: true, data: data.timeline, orderId: data.id });
      setPopup(false);
      setchatopen(false);
    }
  }

  const closeQuotationDialog = (status) => {
    if (status == "Quotation Received") {
      setInfoDialog({
        ...infoDialog,
        quotationReceived: {
          show: false,
          timeline: infoDialog.quotationReceived.timeline,
        },
      });
    } else 
    if (status == "Quotation Accepted") {
      setInfoDialog({
        ...infoDialog,
        quotationReceived: {
          show: false,
          timeline: infoDialog. quotationAccepted.timeline,
        },
      });
    }
  };
  

  const renderInbox = (user) =>
    get(props, "proposalData.order", []).length &&
    get(props, "proposalData.order", []).map((data, key) => (
      <div key={key}   id={data._id}   onClick={() => getorder(data)}   className="inbox-item" >
        <div className="inbox-photo">
          <img src={   get(data, "users[0].profilePic.url", "") === "" ? "/assets/images/howitwork2.jpg" : data.users.profilePic.url } alt="profile" style={{ width: 52, height: 52 }}/>
        </div>
        <div className="inbox-info">
          <div className="inbox-info-top">
            {/* <p className="inbox-title text-truncate mb-0">{get(data, 'users.description', '')}</p> */}
            <p className="project-status orange-label">
              <span>{data.clientStatus}</span>
            </p>
          </div>
          {/* <p className="project-id mb-0 mt-0">{props.t("projectID")}: {get(data, 'user._id', '')}</p> */}
          <p className="inbox-name">
            {props.proposalData.type == "seller" ? get(data, "buyer.name", "")
              : get(data, "seller.name", "")}
          </p>
        </div>
      </div>
    ));

  return (
    <>
      <div className="inbox">
         <h4 className="text-center mt-4 mb-4">{props.t("inbox.title")}</h4> 

        {renderInbox()}
        <QuotationDialog
          {...infoDialog}
          onClose={closeQuotationDialog}
          orderId={timeline.orderId}
        />
      </div>
      {popup && (
        <>
          <div className="popup">
            <span className="close" onClick={() => setPopup(false)}>
              &times;
            </span>
            <div style={{ display: "flex", alignItem: "center" }}>
              <img
                style={{
                  width: "65px",
                  borderRadius: "40px",
                  marginRight: "30px",
                }}
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOALqcMjby_cOSIr-3GFWRO_zY_j0qcB4zRA&usqp=CAU"
                }
                alt="Image"
              />
              <div>
                <h5>Send Quotation</h5>
              </div>
            </div>

            <div style={{ display: "flex", padding: "20px 0px" }}>
              <input
                type="tel"
                name="amount"
                onChange={(e) => {
                  setInbox({
                    ...inboxData,
                    [e.target.name]: e.target.value,
                    createdBy: JSON.parse(localStorage.user).role.name,
                  });
                }}
                placeholder="$"
              />
              {loader === true ? (<div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>) : <button style={{ display: "block", }} onClick={() => {
                if (inboxData.amount != undefined) {
                  setLoader(true)
                  get(ws.ws, "on", false) && ws.ws.emit("proposals", inboxData, (error) => {
                    if (error.success === true) {
                      setLoader(false)
                      setPopup(false)
                    }

                  })
                }
              }} > Add Quatation</button>}

            </div>
          </div>
        </>
      )}

      <div style={{ padding: "0px 20px", margin:"0px 20px",height:"600px",overflow:"auto" }}>
        {timeline.state &&
          get(props, "proposalData.order", []).map((order) => {
            if (order.id == timeline.orderId) {
              return (
                <>
                  {order.timeline.map((tl) => {
                    return (
                      <>
                        {" "}
                        <div key={Math.random()}>
                          <div key={Math.random()} className="checkbox">
                            <div className="checkbox-line">{Checkbox}</div>

                            <div>
                              <h4>{tl.status}</h4>
                              <p className="description">
                                {get(props, "data.postedBy.name", "User")} sent
                                you his quotation for the service.
                              </p>
                              <div className="d-flex justify-content-between">
                                {tl.status === "Quotation Received" ? (
                                  <p
                                    className="view"
                                    onClick={() =>
                                      setInfoDialog({
                                        ...infoDialog,
                                        quotationReceived: {
                                          show: true,
                                          timeline: tl,
                                        },
                                      })
                                    }
                                  >
                                    View
                                  </p>
                                ) : tl.status === "Revision_Request" &&
                                  get(
                                    props,
                                    "data.postedBy.handyman_application",
                                    false
                                  ) ? (
                                  <p
                                    className="view"
                                    onClick={() =>
                                      setInfoDialog({
                                        ...infoDialog,
                                        quotationReceived: {
                                          show: true,
                                          timeline: tl,
                                        },
                                      })
                                    }
                                  >
                                    View
                                  </p>
                                ) : tl.status === "Quotation Accepted" ? (
                                  <p
                                  className="view"
                                  onClick={() =>
                                    setInfoDialog({
                                      ...infoDialog,
                                      quotationReceived: {
                                        show: true,
                                        timeline: tl,
                                      },
                                    })
                                  }
                                >
                                  View
                                </p>
                                ) : tl.status === "payment done" ? (
                                  <p
                                    className="view"
                                    onClick={() =>
                                      setInfoDialog({
                                        ...infoDialog,
                                        quotationReceived: {
                                          show: true,
                                          timeline: tl,
                                        },
                                      })
                                    }
                                  >
                                    View
                                  </p>
                                ) : tl.status === "Order Cancelled" ? (
                                  <p
                                    className="view"
                                    onClick={() =>
                                      setInfoDialog({
                                        ...infoDialog,
                                        orderCancelled: true,
                                      })
                                    }
                                  >
                                    View
                                  </p>
                                ) : tl.status === "Service Request" ? (
                                  <p
                                    className="view"
                                    onClick={() =>
                                      setShowInfo("Service Request")
                                    }
                                  >
                                    View
                                  </p>
                                ) : tl.status === "Revision Request" &&
                                  get(
                                    props,
                                    "data.postedBy.handyman_application",
                                    true
                                  ) ? (
                                  <p
                                    className="view"
                                    onClick={() =>
                                      setInfoDialog({
                                        ...infoDialog,
                                        quotationReceived: {
                                          show: true,
                                          timeline: tl,
                                        },
                                      })
                                    }
                                  >
                                    View
                                  </p>
                                ) : (
                                  <p
                                    className="view"
                                    onClick={() => setShowInfo(tl.status)}
                                  >
                                    View
                                  </p>
                                )}
                                <p className="time">{tl.time}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              );
            }
          })}

      </div>
      {chatopen && <Chat chat={chat.msg} />}
    </>
  );
};
const Checkbox = (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    className="timeline-checkbox"
  >
    <rect width="39.8919" height="40" fill="#9043C3" />
    <path
      d="M8.83285 19.4811L8.76257 19.4117L8.6923 19.4811L6.57682 21.5706L6.50479 21.6418L6.57682 21.7129L15.0387 30.0711L15.109 30.1406L15.1793 30.0711L33.312 12.1607L33.384 12.0896L33.312 12.0184L31.1965 9.92885L31.1262 9.85944L31.0559 9.92885L15.109 25.6803L8.83285 19.4811Z"
      fill="white"
      stroke="white"
      strokeWidth="0.2"
    />
  </svg>
);
export default withTranslation("common")(Inbox);
