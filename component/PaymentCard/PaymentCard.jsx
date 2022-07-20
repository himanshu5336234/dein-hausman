import { withTranslation } from "../../constent/i18n/i18n"
import { useState, useEffect } from "react"
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux'
import { get } from "lodash"
import { useRouter } from 'next/router'

function PaymentCard({ t, type = '', edit = false, changePayment }) {
  const dispatch = useDispatch()
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter()  

  const [paymentMethod, setPaymentMethod] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    // router.push('/paymentgateway-successful')
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    stripe.createToken(cardElement).then(function (result) {
      if (get(result, 'token.id', false)) {
          dispatch({ type: "DO_PAYMENT", payload: { token: result.token.id,userId: JSON.parse(localStorage.user).id } })
      }
    });
  }

  const { cardLoding, cardData } = useSelector(state => ({
    cardLoding: state.user.cardLoding,
    cardData: state.user.cardData,
  }));

  useEffect(() => {
    if (edit) {
      if(get(cardData, 'success', false)){
        changePayment(false)
        dispatch({type: "RESET_CARD"})
        dispatch({type: "GET_CARD"})
      }
      
    }
  }, [cardData])

  return (
    <div className="payment-card p-5 mt-4">
      <div className="d-flex flex-column paymentimg">
        <div className="d-flex align-items-center">
          <input
            type="radio"
            onChange={(e) => setPaymentMethod('card')}
            checked={paymentMethod === 'card'}
            className="card input mr-3"
            name="payment"
            value="Debit/Credit/ATM"
          />
          <h3 className="label">{t("payment.card")}</h3>
        </div>
        <img
          src="https://www.diversifiedpondsupplies.com/images/2020/03/31/payment-methods__1003x131.png"
          height="50px"
          width="450px"
        />
        {paymentMethod === 'card' &&
          <form onSubmit={handleSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    padding: '10px',
                    fontSize: '20px',
                    color: '#252525',
                    '::placeholder': {
                      color: '#cccccc',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
            {edit ?
              <button className="btn btn-primary-rd" type="submit" disabled={cardLoding}>Update</button>
              :
              <button className="btn btn-primary-rd" type="submit" disabled={cardLoding}>Add</button>
            }
          </form>
        }
      </div>
      <br />
      {/* <div className="d-flex flex-column">
        <div className="d-flex align-items-center">
          <input
            type="radio"
            onChange={(e) => setPaymentMethod('Net Banking')}
            checked={paymentMethod === 'Net Banking'}
            className="net-banking input mr-3"
            name="payment"
            value="Net Banking"
          />
          <h3 className="label">{t("payment.netBanking")}</h3>
        </div>
        <select name="bank" className="bank ml-4">
          <option value="" selected disabled hidden>
            {t("payment.chooseBank")}
          </option>
          <option value="swiss">Swiss Bank</option>
          <option value="Bank2">Bank2</option>
          <option value="Bank3">Bank3</option>
        </select>
      </div>
      <br />
      <div className="d-flex flex-column">
        <div className="d-flex align-items-center">
          <input
            type="radio"
            onChange={(e) => setPaymentMethod('upi')}
            checked={paymentMethod === 'upi'}
            className="UPI input mr-3"
            name="payment"
            value="UPI"
          />
          <h3 className="label">{t("payment.upi")}</h3>
        </div>
        <input
          type="text"
          className="bank-upi ml-4"
          placeholder="Example: erikahans@okhdfcbank"
        />
      </div>
      <br />
      <div className="d-flex flex-column">
        <div className="d-flex align-items-center">
          <input
            type="radio"
            onChange={(e) => setPaymentMethod('netBanking')}
            checked={paymentMethod === 'netBanking'}
            className="net-banking input mr-3"
            name="payment"
            value="Net Banking"
          />
          <h3 className="label">{t("payment.netBanking")}</h3>
        </div>
        <select name="bank" className="bank ml-4">
          <option value="" selected disabled hidden>
            {t("payment.selectCard")}
          </option>
          <option value="swiss">Swiss Bank</option>
          <option value="Bank2">Bank2</option>
          <option value="Bank3">Bank3</option>
        </select>
      </div> */}
    </div>
  );
}
export default withTranslation('common')(PaymentCard)