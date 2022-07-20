import React from 'react';
import Slider from "react-slick";
import Image from 'next/image';
import { withTranslation } from "../../constent/i18n/i18n"
import Steps from "../../constent/howItsWork"

const settings = {
  dots: false,
  infinite: false,
  arrows: true,
  autoplay: false,
  speed: 900,
  autoplaySpeed: 3000,
  slidesToShow: 3,
  slidesToScroll: 1,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 980,
      settings: {
        autoplay: true,
        arrows: false,
        dots: true,
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        dots: true
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
};

const renderSteps = ({t}) =>(
  Steps.map((data, key)=>(
    <div key={key} className="how-it-work-slide">
      <Image
        src={data.image}
        alt="howitwork1"
        layout="responsive"
        className="sm-img"
        width={300}
        height={300}
      />
      <span className="image-circle">{key + 1}</span>
      <h3 className="mt-5">{data.title}</h3>
      <hr />
      <p>{data.text}</p>
    </div>
  ))
)

function HowItWorks({t}) {
  return (
    <div className="how-it-works text-center">
      <h3>{t("howItWorks.title")}</h3>
      <div className="how-it-work-slider">
        <Slider {...settings}>
          {renderSteps(t)}
        </Slider>
      </div>
    </div>
  )
}
export default withTranslation('common')(HowItWorks)