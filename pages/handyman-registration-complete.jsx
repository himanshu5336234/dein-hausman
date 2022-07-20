import { Layout, Footer, HandymanRegistrationComplete } from "../component";

export default function Category(props) {
  return (
    <Layout setWebSoket={props.setWebSoket}>
      <div className="category">
        <div className="container">
          <HandymanRegistrationComplete />
        </div>
        <div className="home-section-padding">
          <Footer ws={props.ws}/>
        </div>
      </div>
    </Layout>
  );
}
