import React from "react";
import TimelineItem from "./../TimelineItem/TimelineItem";
import { get } from "lodash"
import { useRouter } from 'next/router'

const Timeline = (props) => {
 const router = useRouter()

  return (
    <>
    <div className="timeline">
      <p className="timeline-title mb-5">Saturday, 23 February </p>
      {get(props, 'data.data', []).map((data, key)=>(
          <TimelineItem withLine data={data} key={key} {...props}/>
      ))  
      }
      
       {/* <TimelineItem withLine /> */}
      {/* <TimelineItem /> */} 
    </div>
    <button className="btn-paynow" onClick={()=> router.push(`/paymentgateway?id=${get(props, 'orderStatus._id', '')}`)}>Pay Now</button>
    </>
  );
};

export default Timeline;
