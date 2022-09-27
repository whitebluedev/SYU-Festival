import React, {Component, useState, useRef} from "react"
import Slider from "react-slick"
import Image from "next/image"
import css from "../styles/Vote.module.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
//------------------- img (9) -------------------//
import dm from '../public/dm.jpeg'
import plague from '../public/plague.jpeg'
import kjy from '../public/kjy.jpeg'
import jja from '../public/jja.jpeg'
import lss from '../public/lss.jpeg'
import oye from '../public/open_your_eyes.jpeg'
import rap from '../public/rap.jpeg' 
import csh from '../public/cant_sing_high.jpeg'
import ssgt from '../public/ssgt.jpeg'


function VoteSlider()  {
  const [count, setCount] = useState({team:"", count:0});

  

  const checkTeam = (e) => {
    const team = e.target.value
    voting(team)    
  }
  
  const voting = (team) => {
    if (team ==='plague') {
      alert(`팀명 : ${team} 투표가 완료되었습니다.`)
    }
  }

  {/* Slider Custom */ }
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "33%",
    arrows: true,
    slidesToShow: 1,
    speed: 2000,
    dots: true,
    focusOnSelect: true,
    pauseOnHover: false,
    //pauseOnFocus: true,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 280, /* Galazy Fold */
        settings: {
          centerPadding: "10%"
        }
      },
      {
        breakpoint: 375, /* iPhone SE & X */
        settings: {
          centerPadding: "10%"
        }
      },
      {
        breakpoint: 480, /* iPhone Pro */
        settings: {
          centerPadding: "10%"
        }
      },
      {
        breakpoint: 819,
        settings: {
          centerPadding: "10%"
        }
      },
      {
        breakpoint: 1023, /* iPad Air */
        settings: {
          centerPadding: "10%"
        }
      },
      {
        breakpoint: 1366, /* iPad Pro */
        settings: {
          centerPadding: "10%"
        }
      },
      {
        breakpoint: 375, /* PC */
        settings: {
          centerPadding: "10%"
        }
      },
    ]
  }

  return (
    <div className={css.container}>
      <h2 className={css.title}>Vote</h2>
      <Slider className={css.slider} dotsClass={css.dots} {...settings}>
        <span className={css.card}>
          <Image src={plague} className={`${css.plague} ${css.img}`} width={100} height={110} placeholder="blur" layout="responsive" />
          <div className={css.content}>PLAGUE</div> <input type="radio" className={css.teamBtn} name="team" value="plague" onChange={checkTeam} />
        </span>
        <span className={css.card}>
          <Image src={kjy} className={css.img} width={100} height={130} placeholder="blur" layout="responsive" />
          <div className={css.content}>김주연</div> <input type="radio" className={css.teamBtn} name="team" value="kjy" />
        </span>
        <span className={css.card}>
          <Image src={csh} className={css.img} width={100} height={100} placeholder="blur" layout="responsive" />
          <div className={css.content}>고음불가</div> <input type="radio" className={css.teamBtn} name="team" value="csh" />
        </span>
        <span className={css.card}>
          <Image src={lss} className={css.img} width={100} height={100} placeholder="blur" layout="responsive" />
          <div className={css.content}>이성신</div> <input type="radio" className={css.teamBtn} name="team" value="lss" />
        </span>
        <span className={css.card}>
          <Image src={jja} className={css.img} width={100} height={100} placeholder="blur" layout="responsive" />
          <div className={css.content}>장주안</div> <input type="radio" className={css.teamBtn} name="team" value="jja" />
        </span>
        <span className={css.card}>
          <Image src={oye} className={`${css.oye} ${css.img}`} width={100} height={100} placeholder="blur" layout="responsive" />
          <div className={css.content}>Open your eyes</div> <input type="radio" className={css.teamBtn} name="team" value="oye " />
        </span>
        <span className={css.card}>
          <Image src={rap} className={css.img} width={100} height={130} placeholder="blur" layout="responsive" />
          <div className={css.content}>랩으로 삼육대를 칭칭감지</div> <input type="radio" className={css.teamBtn} name="team" value="rap" />
        </span>
        <span className={css.card}>
          <Image src={dm} className={css.img} width={100} height={100} placeholder="blur" layout="responsive" />
          <div className={css.content}>D.M</div> <input type="radio" className={css.teamBtn} name="team" value="dm" />
        </span>
        <span className={css.card}>
          <Image src={ssgt} className={css.img} width={100} height={100} placeholder="blur" layout="responsive" />
          <div className={css.content}>성시경티</div> <input type="radio" className={css.teamBtn} name="team" value="ssgt" />
        </span>
      </Slider>
      <button onclick={voting} className={css.voteBtn}>투표하기</button>
    </div>
  );
}


export default VoteSlider;