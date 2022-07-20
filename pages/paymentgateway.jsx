import { useEffect, useState }from "react"
import { Layout, Footer, PaymentCard } from "../component";
import { Elements, CardElement } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { get } from "lodash";
const { NEXT_PUBLIC_STRIP_KEY } = process.env
const stripePromise = loadStripe("pk_test_51KyKExSGgexb5Zed8GoboejOalyxeESSoWsWTOLHPJ6N0QEuspgA84dZ8gkihdRDz8N4l3jZ61KG04VN7mqG8o9C00NYX2OUwT");


export default function Category(props) {

  const router = useRouter()
  const dispatch = useDispatch()
  const [ nextButton, setStatus] = useState(false)
  const { cardLoding, cardData } = useSelector(state => ({
    cardLoding: state.user.cardLoding,
    cardData: state.user.cardData,
  }));

  useEffect(()=>{
    console.log("cardData", cardData)
    if(get(cardData, 'success', false)){
      router.push(`/paymentgateway-order?id=${get(router, 'query.id', '')}`)
      dispatch({type: "RESET_CARD"})
    }
  }, [cardData])
  return (
    <Layout setWebSoket={props.setWebSoket}>
      <div className="category">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-12">
              <div className="continue-section">
                <h3 className="label">Select A Payment Method</h3>
                <Elements stripe={stripePromise}>
                  <PaymentCard type={'user'} />
                </Elements>
              </div>
            </div>
            <div className="col-lg-3 col-md-12 continue-section-padding">
              <button onClick={()=> router.push(`/paymentgateway-order?id=${get(router, 'query.id', '')}`)} className="btn btn-primary-rd mb-4">Continue Your Payment</button>
              <p>You will be able to review your order beforeyou are taken to the  payment gateway.</p>
            </div>
          </div>
        </div>
        <div className="home-section-padding">
          <Footer ws={props.ws}/>
        </div>
      </div>
    </Layout>
  );
}
