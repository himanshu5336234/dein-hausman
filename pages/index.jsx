import { useEffect } from 'react';
import {
  Layout,
  HomeBanner,
  HomeServices,
  HowItWorks,
  WhyChooseUs,
  ServicesInSpotlight,
  Testimonial,
  AboutUs,
  FAQ,
  Footer,
} from "../component";

export default function Home(props) {
  return (
    <Layout setWebSoket={props.setWebSoket}>
    {/* <div className="loader-wrapper"></div> */}
      <div className="home">
        <div className="container-fluid">
          <HomeBanner />
        </div>
        <div className="container">
          <div className="home-section-padding">
            <HomeServices />
          </div>
          <div className="home-section-padding">
            <HowItWorks />
          </div>
          <div className="home-section-padding">
            <WhyChooseUs />
          </div>
          <div className="home-section-padding">
            <ServicesInSpotlight />
          </div>
          <div className="home-section-padding">
            <Testimonial />
          </div>
        </div>
        <div className="home-section-padding">
          <AboutUs />
        </div>
        <div className="home-section-padding">
          <FAQ />
        </div>
        <div className="home-section-padding">
          <Footer ws={props.ws}/>
        </div>
      </div>
    </Layout>
  );
}
