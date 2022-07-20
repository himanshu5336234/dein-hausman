import { Callbacks } from "jquery";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { get, set } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

function Dialog({
  onClose,
  heading,
  message,
  askForARevision,
  acceptTheQuote,
  orderId,
  timeline,
}) {
  const router = useRouter();
  const { proposal, ws, chat } = useSelector((state) => ({
    ws: state.services.ws,
  }));
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const [show, setShow] = useState("block");
  const [hide, setHide] = useState(false);
  const [loader, setloader] = useState();
  const [inboxData, setInbox] = useState({
    amount: value,
    createdBy: JSON.parse(localStorage.user).role.name,
    orderId,
  });
  useEffect(() => {
    setInbox({ ...inboxData, amount: value });
  }, [value]);

  useEffect(() => {
    get(ws.ws, "on", false) &&
      ws.ws.on("getproposals", (data, callbacks) => {
        dispatch({ type: "GET_ORDER" });
        setloader(callbacks);
        console.log(callbacks, "props");
      });
  }, [ws]);

  const handleAskForARevision = () => {
    setloader(true)
    const data = {
      ...inboxData,
      ["status"]: "Revision Request",
    };
    api(data)
    //  dispatch({ type: "UPLOAD_PROPOSALS", inboxData: { ...inboxData,[ "status"]: "Revision Request" } })
    // dispatch({ type: "UPLOAD_PROPOSALS", inboxData })
  };
  function api(data) {
    get(ws.ws, "on", false) &&
      ws.ws.emit("proposals", data, (error, callbacks) => {
        console.log(error, "error");
        console.log(callbacks, "error");
        if(error.success===true){
          setloader(false)
          
          onClose(heading)
        }
      });
  }
  const handleAcceptTheQuotation = () => {
     setloader(true)
    const data = {
      ...inboxData,
      ["status"]: "Quotation Accepted",
    };

    api(data)
    //  dispatch({ type: "UPLOAD_PROPOSALS", inboxData: { ...inboxData, ["status"]: "Quotation Accepted" ,amount:timeline.amount} })
    // // if (JSON.parse(localStorage.user)?.role?.name == "buyer"){
    //   router.push("/paymentgateway")
    // }
  };
  return (
    <>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span className="close" onClick={() => onClose(heading)}>
              &times;
            </span>
          </div>
          <div className="modal-body">
            <div>
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
                  <h5>{timeline.status}</h5>
                  <span> {message} </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                  alignItems: "center",
                }}
              >
                {timeline.amount && (
                  <h1 style={{ color: " #9043C3" }}>{timeline.amount}</h1>
                )}
                {hide && (
                  <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter AMount"
                  />
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                {timeline.status == "Quotation Accepted" || timeline.status == "payment done" ? (<>{JSON.parse(localStorage.user)?.role?.name == "buyer"?(<> <button className="btn-paynow" onClick={() => { router.push({  pathname: `/paymentgateway`, query: { id: orderId }, });}} >  Pay Now </button> </>):(<></>)}</>) : (
                  <>
                    
                    {hide === true ? (<>{askForARevision && ( <>{loader===true?(<><div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div></>):(<><button  style={{  marginRight: "25px",  background: "#9043C3", color: "white" }}onClick= {handleAskForARevision } > Ask For A Revision </button></>)   }</> )} </> ) :
                     (
                      <>
                        { <button style={{ marginRight: "25px", color: "#7E7E7E;", background: "white", }} onClick={() => setHide(true)} >Ask For A Revision</button> }
                        {acceptTheQuote && ( <button onClick={handleAcceptTheQuotation}> Accept The Quote </button>  )}</>
                        )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function QuotationDialog({
  quotationReceived,
  quotationAccepted,
  paymentDone,
  orderCancelled,
  serviceRequest,
  revisionRequest,
  orderId,
  onClose,
}) {
  if (quotationReceived.show) {
    // console.log(quotationReceived.timeline, "Received");

    const message =
      quotationReceived.timeline.createdBy !=
        JSON.parse(localStorage.user).role.name
        ? "User sent you his quotation for the service"
        : "You have sent a quotation for the service";
    return (
      <>
        <Dialog
          orderId={orderId}
          onClose={onClose}
          timeline={quotationReceived.timeline}
          heading={"Quotation Received"}
          message={message}
          askForARevision={true}
          acceptTheQuote={true}
        />
      </>
    );
  }

  return <></>;
}
