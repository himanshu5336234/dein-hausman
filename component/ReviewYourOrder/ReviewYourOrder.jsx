import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react" 
import { get } from "lodash"
import { useRouter } from 'next/router'
import Link from "next/link";

export default function PaymentCard() {
  const router = useRouter()
  const dispatch = useDispatch()
  useEffect(()=>{
    // dispatch({ type: "GET_CARD", payload: {orderId: get(router, 'query.id', '')}})
  },[])
  const { getCardLoading, getCardData } = useSelector(state => ({
    getCardLoading: state.user.getCardLoading,
    getCardData: state.user.getCardData,
  }));
  // console.log("getCardLoading", getCardData)
  return (
    <div>
      <h3>Review Your Order</h3>
      <div className="review-box">
        <ul className="review-box-list">
          {/* <li>
            <h4>Shipping Address</h4>
            <div className="anchor-tag">
              <a href="">Change</a>
              <a href="">Add Delivery Instructions</a>
            </div>
            <p>Erika Hans</p>
            <p>Fugger Strasse 63</p>
            <p>Rheinland, Germany</p>
            <p className="mt-3">Phone: +49 0261 59 65</p>
          </li> */}

          <li>
            <h4>Payment Method</h4>
            <div className="anchor-tag">
              <Link href={`paymentgateway?id=${get(router, 'query.id', '')}`}>Change</Link>
            </div>
            <p>{get(getCardData, `cards.data[${get(getCardData, 'cards.data', []).length - 1}].funding`, 'Credit')} Card Ending <b>{get(getCardData, `cards.data[${get(getCardData, 'cards.data', []).length - 1}].last4`, '')}</b></p>
          </li>

          <li>
            <h4>Gift Cards/Vouchers</h4>
            <input type="text" placeholder="Enter Code" />
          </li>
        </ul>

        


      
      {/* <div className="form-group mt-5 mb-5 checkbox-wrapper">
        <input type="checkbox" id="html" />
        <label for="html">Make these my default delivery options in the future</label>
      </div> */}
      </div>
    </div>
  );
}
