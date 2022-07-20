import { Layout, Footer } from "../component";
import { Inbox, Timeline, Chat } from "../component";
  

export default function InboxPage(props) {
  return (
  

    <Layout setWebSoket={props.setWebSoket}>
      <div className="inbox-page">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
           
              <Inbox />
           
            </div>
            <div className="col-md-4">
              <Timeline />
            </div>
            <div className="col-md-4">
              <Chat />
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
