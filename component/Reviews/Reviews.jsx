import Image from "next/image";

export default function Reviews() {
  return (
    <div className="reviews d-flex flex-column ">
      <div className="heading d-flex align-items-center justify-content-start">
        <div className="col-md-3 mr-3">
          <Image
            src="/assets/images/howitwork2.jpg"
            alt="image"
            layout="responsive"
            width={300}
            height={300}
          />
        </div>
        <div className="title-section d-flex flex-column align-items-start">
          <h3 className="mb-0">Stefan Muller</h3>
          <p className="mb-1">September 10</p>
          <div className="rating-star d-flex">
            <div className="mr-2 fill">
              <i className="fa fa-star" aria-hidden="true"></i>
            </div>
            <div className="mr-2 fill">
              <i className="fa fa-star" aria-hidden="true"></i>
            </div>
            <div className="mr-2 fill">
              <i className="fa fa-star" aria-hidden="true"></i>
            </div>
            <div className="mr-2 fill">
              <i className="fa fa-star" aria-hidden="true"></i>
            </div>
            <div className="mr-2">
              <i className="fa fa-star " aria-hidden="true"></i>
            </div>
            <p className="h6 mb-0 lh">|&nbsp; 4.3</p>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
    </div>
  );
}
