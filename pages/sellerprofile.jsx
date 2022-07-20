import { useEffect } from "react"
import { Layout, Footer, SearchBar, ProfileGigsWithReview } from "../component";
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'next/router'
import { get } from "lodash"

export default withRouter(function Category(props) {
  const dispatch = useDispatch()
  const { gigLoading, gig, moreServiceLoading, moreServiceData } = useSelector(state => ({
    gigLoading: state.handyman.gigLoading,
    gig: state.handyman.gig,
    moreServiceLoading: state.services.moreServiceLoading,
    moreServiceData: state.services.moreServiceData,
  }));

  useEffect(() => {
    const serId = get(props, 'router.query.id', '')
    dispatch({ type: 'GET_GIG', payload: serId })
    // dispatch({ type: 'MORE_SERVICE', payload: { userId: serId } })
  }, [props.router.query])

  useEffect(() => {
    if (get(gig, 'sellerPersonalInfo._id', false)) {
      const userId = get(gig, 'sellerPersonalInfo._id', '')
      dispatch({ type: 'MORE_SERVICE', payload: { userId } })
    }
  }, [get(gig, 'sellerPersonalInfo._id', '')])

  return (
    <Layout setWebSoket={props.setWebSoket}>
      { (gigLoading || moreServiceLoading) &&
        <div className="loading-wrapper">
          <div className="loader"></div>
        </div>
      }
      <div className="products">
        <div className="container">
          <div className="home-section-padding">
            <SearchBar />
          </div>
          <div className="home-section-padding">
            <ProfileGigsWithReview moreServiceData={moreServiceData} gig={gig} />
          </div>
        </div>
        <div className="home-section-padding">
          <Footer ws={props.ws} />
        </div>
      </div>
    </Layout>
  );
})
