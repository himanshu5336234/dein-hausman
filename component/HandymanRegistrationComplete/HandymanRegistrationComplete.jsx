import Image from "next/image";
import Link from "next/link"
import { withTranslation } from "../../constent/i18n/i18n"

function HandymanRegistrationComplete({t}) {
  return (
      <div className="waiting-handyman">
        <div className="waiting-wrapper">
          <div className="waiting-text">
            <h4>{t("registrationComplete.title")}</h4>
            <p>{t("registrationComplete.text")}</p>
          <Link href="/"><button className="btn primarybtn-fill mt-5">{t("registrationComplete.btn")}</button></Link>
          </div>
        </div>
      </div>
  );
}
export default withTranslation('common')(HandymanRegistrationComplete)