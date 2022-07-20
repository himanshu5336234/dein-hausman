import { Layout, Footer, AboutUsAndContact } from "../component";

export default function Category(props) {
  return (
    <Layout setWebSoket={props.setWebSoket}>
      <div className="products">
        <div className="about-section-padding">
          <AboutUsAndContact />
        </div>
        <Footer ws={props.ws}/>
      </div>
    </Layout>
  );
}
