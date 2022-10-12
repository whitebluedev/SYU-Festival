import React from "react"
import css from "../styles/Index.module.css"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


export default function Main() {
  const setting = {
    dots: true,
    infinite: true,
    autoplaySpeed:6000,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    fade: true,
    pauseOnHover: false,
    arrows: false,
  };


  return (
      <div className={css.wrapper}>
        <Slider {...setting}>
          <div className={css.main1}></div>
          <div className={css.main2}></div>

        </Slider>


      <br/>
      </div>


 


  )
}

