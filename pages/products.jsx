import { Layout, Footer, SearchBar, PackingService } from "../component";
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'next/router'
import { get } from "lodash"
export default withRouter(function Category(props) {
  const dispatch = useDispatch()
  const { gigLoading, gig, detailLoading, serviceDetails, moreServiceData, moreServiceLoading } = useSelector(state => ({
    moreServiceLoading: state.services.moreServiceLoading,
    moreServiceData: state.services.gig,
    serviceDetails: state.services.serviceDetails,
    detailLoading: state.services.detailLoading,
    gigLoading: state.handyman.gigLoading,
    gig: state.handyman.gig,
  }));
  useEffect(() => {
    const serId = get(props, 'router.query.id', '')
    // dispatch({ type: 'SERVICE_DETAILS', payload: serId })
    dispatch({ type: 'GET_GIG', payload: serId })

  }, [props.router.query])
  useEffect(() => {
    if (get(serviceDetails, 'userId', false)) {
      const userId = get(serviceDetails, 'userId', '')
      dispatch({ type: 'MORE_SERVICE', payload: { userId } })
    }
  }, [serviceDetails])
  console.log("gig=========>", gig)
  return (
    <Layout setWebSoket={props.setWebSoket}>
      {  (detailLoading || moreServiceLoading) &&
        <div className="loading-wrapper">
          <div className="loader"></div>
        </div>
      }
      <div className="products">
        <div className="container">
          <div className="home-section-padding text-center">
            <SearchBar />
          </div>
          <div className="home-section-padding">
            <PackingService 
              gig={gig} 
              moreService={moreServiceData} 
              // data={serviceDetails} 
              data={gig}
            />
          </div>
        </div>
        <div className="home-section-padding">
          <Footer ws={props.ws} />
        </div>
      </div>
    </Layout>
  );
})
