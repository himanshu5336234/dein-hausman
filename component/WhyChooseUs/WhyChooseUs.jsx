import Image from "next/image";
import ChooseUs from "../../constent/whyChooseUs"

const renderData = () =>(
  ChooseUs.map((data, key)=>(
    <li key={key}>
      <Image
        src={data.Image}
        alt={data.name}
        width={80}
        height={80}
      />
      <h3>{data.title}</h3>
      <p>{data.text}</p>
    </li>
  ))
)

export default function WhyChooseUs() {
  return (  
    <div className="why-choose-us">
      <h2>Why Choose Us?</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce bibendum
        nunc eu urna pulvinar vehicula. Donec molestie quam leo, eget tempus
        odio mollis in.
      </p>
      <div className="row">
        <div className="col-md-12">
          <ul className="choose-list">
            {renderData()}
          </ul>
        </div>
      </div>
    </div>
  );
}
