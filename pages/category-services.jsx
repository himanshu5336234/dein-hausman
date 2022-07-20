import { useEffect } from "react"
import {
  Layout,
  Footer,
  SearchBar,
  OurServices,
  HandymenPagination,
  ServiceCard,
} from "../component";
import { useDispatch, useSelector } from 'react-redux'

export default function Category(props) {

  const dispatch = useDispatch()
  const { searchByIdData, searchByIdLoading } = useSelector(state => ({
    searchByIdData: state.services.searchByIdData,
    searchByIdLoading: state.services.searchByIdLoading,
  }));

  useEffect(() => {
    dispatch({ type: 'GET_SERVICE' })
  }, [])

  return (
    <Layout setWebSoket={props.setWebSoket}>
      {(searchByIdLoading) &&
        <div className="loading-wrapper">
          <div className="loader"></div>
        </div>
      }
      <div className="category">
        <div className="container">
          <div className="home-section-padding text-center">
            <SearchBar />
          </div>
          <div className="home-section-padding">
            <OurServices data={searchByIdData} />
          </div>
        </div>
        <div className="home-section-padding">
          <Footer ws={props.ws} />
        </div>
      </div>
    </Layout>
  );
}
