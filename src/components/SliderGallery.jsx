

import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { BASE_URL } from "../configs/variables.config";

export default function SliderGallery(props) {
  let gallery = props.data.images;
  let images = []

  if (gallery != null) {
    {
      (gallery).map((item, i) => {
        images = [...images, { 'original': `${BASE_URL}/files/${item}`, 'thumbnail': `${BASE_URL}/files/${item}` }]
      })
    }
  }

  return (
    <ImageGallery items={images}  />
  )
}


