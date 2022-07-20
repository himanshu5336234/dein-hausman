import { withTranslation } from "../../constent/i18n/i18n"

function AboutUsAndContact({t}) {
  return (
    <div className="about-us-and-contact d-flex justify-content-end flexwrap">
      <div className="form-area p-5">
        <h1 className="mb-4">{t("aboutUs.title")}</h1>
        <p className="mb-3 mt-3">
        {t("aboutUs.text1")}
        </p>
        <br />
        <p className="mb-3">
        {t("aboutUs.text2")}
        </p>
        <br />
        <br />
        <h1 className="mb-3">{t("aboutUs.cTitle")}</h1>
        <h3 className="subtitle mb-4">
        {t("aboutUs.cText")}
        </h3>
        <div className="form">
          <div className="d-flex flexwrap">
            <input type="text" className="input large mr-2" placeholder={t("aboutUs.name")} />
            <input type="text" className="input large ml-2" placeholder={t("aboutUs.phone")} />
          </div>
          <div className="d-flex flexwrap">
            <input type="text" className="input large mr-2" placeholder={t("aboutUs.email")} />
            <input type="text" className="input large ml-2" placeholder={t("aboutUs.subject")} />
          </div>
          <textarea
            type="text"
            className="input large"
            placeholder={t("aboutUs.message")}
          />
        </div>
        <div className="button-area text-center">
          <button className="btn btn-primary">{t("aboutUs.btn")}</button>
        </div>
        <div className="or mb-4 d-flex align-items-center justify-content-center">
          <div className="horizontal-line"></div>
          <h4 className="m-3">or</h4>
          <div className="horizontal-line"></div>
        </div>
        <div className="icon-section d-flex align-items-center justify-content-center">
          <div className="m-3">
            <a className="btn facebook ">
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
          <div className="m-3">
            <a className="btn google ">
              <i className="fab fa-google-plus-g"></i>
            </a>
          </div>
          <div className="m-3">
            <a className="btn btn-primary ">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <div className="m-3">
            <a className="btn linkedin ">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="map-area">
        <div className="mapouter">
          <div className="gmap_canvas">
            <iframe
              width="600"
              height="1150"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"></iframe>
            <a href="#"></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withTranslation('common')(AboutUsAndContact)
