import Image from "next/image";
import PaymentCard from "../PaymentCard/PaymentCard";
import { withTranslation } from "../../constent/i18n/i18n"

function HandymanRegistrationPayment({t}) {
  return (
    <div className="profile-management">
      <div className="row">
        <div className="col-md-12">
          <div className="profile-manager m-3">
            <h1 className="mb-3">{t("handyRegis.title")}</h1>
            <p className="mb-5">
            {t("handyRegis.text")}
            </p>
            </div>
        </div>
        </div>
      
      <div className="row">
        <div className="col-lg-3 col-md-12">
          <div className="linked-accounts m-3">
            <div className="col-md-12 mb-5">
              <Image
                src="/assets/images/profile-pic.png"
                alt="testimonial2"
                layout="responsive"
                width={236}
                height={236}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-md-12 profile-manager">
          <h5 className="head-regis">{t("handyRegis.formTitle")}</h5>
            <div className="d-flex flexwrap">
              <div className="small d-flex flex-column">
                <h3 className="label">{t("handyRegis.fName")}</h3>
                <input
                  type="text"
                  className="input mr-3"
                  placeholder="Erika Hans"
                />
              </div>
              <div className="small d-flex flex-column">
                <h3 className="label">{t("handyRegis.cName")}</h3>
                <input
                  type="text"
                  className="input"
                  placeholder="Erika  Home Services Inc."
                />
              </div>
            </div>

            <div className="d-flex flexwrap">
              <div className="small d-flex flex-column">
                <h3 className="label">{t("handyRegis.location")}</h3>
                <input
                  type="text"
                  className="input mr-3"
                  placeholder="Berlin, Germany"
                />
              </div>
            </div>

            <h3 className="label">{t("handyRegis.about")}</h3>
            <textarea type="text" className="textarea large" placeholder="" />

            <h5 className="head-regis mt-5">{t("handyRegis.cDetails")}</h5>
            <div className="d-flex flexwrap">
              <div className="small d-flex flex-column">
              <h3 className="label">{t("handyRegis.phone")}</h3>
                <input
                  type="text"
                  className="input mr-3"
                  placeholder="+49 | 597 - 567 - 1235"
                />
              </div>
              <div className="small d-flex flex-column">
                <h3 className="label">{t("handyRegis.email")}</h3>
                <input
                  type="text"
                  className="input"
                  placeholder="erikahans99@gmail.com"
                />
              </div>
            </div>


            <h5 className="head-regis mt-5">{t("handyRegis.dDetails")}</h5>
              <ul className="upload-list">
                <li>
                  <div className="form-group checkbox-wrapper">
                    <input type="checkbox" id="html" />
                    <label for="html">Work License</label>
                  </div>
                  <div className="remove-btn">Remove</div>
                </li>
                <li>
                  <div className="form-group checkbox-wrapper">
                    <input type="checkbox" id="html" />
                    <label for="html">Taxation Identity Card</label>
                  </div>
                  <div className="remove-btn">Remove</div>
                </li>
                <li>
                  <div className="form-group checkbox-wrapper">
                    <input type="checkbox" id="html" />
                    <label for="html">Certificate 1 (optional)</label>
                  </div>
                  <div className="remove-btn">Remove</div>
                </li>
                <li>
                  <div className="form-group checkbox-wrapper">
                    <input type="checkbox" id="html" />
                    <label for="html">Certificate 2 (optional)</label>
                  </div>
                  <div className="remove-btn">Remove</div>
                </li>
              </ul>
              <a href="" className="addmore-btn">Add More</a>

              
            <PaymentCard />
          <button className="btn primarybtn-fill mt-5">{t("handyRegis.SaveBtn")}</button>
          </div>
        </div>
      </div>

  );
}
export default withTranslation('common')(HandymanRegistrationPayment)