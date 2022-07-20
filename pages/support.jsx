import { Layout, Footer, Support, FAQ } from "../component";

export default function Category(props) {
  return (
    <Layout setWebSoket={props.setWebSoket}>
      <div className="products">
        <div className="support-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12"><Support /></div>
              <div className="col-lg-6 col-md-12 col-sm-12 about-us-and-contact"><FAQ /></div>
            </div>
          </div>
          </div>
        <Footer ws={props.ws}/>
      </div>
    </Layout>
  );
}
