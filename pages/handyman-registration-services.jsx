import { useEffect } from 'react';
import { Layout, Footer, ClientDashboard } from "../component";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Image from "next/image";
import { useDispatch, useSelector } from 'react-redux';
import { get } from "lodash"

import { useRouter } from 'next/router'
// import 'react-tabs/style/react-tabs.css';

export default function Category(props) {
  const router = useRouter()
  const dispatch = useDispatch()
  useEffect(() => {
    console.log("call service")
    dispatch({ type: 'GET_SERVICES' })
  }, [])
  const { getServices, serviceLoading } = useSelector(state => ({

    getServices: state.handyman.service,
    serviceLoading: state.handyman.serviceLoading,
  }));
  console.log("getServices", getServices)
  const renderActive = () => (
    getServices && getServices.map((data, key) => (
      <li key={key}>
        <div className="imgbox">
          <Image
            src="/assets/images/regislist.png"
            alt="testimonial2"
            // layout="responsive"
            width={98}
            height={98}
          />
        </div>
        <div className="anchor-box">
          {get(data, 'title', '')}
        </div>
        <div className="btn-box">
          <button onClick={() => router.push(`/handyman-registration-withdrawn?id=${data._id}`)}>Edit</button>
          <button onClick={() => dispatch({ type: 'PAUSE_REQUEST', payload: { "gigId": data._id } })}>Pause</button>
          <button onClick={() => dispatch({ type: 'CONTINUE_REQUEST' })}>Share</button>
          <button onClick={() => dispatch({ type: 'DELETE_REQUEST', payload: { "gigId": data._id } })}>Delete</button>
        </div>
      </li>
    ))
  )
  const renderPaused = () => (
    getServices && getServices.map((data, key) => (
      <li key={key}>
        <div className="imgbox">
          <Image
            src="/assets/images/regislist.png"
            alt="testimonial2"
            // layout="responsive"
            width={98}
            height={98}
          />
        </div>
        <div className="anchor-box">
          {get(data, 'title', '')}
        </div>
        <div className="btn-box">
          <button onClick={() => router.push(`/handyman-registration-withdrawn?id=${data._id}`)}>Edit</button>
          <button onClick={() => dispatch({ type: 'PAUSE_REQUEST', payload: { "gigId": data._id } })}>Pause</button>
          <button onClick={() => dispatch({ type: 'CONTINUE_REQUEST' })}>Share</button>
          <button onClick={() => dispatch({ type: 'DELETE_REQUEST', payload: { "gigId": data._id } })}>Delete</button>
        </div>
      </li>
    ))
  )

  return (
    <Layout setWebSoket={props.setWebSoket}>
      {(serviceLoading) &&
        <div className="loading-wrapper">
          <div className="loader"></div>
        </div>
      }
      <div className="category">
        <div className="container">
          <div className="home-section-padding">
            <ClientDashboard />
          </div>
        </div>

        <div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 registration-tabs">
                <Tabs>
                  <TabList>
                    <Tab>Active</Tab>
                    <Tab>Paused</Tab>
                  </TabList>

                  <TabPanel>
                    <h5>SERVICES</h5>
                    <ul className="regis-list">

                      {renderActive()}
                      {/* <li>
                  <div className="imgbox">
                    <Image
                      src="/assets/images/regislist.png"
                      alt="testimonial2"
                      // layout="responsive"
                      width={98}
                      height={98}
                    />
                  </div>
                  <div className="anchor-box">
                    <a href="">One Line Service Title Goes Here</a>
                  </div>
                  <div className="btn-box">
                  

                    <button>Edit</button>
                    <button>Pause</button>
                    <button>Share</button>
                    <button>Delete</button>
                    
                  </div>
                </li>
                <li>
                  <div className="imgbox">
                    <Image
                      src="/assets/images/regislist2.png"
                      alt="testimonial2"
                      // layout="responsive"
                      width={98}
                      height={98}
                    />
                  </div>
                  <div className="anchor-box">
                    <a href="">One Line Service Title Goes Here</a>
                  </div>
                  <div className="btn-box">
                    <button>Edit</button>
                    <button>Pause</button>
                    <button>Share</button>
                    <button>Delete</button>
                  </div>
                </li>
                <li>
                  <div className="imgbox">
                    <Image
                      src="/assets/images/regislist3.png"
                      alt="testimonial2"
                      // layout="responsive"
                      width={98}
                      height={98}
                    />
                  </div>
                  <div className="anchor-box">
                    <a href="">One Line Service Title Goes Here</a>
                  </div>
                  <div className="btn-box">
                    <button>Edit</button>
                    <button>Pause</button>
                    <button>Share</button>
                    <button>Delete</button>
                  </div>
                </li> */}
                    </ul>
                  </TabPanel>
                  <TabPanel>
                    <h5>SERVICES</h5>
                    <ul className="regis-list">
                      {renderPaused()}
                      {/* <li>
                        <div className="imgbox">
                          <Image
                            src="/assets/images/regislist3.png"
                            alt="testimonial2"
                            // layout="responsive"
                            width={98}
                            height={98}
                          />
                        </div>
                        <div className="anchor-box">
                          <a href="">One Line Service Title Goes Here</a>
                        </div>
                        <div className="btn-box">
                          <button>Edit</button>
                          <button>Pause</button>
                          <button>Share</button>
                          <button>Delete</button>
                        </div>
                      </li>
                      <li>
                        <div className="imgbox">
                          <Image
                            src="/assets/images/regislist.png"
                            alt="testimonial2"
                            // layout="responsive"
                            width={98}
                            height={98}
                          />
                        </div>
                        <div className="anchor-box">
                          <a href="">One Line Service Title Goes Here</a>
                        </div>
                        <div className="btn-box">
                          <button>Edit</button>
                          <button>Pause</button>
                          <button>Share</button>
                          <button>Delete</button>
                        </div>
                      </li>
                      <li>
                        <div className="imgbox">
                          <Image
                            src="/assets/images/regislist2.png"
                            alt="testimonial2"
                            // layout="responsive"
                            width={98}
                            height={98}
                          />
                        </div>
                        <div className="anchor-box">
                          <a href="">One Line Service Title Goes Here</a>
                        </div>
                        <div className="btn-box">
                          <button>Edit</button>
                          <button>Pause</button>
                          <button>Share</button>
                          <button>Delete</button>
                        </div>
                      </li> */}
                    </ul>
                  </TabPanel>
                </Tabs>

              </div>
            </div>
          </div>
        </div>

        <div className="home-section-padding">
          <Footer ws={props.ws} />
        </div>
      </div>
    </Layout>
  );
}
