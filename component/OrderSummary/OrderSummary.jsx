import { Router } from "../../constent/i18n/i18n";
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { get } from "lodash"
import { useEffect } from "react";

export default function PaymentCard() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { paymentLoding, getCardData, paymentData,orderById, ws } = useSelector(state => ({
    getCardLoading: state.user.getCardLoading,
    getCardData: state.user.getCardData,
    paymentLoding: state.user.paymentLoding,
    paymentData: state.user.paymentData,
    getCardLoading: state.user.getCardLoading, 
    orderById: state.user.orderById,
    ws: state.services.ws,
  }));

  useEffect(()=>{
    dispatch({type:'GET_ORDER_BY_ID',id:get(router, 'query.id', '')})
  },[])
  // console.log(orderById, "ORDER BY ID")

  useEffect(()=>{

  },[orderById])

  useEffect(()=>{
    if(get(paymentData, 'paid', false)){
      router.push(`/paymentgateway-successful?id=${get(router, 'query.id', '')}`)
      dispatch({ type: 'RESET_PAYMENT'})
    }
  }, [paymentData])

  function checkout(){
    alert("nj")
    get(ws.ws, "on", false) &&
    ws.ws.emit("payment",{orderId: get(router, 'query.id', '')}, (error) => {
 
    })
    // dispatch({type: 'CHECKOUT', payload: {orderId: get(router, 'query.id', '') ,token: JSON.parse(localStorage.user).card_id}})
    // // router.push("/paymentgateway-successful")
  }
  
  return (
    <div>
      <h4 className="mt-order">Order Summary</h4>
      <ul className="summary-details">
        <li>
          Service: <span>{orderById?.service?.name}</span>
        </li>
        <li>
          Assigned Handyman: <span>{orderById?.seller?.username}</span>
        </li>
        <li>
          Total: <span>{orderById?.amount}</span>
        </li>
        <li>
          Promotion Applied: <span>0</span>
        </li>
      </ul>
      <div className="seperater"></div>
      <h4>Order Total: <span>{orderById?.amount}</span></h4>

      <button className="btn btnprimary-fill" disabled={paymentLoding} onClick={checkout}>Place Order</button>
    </div>
  );
}
