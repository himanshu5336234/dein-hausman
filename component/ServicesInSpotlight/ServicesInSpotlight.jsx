import Image from 'next/image';

export default function ServicesInSpotlight() {
  return (
    <div className="service-spotlight text-center">
      <h3>Services In Spotlight</h3>
      <p className="heading-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce bibendum nunc eu urna pulvinar vehicula. Donec molestie quam leo, eget tempus odio mollis in.</p>
      <div className="row mt-5">
        <div className="col-md-9 pr-0">
          <Image
            src="/assets/images/spotlight1.jpg"
            alt="spotlight1"
            layout="responsive"
            width={928}
            height={352}
          />
        </div>
        <div className="col-md-3 pl-0 hideimg-mob">
        <Image
            src="/assets/images/spotlight2.jpg"
            alt="spotlight2"
            layout="responsive"
            width={244}
            height={288}
          />
        </div>
      </div>
      <div className="row hideimg-mob">
        <div className="col-md-4 pr-0">
          <Image
            src="/assets/images/spotlight3.jpg"
            alt="spotlight3"
            layout="responsive"
            width={390}
            height={148}
          />
        </div>
        <div className="col-md-4 pr-0 pl-0">
          <Image
            src="/assets/images/spotlight3.jpg"
            alt="spotlight3"
            layout="responsive"
            width={390}
            height={142}
          />
        </div>
        <div className="col-md-4 pl-0">
          <Image
            src="/assets/images/spotlight3.jpg"
            alt="spotlight3"
            layout="responsive"
            width={390}
            height={148}
          />
        </div>
      </div>
    </div>
  )
}