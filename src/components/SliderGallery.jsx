

import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import img1 from '../assest/images/forTest.webp'


const images = [
  {
    original: img1,
    thumbnail:img1,
  },
  {
    original: img1,
    thumbnail: img1,
  },
  {
    original: img1,
    thumbnail: img1,
  },
];

class SliderGallery extends React.Component {
  render() {
    return <ImageGallery items={images} />;
  }
}
export default SliderGallery;


