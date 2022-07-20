
// import './SearchSection.scss';

export default function SeatchSection() {
  return (
    <div className="search-section">
      <div className="container">
        <div className="row d-flex text-center">
          <div className="col-4 align-self-center">
            <div className="postal-code right-border">
              <p>Postal Code</p>
              <p>Munich, Germany 80331</p>
            </div>
          </div>
          <div className="col-8 align-self-center">
            <div className="row">
              <div className="col-10 align-self-center">
                <div className="postal-code">
                  <p>Pick A Service</p>
                  <p>What Can We Assist You With? </p>
                </div>
              </div>
              <div className="col-2 align-self-center">
                <button>
                <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};