import Image from "next/image";
import { withTranslation } from "../../constent/i18n/i18n"
import { useRouter } from 'next/router'
import { get } from "lodash"
function PaymentCard({t}) {
  const router = useRouter()
  return (
    <div className="payment-successful-wrapper">
      <span className="successful-circle">
        <Image
          src="/assets/svg/ic-successful.svg"
          alt="successful"
          width={94}
          height={82}
        />
      </span>
      <h4>{t("paymentSuccess.title")}</h4>
      <h6>{t("paymentSuccess.orderID")}: {get(router, 'query.id', '')}</h6>
      <p>{t("paymentSuccess.text")}</p>
      <button className="btn btnprimary-fill">{t("paymentSuccess.viewBooking")}</button>
      <button className="btn btnprimary-fill">{t("paymentSuccess.downloadInvoice")}</button>
    </div>
  );
}
export default withTranslation('common')(PaymentCard)