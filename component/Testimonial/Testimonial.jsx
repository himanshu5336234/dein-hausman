import Slider from "react-slick";
import Image from "next/image";

const settings = {
  dots: true,
  infinite: true,
  arrows: true,
  autoplay: false,
  speed: 500,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 600,
      settings: {
        arrows: false
      }
    }
  ]
};

export default function Testimonial() {
  return (
    <div className="testimonials">
      <div className="testimonial-slider">
        <Slider {...settings}>
          <div className="full-container">
            <div>
              <div className="row">
                <div className="col-md-3">
                  <Image
                    src="/assets/images/howitwork2.jpg"
                    alt="testimonial2"
                    layout="responsive"
                    width={228}
                    height={228}
                  />
                </div>
                <div className="col-md-9 pl-4 d-flex flex-column justify-content-around">
                  <p className="views">
                    Mario Adolfo was our handyman. She went above and beyond the
                    assigned call of duty. All of her work was first class, very
                    quick and extremely professional. She even worked on repairing
                    a broken window in our lawn outside in a rain storm.
                  </p>
                  <div>
                    <h5 className="name mb-1">Suzzane Merkel,</h5>
                    <h5 className="job">
                      - A Web Developer at German IT Solutions
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="full-container">
            <div>
              <div className="row">
                <div className="col-md-3">
                  <Image
                    src="/assets/images/howitwork2.jpg"
                    alt="testimonial2"
                    layout="responsive"
                    width={228}
                    height={228}
                  />
                </div>
                <div className="col-md-9 pl-4 d-flex flex-column justify-content-around">
                  <p className="views">
                    Mario Adolfo was our handyman. She went above and beyond the
                    assigned call of duty. All of her work was first class, very
                    quick and extremely professional. She even worked on repairing
                    a broken window in our lawn outside in a rain storm.
                  </p>
                  <div>
                    <h5 className="name mb-1">Suzzane Merkel,</h5>
                    <h5 className="job">
                      - A Web Developer at German IT Solutions
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="full-container">
            <div>
              <div className="row">
                <div className="col-md-3">
                  <Image
                    src="/assets/images/howitwork2.jpg"
                    alt="testimonial2"
                    layout="responsive"
                    width={228}
                    height={228}
                  />
                </div>
                <div className="col-md-9 pl-4 d-flex flex-column justify-content-around">
                  <p className="views">
                    Mario Adolfo was our handyman. She went above and beyond the
                    assigned call of duty. All of her work was first class, very
                    quick and extremely professional. She even worked on repairing
                    a broken window in our lawn outside in a rain storm.
                  </p>
                  <div>
                    <h5 className="name mb-1">Suzzane Merkel,</h5>
                    <h5 className="job">
                      - A Web Developer at German IT Solutions
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}
