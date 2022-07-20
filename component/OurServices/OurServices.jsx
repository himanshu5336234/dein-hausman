import Link from "next/link"
import Image from "next/image"
import { withTranslation } from "../../constent/i18n/i18n"
import { get } from "lodash"
const renderServices= (services)=> (
  services && services.length && services.map((data, key)=>(
    <Link key={key} href={`/gigs?service=${get(data, 'name', '')}&id=${get(data, '_id', '')}&name=${get(data, 'name', '')}`}>
      <li key={key}>
        <img
          src={get(data, 'image.url', "/assets/svg/ic-clean-service.svg")}
          alt={data.name}
          style={{ width: 80, height: 80 }}
        />
        <h4>{get(data, 'name', '')}</h4>
      </li>
    </Link>
  ))
)

function OurServices(props, {t}) {
  
  return (
    <div className="our-services">
      <h1>Our Services</h1>
      <div className="row">
        <div className="col-lg-12">
          
          <ul className="service-list">
            {renderServices(get(props, 'data', []))}
            {/* <li>
              <Image
                src="/assets/svg/ic-clean-service.svg"
                alt="clean-service"
                width={80}
                height={80}
              />
              <h4>Cleaning Services</h4>
            </li>
            <li>
              <Image
                src="/assets/svg/ic-roof-service.svg"
                alt="roof-service"
                width={80}
                height={80}
              />
              <h4>Roof Services</h4>
            </li>
            <li>
              <Image
                src="/assets/svg/ic-bathroom-service.svg"
                alt="roof-service"
                width={80}
                height={80}
              />
              <h4>Bathroom Installation & Repair</h4>
            </li>
            <li>
              <Image
                src="/assets/svg/ic-computer-service.svg"
                alt="roof-service"
                width={80}
                height={80}
              />
              <h4>Computer Setup & Repair</h4>
            </li>
            <li>
              <Image
                src="/assets/svg/ic-restoration-service.svg"
                alt="restoration-service"
                width={80}
                height={80}
              />
              <h4>Restoration Services</h4>
            </li>
            <li>
              <Image
                src="/assets/svg/ic-electronic-service.svg"
                alt="electronic-service"
                width={80}
                height={80}
              />
              <h4>Electronic Installation & Repair</h4>
            </li>
            <li>
              <Image
                src="/assets/svg/ic-clean-service.svg"
                alt="clean-service"
                width={80}
                height={80}
              />
              <h4>Cleaning Services</h4>
            </li>
            <li>
              <Image
                src="/assets/svg/ic-roof-service.svg"
                alt="roof-service"
                width={80}
                height={80}
              />
              <h4>Roof Services</h4>
            </li>
            <li>
              <Image
                src="/assets/svg/ic-bathroom-service.svg"
                alt="roof-service"
                width={80}
                height={80}
              />
              <h4>Bathroom Installation & Repair</h4>
            </li>
            <li>
              <Image
                src="/assets/svg/ic-computer-service.svg"
                alt="roof-service"
                width={80}
                height={80}
              />
              <h4>Computer Setup & Repair</h4>
            </li>
            <li>
              <Image
                src="/assets/svg/ic-restoration-service.svg"
                alt="restoration-service"
                width={80}
                height={80}
              />
              <h4>Restoration Services</h4>
            </li>
            <li>
              <Image
                src="/assets/svg/ic-electronic-service.svg"
                alt="electronic-service"
                width={80}
                height={80}
              />
              <h4>Electronic Installation & Repair</h4>
            </li>
            <li>
              <Image
                src="/assets/svg/ic-clean-service.svg"
                alt="clean-service"
                width={80}
                height={80}
              />
              <h4>Cleaning Services</h4>
            </li>
            <li>
              <Image
                src="/assets/svg/ic-roof-service.svg"
                alt="roof-service"
                width={80}
                height={80}
              />
              <h4>Roof Services</h4>
            </li>
            <li>
              <Image
                src="/assets/svg/ic-bathroom-service.svg"
                alt="roof-service"
                width={80}
                height={80}
              />
              <h4>Bathroom Installation & Repair</h4>
            </li>
            <li>
              <Image
                src="/assets/svg/ic-computer-service.svg"
                alt="roof-service"
                width={80}
                height={80}
              />
              <h4>Computer Setup & Repair</h4>
            </li>
            <li>
              <Image
                src="/assets/svg/ic-restoration-service.svg"
                alt="restoration-service"
                width={80}
                height={80}
              />
              <h4>Restoration Services</h4>
            </li>
            <li>
              <Image
                src="/assets/svg/ic-electronic-service.svg"
                alt="electronic-service"
                width={80}
                height={80}
              />
              <h4>Electronic Installation & Repair</h4>
            </li> */}
          </ul>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}
export default withTranslation('common')(OurServices)