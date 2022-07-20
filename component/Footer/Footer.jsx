import { useEffect, useState } from "react"
import Image from "next/image";
import Link from 'next/link'
import { withTranslation } from "../../constent/i18n/i18n"
import { get } from "lodash"
import moment from "moment";
function Footer({ t, ws }) {
    const [ quotationNotification, setQuaNotification ] = useState(false)
    const [ message, setMessage ] = useState('')
    const [ buyerID, setBuyerID ] = useState('')
    useEffect(() => {
        if('addEventListener' in ws){
            console.log("event calling")
        ws.addEventListener('message', function (event) {
            let message = JSON.parse(event.data);
            console.log("event", message) 
            if (get(message, 'request', '') === "notificationReceived") {
                setQuaNotification(true)
                setMessage(get(message, 'message', ''))
                setBuyerID(get(message, 'from.fname', ''))
                setTimeout(() => {
                    setQuaNotification(false)
                    setMessage('')
                    setBuyerID('')
                }, 5000)
            }
        })
    }
    }, [ws])
    return (
        <div>
            <div className='footer d-flex flex-column'>
                <div className="container">
                    <div className="row marg170">
                        <div className="col-md-12">
                            <div className="left-sec">
                                <Image
                                    src="/assets/svg/logo-white.svg"
                                    alt="company logo"
                                    width={276}
                                    height={75}
                                />
                                <h3>{t("footer.text")}</h3>
                            </div>
                            <div className="right-sec">
                                <ul>
                                    <li>
                                        <h5>{t("footer.services")}</h5>
                                        <a href="">{t("footer.cleaning")}</a>
                                        <a href="">{t("footer.electronic")}</a>
                                        <a href="">{t("footer.restoration")}</a>
                                        <a href="">{t("footer.computerSetup")}</a>
                                        <a href="">{t("footer.otherServices")}</a>
                                    </li>
                                    <li>
                                        <h5>{t("footer.followUs")}</h5>
                                        <a href="">{t("footer.facebook")}</a>
                                        <a href="">{t("footer.twitter")}</a>
                                        <a href="">{t("footer.instagram")}</a>
                                        <a href="">{t("footer.linkedln")}</a>
                                    </li>
                                    <li>
                                        <h5>{t("footer.contactUs")}</h5>
                                        <a href="">contact@deinhausman.de</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* footer payment */}
                    {/* <div className="row">
                    <div className="col-md-12 footer-success">
                        <h4>Can We Help You?</h4>
                        <h5>Check Out Our <a href="">Help Pages</a> or <a href="">Contact Us 24/7</a> </h5>
                    </div>
                </div> */}
                    {/* footer payment */}
                    <div className="row">
                        <div className="col-md-12 footer-btm">
                            <div className="left-sec">
                                <p>{t("footer.copyRights")}</p>
                            </div>
                            <div className="right-sec">
                                <a href="">{t("footer.claim")}</a>
                                <a href="">{t("footer.privacy")}</a>
                                <a href="">{t("footer.terms")}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={quotationNotification ? "payment-succes" : "payment-succes payment-hide"}>
                <span className="profilepic">
                    <Image
                        src="/assets/images/profile-pic.png"
                        alt="clean-service"
                        width={100}
                        height={100}
                    />
                </span>
                {buyerID !== '' &&
                    <h1>{buyerID}</h1>
                }
                <h6>{message}</h6>
                <p>{moment().format('hh:mm A')}</p>
            </div>
        </div>
    );
}

export default withTranslation('common')(Footer)