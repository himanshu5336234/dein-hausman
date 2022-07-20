import Image from "next/image";

import SearchBar from "../SearchBar/SearchBar";

export default function HomeBanner() {
  return (
    <div className="banner">
      <Image
        className="banner-image"
        src="/assets/images/banner.jpeg"
        alt="company logo"
        layout="responsive"
        width={1440}
        height={543}
      />
      <div className="home-search">
        <SearchBar />
      </div>
    </div>
  );
}
