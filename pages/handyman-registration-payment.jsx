import { Layout, Footer, HandymanRegistrationPayment } from "../component";

export default function Category(props) {
  return (
    <Layout setWebSoket={props.setWebSoket}>
      <div className="category">
        <div className="container">
          <div className="home-section-padding">
            <HandymanRegistrationPayment />
          </div>
        </div>
        <div className="home-section-padding">
          <Footer ws={props.ws}/>
        </div>
      </div>
    </Layout>
  );
}
