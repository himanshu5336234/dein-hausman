import { useEffect } from 'react';
import { Layout, Footer, ClientDashboard } from "../component";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Image from "next/image";
import { useDispatch, useSelector } from 'react-redux';
import { get } from "lodash";
import Moment from 'moment';


// import 'react-tabs/style/react-tabs.css';

export default function Category(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    console.log("call earn")
    dispatch({ type: 'GET_EARNING', payload: { month: "2" } })
  }, [])
  const { getEarnings } = useSelector(state => ({
    getEarnings: state.services.earning,
  }));

const totalAmount=()=>{
  var a=0;
  get(getEarnings, 'results', []) && get(getEarnings, 'results', []).map((data) => {
    a = a+ parseFloat(get(data, 'price', 0));
  })
  return a
}
  const renderCleared = () => (
    get(getEarnings, 'results', []) && get(getEarnings, 'results', []).map((data, key) => (
      <tr key={key}>
        <td>{Moment(get(data, 'clearingDate', null)).format('DD-MM-YYYY')}</td>
        <td><a href="" className="purple-color">{get(data, 'title', '')}</a></td>
        <td className="text-right">€ {get(data, 'price', null)}</td>
     
                        
      </tr>
    ))
  )
  const renderPendingClearance = () => (
    get(getEarnings, 'results', []) && get(getEarnings, 'results', []).map((data, key) => (

      <tr key={key}>
        <td>{Moment(get(data, 'clearingDate', null)).format('DD-MM-YYYY')}</td>
        <td><a href="" className="purple-color">{get(data, 'title', '')}</a></td>
        <td className="text-right">€ {get(data, 'price', null)}</td>
        
      </tr>

    ))
  )

  return (
    
    <Layout setWebSoket={props.setWebSoket}>
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
                <span className="sort-bg">Sort By:
                  <select>
                    <option>Most Recent</option>
                  </select>
                </span>
                <Tabs>
                  <TabList>
                    <Tab>Cleared</Tab>
                    <Tab>Pending Clearance</Tab>
                  </TabList>

                  <TabPanel>
                    <table className="table-width">
                      <thead>
                        <tr>
                          <th>DATE</th>
                          <th>FOR</th>
                          <th className="text-right">AMOUNT</th>
                        </tr>

                      </thead>
                      <tbody>
                        {renderCleared()}
                        <tr>
                          <td colSpan="3" className="text-right padt20"><span className="grand-total">€ {totalAmount()}</span></td>
                        </tr>
                      </tbody>
                     
                    

                      
                    </table>



                  </TabPanel>
                
                  <TabPanel>
                    <table className="table-width">
                      <thead>
                        <tr>
                          <th>DATE</th>
                          <th>FOR</th>
                          <th className="text-right">AMOUNT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {renderPendingClearance()}
                        <tr>
                          <td colSpan="3" className="text-right padt20"><span className="grand-total">€ {totalAmount()}</span></td>
                        </tr>
                      </tbody>
                      
                    </table>



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
      {totalAmount()}
    </Layout>
    
  );
  }