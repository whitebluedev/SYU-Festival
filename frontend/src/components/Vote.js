import React, {useState, useEffect, useRef} from "react"
import Slider from "react-slick"
import Image from "next/image"
import css from "../styles/Vote.module.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import axios from 'axios'
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


function Vote()  {
  let teamArr = []
  {/* check Team Button */}
  const checkTeam = (e) => {
    const team = e.target.value
    const check = e.target.checked
    if (check == true) {
      teamArr.push(team)
      if(teamArr.length > 2) {
        alert("2팀을 선택할 수 있습니다.")
        e.target.checked = false
        teamArr.pop();
      }
    } else if (check == false) {
      teamArr.pop();
    }
  }
  {/* Click Vote Button */}
  const voteTeam = () => {
    if(teamArr.length != 2) {
      alert("2팀을 선택 후 투표 버튼을 눌러주세요.")
    } else {
      alert("투표가 완료되었습니다.")
      console.log(teamArr[0], teamArr[1])
    }
  }
  {/* Slider Custom */ }
  const settings = {
    slide: "span",
    className: "center",
    centerMode: true,
    centerPadding: "33%",
    arrows: false,
    slidesToShow: 1,
    speed: 400,
    dots: true,
    focusOnSelect: true,
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
  {/*--------------------------------- Login & GPS ------------------------------------*/}
  const [loading, setLoading] = useState(true)
  const [network, setNetwork] = useState(false)

  const [user, setUser] = useState(null) // null 처리 해야됨

  //const [gps, setGps] = useState(null)
  //const [vote, setVote] = useState(false)

  const sessionCheck = async() => {
    try{
      const response = await axios.get('https://re-wind.today:444/auth/sessionCheck', { withCredentials: true })
      setUser(response.data)
    }catch (exception){
      setNetwork(true)
      window.location.href = 'https://re-wind.today' // network issue
    }
    setLoading(false)
  }
  const kakaoLogin = (event) => {
    event.preventDefault()
    window.location.href = 'https://re-wind.today:444/auth/kakao/login'
  }
  const kakaoLogout = (event) => {
    event.preventDefault()
    window.location.href = 'https://re-wind.today:444/auth/kakao/logout'
  }

  const gpsShow = (event) => {
    event.preventDefault()
    navigator.geolocation.getCurrentPosition(async(pos) => {
      try{
        const response = await axios.post('https://re-wind.today:444/auth/gpsCheck', {
          x: pos.coords.longitude,
          y: pos.coords.latitude
        },
        {
          withCredentials: true
        })
        window.location.reload()
        //setGps(response.data)
      }catch (exception){
        if (exception.response.status === 401){ // login issue
          window.location.href = 'https://re-wind.today'
        }else if (exception.response.status === 400){ // gps issue
          window.location.reload()
        }else{
          setNetwork(true)
          window.location.href = 'https://re-wind.today' // network issue
        }
        //setGps(null)
      }
    })
  }

  useEffect(() => {
    sessionCheck()
  }, [])

  if (loading) return <div>로딩중 입니다.. 잠시만 기다려주세요..</div>

  if (network) return <div>네트워크 오류.. 잠시만 기다려주세요..</div>

  {/*-------------------------------------- View --------------------------------------*/}
  return (
    <>
    {
      user !== null &&
      !loading &&
      ( user.islogin ?
        <>
        <div>카카오 로그인이 완료되었습니다.</div>
        <br/>
        <div>카카오 로그인 후 위치 인증을 하면 투표가 가능합니다.</div>
        <br/>
        {
          !user.isgps && <button onClick={gpsShow}>위치 인증</button>
        }
        <button onClick={kakaoLogout}>카카오 로그아웃</button>
        {
          user.isgps ?
          <>
          <br/>
          {
            user.vote_status ?
            <> 
            <div className={css.container}>
              <h2 className={css.title}>Vote</h2>
                <Slider className={css.slider} dotsClass={css.dots} {...settings}>
                    <span className={css.card}>
                      {/* 플레이그 (plague) */}
                      <Image src={plague} className={css.img} width={100} height={110} placeholder="blur" layout="responsive" />
                      <div className={css.content}>PLAGUE</div> <input type="checkbox" className={css.teamBtn} name="team" value="plague" onChange={checkTeam} />
                    </span>
                    <span className={css.card}>
                      {/* 김주연 (kjy) */}
                      <Image src={kjy} className={css.img} width={100} height={110} placeholder="blur" layout="responsive" />
                      <div className={css.content}>김주연</div> <input type="checkbox" className={css.teamBtn} name="team" value="kjy" onChange={checkTeam} />
                    </span>
                    <span className={css.card}>
                      {/* 고음불가 (csh) */}
                      <Image src={csh} className={css.img} width={100} height={110} placeholder="blur" layout="responsive" />
                      <div className={css.content}>고음불가</div> <input type="checkbox" className={css.teamBtn} name="team" value="csh" onChange={checkTeam} />
                    </span>
                    <span className={css.card}>
                      {/* 이성신 (lss) */}
                      <Image src={lss} className={css.img} width={100} height={110} placeholder="blur" layout="responsive" />
                      <div className={css.content}>이성신</div> <input type="checkbox" className={css.teamBtn} name="team" value="lss" onChange={checkTeam} />
                    </span>
                    <span className={css.card}>
                      {/* 장주안 (jja) */}
                      <Image src={jja} className={css.img} width={100} height={110} placeholder="blur" layout="responsive" />
                      <div className={css.content}>장주안</div> <input type="checkbox" className={css.teamBtn} name="team" value="jja" onChange={checkTeam} />
                    </span>
                    <span className={css.card}>
                      {/* Open your eyes (oye) */}
                      <Image src={oye} className={css.img} width={100} height={110} placeholder="blur" layout="responsive" />
                      <div className={css.content}>Open your eyes</div> <input type="checkbox" className={css.teamBtn} name="team" value="oye" onChange={checkTeam} />
                    </span>
                    <span className={css.card}>
                      {/* 랩으로 삼육대를 칭칭감지 (rap) */}
                      <Image src={rap} className={css.img} width={100} height={110} placeholder="blur" layout="responsive" />
                      <div className={`${css.content} ${css.rap}`}>랩으로 삼육대를 칭칭감지</div> <input type="checkbox" className={css.teamBtn} name="team" value="rap" onChange={checkTeam} />
                    </span>
                    <span className={css.card}>
                      {/* D.M (dm) */}
                      <Image src={dm} className={css.img} width={100} height={110} placeholder="blur" layout="responsive" />
                      <div className={css.content}>D.M</div> <input type="checkbox" className={css.teamBtn} name="team" value="dm" onChange={checkTeam} />
                    </span>
                    <span className={css.card}>
                      {/* 성시경티 (ssgt) */}
                      <Image src={ssgt} className={css.img} width={100} height={110} placeholder="blur" layout="responsive" />
                      <div className={css.content}>성시경티</div> <input type="checkbox" className={css.teamBtn} name="team" value="ssgt" onChange={checkTeam} />
                    </span>
                </Slider>
                <button className={css.voteBtn} onClick={voteTeam}>투표하기</button>
            </div>
           </>:
            <>
            <div>투표 기능이 비활성화 되어있습니다. 잠시만 기다려주세요..</div>
            </>
          }
          </>:
          <>
          <br/>
          <br/>
          <div>위치 인증에 실패했습니다. 위치 권한을 허용해주세요.</div>
          </>
        }
        </>:
        <>
        <div>카카오 로그인이 필요합니다.</div>
        <br/>
        <div>카카오 로그인 후 위치 인증을 하면 투표가 가능합니다.</div>
        <br/>
        <button onClick={kakaoLogin}>카카오 로그인</button>
        <br/>
        </>
      )
    }
    </>
  )
}

export default Vote;