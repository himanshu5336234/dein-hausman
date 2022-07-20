import Image from "next/image";

export default function Support() {
  return (
    <div className="about-us-and-contact d-flex flexwrap">
      <div className="form-area">
        <h1 className="mb-3">Dein Hausman Support</h1>
        <h3 className="subtitle">
          Not satisfied with your order? Fill the dispute form down below and our customer service executive will help you resolve your issue as soon as possible!
        </h3>
        <div className="form">
          <input type="text" className="input large mr-2" placeholder="Order ID" />
          <textarea
            type="text"
            className="input large"
            placeholder="Add Your Comments here"
          />
        </div>
        <div className="button-area text-center">
          <button className="btn btn-primary">Raise Dispute</button>
        </div>
      </div>
    </div>
  );
}
