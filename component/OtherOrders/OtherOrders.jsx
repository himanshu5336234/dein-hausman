import React from 'react';
import Slider from "react-slick";
import Image from 'next/image';
import Link from "next/link";

const settings = {
  dots: false,
  infinite: true,
  arrows: true,
  autoplay: false,
  speed: 500,
  autoplaySpeed: 3000,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};


export default function ClientMyOrders() {
  return (

    <div className="client-dashboard-orders">
      <div className="">
        <div className="">
          <div className="col-lg-10 col-md-12 d-flex justify-content-between flex-wrap">
            <div>
              <h4 className="head-other">Other Orders</h4>
            </div>
            <div>
              <h4>Sort By:</h4>
              <select className="select-global">
                <option>Most Recent</option>
                <option>Most Recent</option>
                <option>Most Recent</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-10 col-md-12">
            {/* slider open */}
            <Slider {...settings}>
            <div>
              <div className="myorder-slide">
                <h4 className="mb-2">Moving Out Service</h4>
                <p>Order ID: 12345678</p>
                <div className="timers">
                  <Image
                    src="/assets/svg/ic-clock.svg"
                    alt="howitwork1"
                    width={11}
                    height={11}
                  />
                Order Placed: Sep 29, 04:10 PM</div>
                  <button className="btn btnprimary-fill">View Project 
                  <Image
                    src="/assets/svg/ic-white-arrow.svg"
                    alt="howitwork1"
                    width={32}
                    height={12}
                    className="ml-2"
                  />
                  </button>
              </div>
              </div>
              <div>
              <div className="myorder-slide">
                <h4 className="mb-2">Computer Installation</h4>
                <p>Order ID: 12345678</p>
                <div className="timers">
                  <Image
                    src="/assets/svg/ic-clock.svg"
                    alt="howitwork1"
                    width={11}
                    height={11}
                  />
                Order Placed: Sep 29, 04:10 PM</div>
                  <button className="btn btnprimary-fill">View Project
                  <Image
                      src="/assets/svg/ic-white-arrow.svg"
                      alt="howitwork1"
                      width={32}
                      height={12}
                      className="ml-2"
                    />
                  </button>
              </div>
              </div>
              <div>
              <div className="myorder-slide">
                <h4 className="mb-2">House Cleaning Service</h4>
                <p>Order ID: 12345678</p>
                <div className="timers">
                  <Image
                    src="/assets/svg/ic-clock.svg"
                    alt="howitwork1"
                    width={11}
                    height={11}
                  />
                Order Placed: Sep 29, 04:10 PM</div>
                  <button className="btn btnprimary-fill">View Project
                  <Image
                      src="/assets/svg/ic-white-arrow.svg"
                      alt="howitwork1"
                      width={32}
                      height={12}
                      className="ml-2"
                    />
                  </button>
              </div>
              </div>
              <div>
                <div className="myorder-slide">
                  <h4 className="mb-2">House Cleaning Service</h4>
                  <p>Order ID: 12345678</p>
                  <div className="timers">
                    <Image
                      src="/assets/svg/ic-clock.svg"
                      alt="howitwork1"
                      width={11}
                      height={11}
                    />
                Order Placed: Sep 29, 04:10 PM</div>
                  <button className="btn btnprimary-fill">View Project
                  <Image
                      src="/assets/svg/ic-white-arrow.svg"
                      alt="howitwork1"
                      width={32}
                      height={12}
                      className="ml-2"
                    />
                  </button>
                </div>
              </div>
              <div>
                <div className="myorder-slide">
                  <h4 className="mb-2">House Cleaning Service</h4>
                  <p>Order ID: 12345678</p>
                  <div className="timers">
                    <Image
                      src="/assets/svg/ic-clock.svg"
                      alt="howitwork1"
                      width={11}
                      height={11}
                    />
                Order Placed: Sep 29, 04:10 PM</div>
                  <button className="btn btnprimary-fill">View Project
                  <Image
                      src="/assets/svg/ic-white-arrow.svg"
                      alt="howitwork1"
                      width={32}
                      height={12}
                      className="ml-2"
                    />
                  </button>
                </div>
              </div>
            </Slider>
            {/* slider close */}
          </div>
        </div>
      </div>
    </div>

  );
}
