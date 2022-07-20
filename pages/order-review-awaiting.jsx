import { Layout, Footer } from "../component";
import { TimelineOrder, Chat, OtherOrders } from "../component";

export default function InboxWidePage(props) {
  return (
    <Layout setWebSoket={props.setWebSoket}>
      <div className="inbox-wide-page">
        <div className="container mb-4">
          <div className="d-flex justify-content-between flexwrap">
            <div className="d-flex flexwrap">
              <h2 className="mb-0 mr-2 heads">Bathroom Repair</h2>
              <button className="status-btn status-orange">Awaiting Quote</button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <TimelineOrder />
            </div>
            <div className="col-lg-8 col-md-12">
              <Chat />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 mt-5">
              <OtherOrders />
            </div>
          </div>
        </div>
        <div className="home-section-padding">
          <Footer ws={props.ws}/>
        </div>
      </div>
    </Layout>
  );
}
