import Image from "next/image";
import Link from "next/link";
import { withTranslation } from "../../constent/i18n/i18n"
import { useDispatch, useSelector } from 'react-redux'
import { get } from "lodash";

function ClientDashboard({t}) {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => ({
    userData: state.user.user,
  }));
  return (
    <div className="client-dashboard-wrapper">
      <div className="client-dashboard-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <h1 className="heading">{t("clientDash.hello")} <span>{get(userData, 'name', '')} {get(userData, 'lname', '')}</span></h1>
              <p className="sub-heading">{t("clientDash.text")}</p>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="d-flex align-items-center flex-end cursur-pointer">
                <div>
                  <Link href={get(userData, 'role.type','') === "seller" ? "/handyman-registration-withdrawn" : "/category-services"}>
                  <Image
                    src="/assets/svg/ic-add.svg"
                    alt="add"
                    width={72}
                    height={72}
                  />
                  </Link>
                </div>
                <div>
                  <h4>{get(userData, 'role.type','') !== "seller" ? t("clientDash.oTitle") : "Add A New Gig"}</h4>
                  <h6>{t("clientDash.oText")}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withTranslation('common')(ClientDashboard)
