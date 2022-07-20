import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

const TimelienItem = (props) => {
  const [showInfo, setShowInfo] = useState('');
  const [revisionAmount, setRevisionAmount] = useState('');
  const dispatch = useDispatch()
  const { revision,  revisionLoading } = useSelector(state => ({
    revisionLoading: state.user.revisionLoading,
    revision: state.user.revision,
  }));
console.log(props,"time")
  function userAcceptOffer() {
    let offer = JSON.stringify({
      request: "acceptCustomOffer",
      orderId: get(props, 'orderStatus._id', 0),
      approved: true,
    })
    const data = props.ws.send(offer)
    setShowInfo('')
  }

  useEffect(()=>{
    if(get(revision, 'success', false)){
      dispatch({ type: "RESET_REVISION"})
      setShowInfo('')
      setRevisionAmount('')
    }
  }, [revision])
  

  function askForRivision() {
    dispatch({ type: "ASK_REVISION", payload: {roomID: props.roomId, amount: revisionAmount}})
    // let offer = JSON.stringify({
    //   request: "askForRevision", 
    //   price: revisionAmount, 
    //   orderId: get(props, 'orderStatus._id', 0)
    // })
    // const data = props.ws.send(offer)
    
  }
  console.log("revision=========>", revision)
  function setAmount(e) {
    const re = /^[0-9,\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setRevisionAmount(e.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    }
  }

  function sendQuatation() {
    let offer = JSON.stringify({
      request: "acceptCustomOffer",
      orderId: get(props, 'orderStatus._id', 0)
    })
    const data = props.ws.send(offer)
    setShowInfo('')
    setRevisionAmount('')
  }

  // function askForRivisionHandyman(){
  //   let offer = JSON.stringify({
  //     request: "acceptCustomOffer",
  //     orderId: get(props, 'orderStatus._id', 0)
  //   })
  //   const data = props.ws.send(offer)
  //   setShowInfo('')
  //   setRevisionAmount('')
  // }

  function acceptQuote() {
    let offer = JSON.stringify({
      request: "acceptCustomOffer",
      orderId: get(props, 'orderStatus._id', 0)
    })
    const data = props.ws.send(offer)
    setShowInfo('')
    setRevisionAmount('')
  }

  function declineQuote() {
    let offer = JSON.stringify({
      request: "acceptCustomOffer",
      orderId: get(props, 'orderStatus._id', 0)
    })
    const data = props.ws.send(offer)
    setShowInfo('')
    setRevisionAmount('')
  }
  console.log("setShowInfo", showInfo)
  return (
    <div key={get(props, 'key', '')} className={`timeline-item pb-4 ${props.withLine ? "withLine" : ""}`}>
       <div className="checkbox">
          {Checkbox}
        </div> 
      <h4>{get(props, 'data.data.amount', '').replace(/_/g, ' ')}</h4>
    {/* <h4>{'Quotation received'}</h4>  */}
      <p className="description">
        {get(props, 'data.postedBy.name', 'User')} sent you his quotation for the service.
      </p>

      <div className="d-flex justify-content-between">
        {get(props, 'data.status', '') === "Quotation_Received" ?
          <p className="view" onClick={() => setShowInfo("Quotation received")}>View</p>
          :
          (get(props, 'data.status', '') === "Revision_Request" && get(props, 'data.postedBy.handyman_application', false)) ?
            <p className="view" onClick={() => setShowInfo("Revision received")}>View</p>
            : get(props, 'data.status', '') === "Quotation_Accepted" ?
              <p className="view" onClick={() => setShowInfo("Quotation Accepted")}>View</p>
              :
              get(props, 'data.status', '') === "Payment_Done" ?
                <p className="view" onClick={() => setShowInfo("Payment Done")}>View</p>
                : get(props, 'data.status', '') === "Order_Cancelled" ?
                  <p className="view" onClick={() => setShowInfo("Order Cancelled")}>View</p>
                  : get(props, 'data.status', '') === "Service_Request" ?
                    <p className="view" onClick={() => setShowInfo("Service Request")}>View</p>
                    : (get(props, 'data.status', '') === "Revision_Request" && get(props, 'data.postedBy.handyman_application', true)) ?
                      <p className="view" onClick={() => setShowInfo("Revision Requested")}>View</p>
                      :
                      <p className="view" onClick={() => setShowInfo(get(props, 'data.status', ''))}>View</p>

        }
        <p className="time">12:57pm</p>
      </div>

      {showInfo !== '' && (
        <>
          <div
            className="timeline-backdrop"
            onClick={() => {
              setShowInfo('')
              setRevisionAmount('')
            }}></div>

          <div
            className="timeline-item-info px-6 py-5"
          >
            {showInfo === "Quotation received" ? //done
              <>
                <div className="header d-flex">
                  <div className="image mr-4"></div>
                  <div className="texts">
                    <h4 className="mb-2">Quotation Received</h4>
                    <p className="mb-0 h5">
                    {get(props, 'data.postedBy.name', 'User')} sent you his quotation for the service.
                </p>
                  </div>
                </div>
                <p className="h1 amount mt-4 mb-5">€{get(props, 'data.amount', 0)}</p>
                <div className="buttons d-flex justify-content-center">
                  <button onClick={() => setShowInfo("Revision Request")} className="btn btn-outline-primary mr-2">
                    Ask For Revision
              </button>
                  <button onClick={userAcceptOffer} className="btn btn-outline-primary">
                    Accept The Quote
              </button>
                </div>
              </>
              : showInfo === "Revision Request" ?
                <>
                  <div className="header d-flex">
                    <div className="image mr-4"></div>
                    <div className="texts">
                      <h4 className="mb-2">Revision Request</h4>
                      <p className="mb-0 h5">
                      {get(props, 'data.postedBy.name', 'User')} sent you his quotation for the service.
                      </p>
                    </div>
                  </div>
                  <del><p className="h1 amount mt-4 mb-5">€{get(props, 'data.amount', 0)}</p></del>
                  <input value={revisionAmount} onChange={setAmount} placeholder="€450" />
                  <div className="buttons d-flex justify-content-center">
                    <button onClick={askForRivision} className="btn btn-outline-primary mr-2">
                      Ask For Revision
                    </button>
                  </div>
                </>
                : showInfo === "Revision received" ?
                  <>
                    <div className="header d-flex">
                      <div className="image mr-4"></div>
                      <div className="texts">
                        <h4 className="mb-2">Revision received</h4>
                        <p className="mb-0 h5">
                        {get(props, 'data.postedBy.name', 'User')} sent you his quotation for the service.
                </p>
                      </div>
                    </div>
                    <del><p className="h1 amount mt-4 mb-5">€{get(props, 'data.amount', 0)}</p></del>
                    <p className="h1 amount mt-4 mb-5">€{get(props, 'data.amount', 0)}</p>
                  </>
                  : showInfo === "Quotation Accepted" ?
                    <>
                      <div className="header d-flex">
                        <div className="image mr-4"></div>
                        <div className="texts">
                          <h4 className="mb-2">Quotation Accepted</h4>
                          <p className="mb-0 h5">
                            You accept the quotation send by {get(props, 'data.postedBy.name', 'User')}.
                </p>
                        </div>
                      </div>
                      <p className="h1 amount mt-4 mb-5">€{get(props, 'data.amount', 0)}</p>
                    </>
                    : showInfo === "Payment Done" ?
                      <>
                        <div className="header d-flex">
                          <div className="image mr-4"></div>
                          <div className="texts">
                            <h4 className="mb-2">Payment Done</h4>
                            <p className="mb-0 h5">
                              Your payment to {get(props, 'data.postedBy.name', 'User')} was successful.
                            </p>
                          </div>
                        </div>
                        <p className="h1 amount mt-4 mb-5">€{get(props, 'data.amount', 0)}</p>
                      </>
                      : showInfo === "Order Cancelled" ?
                        <>
                          <div className="header d-flex">
                            <div className="image mr-4"></div>
                            <div className="texts">
                              <h4 className="mb-2">Order Cancelled</h4>
                              <p className="mb-0 h5">
                                You cancelled your service order with Vendor 11234.
                              </p>
                            </div>
                          </div>
                          <p className="h1 amount mt-4 mb-5">€{get(props, 'data.amount', 0)}</p>
                        </>
                        : showInfo === "Service Request" ?
                          <>
                            <div className="header d-flex">
                              <div className="image mr-4"></div>
                              <div className="texts">
                                <h4 className="mb-2">Service Request</h4>
                                <p className="mb-0 h5">
                                  You cancelled your service order with {get(props, 'data.postedBy.name', 'User')}.
                              </p>
                              </div>
                            </div>
                            <input value={revisionAmount} onChange={setAmount} placeholder="€450" />
                            <button onClick={askForRivision} className="btn btn-outline-primary mr-2">
                              Send Quotation
                            </button>
                          </>
                          : showInfo === "Revision Requested" ?
                            <>
                              <div className="header d-flex">
                                <div className="image mr-4"></div>
                                <div className="texts">
                                  <h4 className="mb-2">Revision Requested</h4>
                                  <p className="mb-0 h5">
                                  {get(props, 'data.postedBy.name', 'User')} sent you his quotation for the service.
                      </p>
                                </div>
                              </div>
                              <del><p className="h1 amount mt-4 mb-5">€{get(props, 'data.amount', 0)}</p></del>
                              <input value={revisionAmount} onChange={setAmount} placeholder="€450" />
                              <div className="buttons d-flex justify-content-center">
                                <button onClick={askForRivision} className="btn btn-outline-primary mr-2">
                                  Ask For Revision
                    </button>
                                <button onClick={userAcceptOffer} className="btn btn-outline-primary mr-2">
                                  Accept the Quote
                    </button>
                                <button onClick={declineQuote} className="btn btn-outline-primary mr-2">
                                  Decline the Quote
                    </button>
                              </div>
                            </>
                            :
                            <>
                            <div className="header d-flex">
                              <div className="image mr-4"></div>
                              <div className="texts">
                                <h4 className="mb-2">{showInfo}</h4>
                                {/* <p className="mb-0 h5">
                                  Vendor 11234 sent you his quotation for the service.
                            </p> */}
                              </div>
                            </div>
                            <p className="h1 amount mt-4 mb-5">€{get(props, 'data.amount', 0)}</p>
                          </>
            }
          </div>
        </>
      )}
    </div>
  );
};

const Checkbox = (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    className="timeline-checkbox">
    <rect width="39.8919" height="40" fill="#9043C3" />
    <path
      d="M8.83285 19.4811L8.76257 19.4117L8.6923 19.4811L6.57682 21.5706L6.50479 21.6418L6.57682 21.7129L15.0387 30.0711L15.109 30.1406L15.1793 30.0711L33.312 12.1607L33.384 12.0896L33.312 12.0184L31.1965 9.92885L31.1262 9.85944L31.0559 9.92885L15.109 25.6803L8.83285 19.4811Z"
      fill="white"
      stroke="white"
      strokeWidth="0.2"
    />
  </svg>
);

export default TimelienItem;
