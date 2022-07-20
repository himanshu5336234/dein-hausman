import Image from "next/image";
import Link from "next/link";
import { withTranslation } from "../../constent/i18n/i18n"

function AboutUs({t}) {
  return (
    <>
    <div className="aboutus">
      <div className="about-flex">
        <div className="about-imglist">
          <ul>
            <li>
                <Image
                  src="/assets/images/aboutus1.png"
                  alt="aboutus photo"
                  layout="intrinsic"
                  height={650}
                  width={410}
                />
            </li>
              <li>
                <Image
                  src="/assets/images/aboutus2.png"
                  alt="aboutus photo"
                  layout="intrinsic"
                  height={650}
                  width={410}
                />
              </li>
              <li>
                <Image
                  src="/assets/images/aboutus3.png"
                  alt="aboutus photo"
                  layout="intrinsic"
                  height={650}
                  width={410}
                />
              </li>
          </ul>
        </div>
        <div className="about-imgtext">
            <h5 className="ml-2">{t('about.title')}</h5>
            <p className="mb-4">
              {t('about.text1')}
              {t('about.text2')}
            </p>
            <Link href="/about"><button className="get-in-touch">{t("about.button")}</button></Link>
        </div>
      </div>
    </div>


    {/* <div className="aboutus">
      <div className="d-flex justify-content-start imgflex">
        <div className="col-lg-3 col-md-4 col-xs-12">
          <Image
            src="/assets/images/spotlight2.jpg"
            alt="aboutus photo"
            layout="intrinsic"
            height={650}
            width={410}
          />
        </div>
        <div className="col-lg-3 col-md-4 col-xs-12">
          <Image
            src="/assets/images/spotlight2.jpg"
            alt="aboutus photo"
            layout="intrinsic"
            height={650}
            width={410}
          />
        </div>
        <div className="col-lg-3 col-md-4 col-xs-12">
          <Image
            src="/assets/images/spotlight2.jpg"
            alt="aboutus photo"
            layout="intrinsic"
            height={650}
            width={410}
          />
        </div>
        <div className="col-lg-3 col-md-12 col-xs-12 pr-10 info">
          <h5 className="ml-2">{t('about.title')}</h5>
          <p className="mb-4">
            {t('about.text1')}
            {t('about.text2')}
          </p>
          <Link href="/about"><button className="get-in-touch">{t("about.button")}</button></Link>
        </div>
      </div>
    </div> */}
    </>
  );
}
export default withTranslation('common')(AboutUs)
