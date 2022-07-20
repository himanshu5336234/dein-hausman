import ServiceCard from "../ServiceCard/ServiceCard";
import { withTranslation } from "../../constent/i18n/i18n"

function HandymenPagination({t, data = [], category=""}) {
  return (
    <div className="handyman-pagination">
      <h4>{data && data.length} {t("pagination.title")}</h4>
      <h1>{t("pagination.subTitle")}</h1>
      <div className="row">
        <button className="btn btn-primary d-flex justify-content-center align-items-center">
          <h4 className="add-icon mr-2">+</h4>
          <h4>{t("pagination.cancellation")}</h4>
        </button>
        <button className="btn in-active d-flex justify-content-center align-items-center">
          <h4 className="add-icon mr-2">+</h4>
          <h4>{t("pagination.budget")}</h4>
        </button>
        <button className="btn in-active d-flex justify-content-center align-items-center">
          <h4 className="add-icon mr-2">+</h4>
          <h4>{t("pagination.language")}</h4>
        </button>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h5>{category}</h5>
        </div>
      </div>
    </div>
  );
}
export default withTranslation('common')(HandymenPagination)