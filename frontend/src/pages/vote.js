import React, {useState, useEffect, useRef} from "react"
import FAQ from "../components/FAQ"
import css from "../styles/Vote.module.css"
import axios from 'axios'


{/*--------------------------------- Vote (front) ------------------------------------*/}
const vote = () => {
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
      vote_(teamArr)
    }
  }
{/*--------------------------------- Login & GPS ------------------------------------*/}
  const [loading, setLoading] = useState(true)
  const [network, setNetwork] = useState(false)

  const [user, setUser] = useState(null)

  //const [gps, setGps] = useState(null)
  //const [vote, setVote] = useState(false)

  const vote_ = async(votes) => {
    try{
      const response = await axios.post('https://re-wind.today:444/vote/vote',
      {
        ids: votes
      },
      {
        withCredentials: true
      })
      window.location.href = 'https://re-wind.today'
    }catch (exception){
      window.location.href = 'https://re-wind.today'
    }
  }

  const sessionCheck = async() => {
    try{
      const response = await axios.get('https://re-wind.today:444/auth/sessionCheck',
      {
        withCredentials: true
      })
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

  if (loading) return <div className={css.voteBottom}></div>

  if (network) return <div className={css.voteBottom}></div>

  if (user === null) window.location.href = 'https://re-wind.today'

  if (user.vote_status === 'result') window.location.href = 'https://re-wind.today/vote_show'

  {/*-------------------------------------- View --------------------------------------*/}
  return (
    <div className={css.wrapper}>
    {
      user !== null &&
      !loading &&
      ( user.islogin ?
        // 로그인 상태
        <>
        <button onClick={kakaoLogout} className={css.kOut}>로그아웃</button>
        {
          // 투표 비활성화
          user.vote_status === 'disable' &&
          <>
          <br/><div className={css.ex}>투표 페이지가 아직 열리지 않았습니다.</div>
          <div className={`${css.ex} ${css.bottom}`}>잠시 후 투표가 시작됩니다.</div>
          <FAQ/>
          </>
        }
        {
          // 투표 활성화
          user.vote_status === 'enable' &&
          ( user.isgps ?
            // 위치 인증
            ( user.isvote ?
              // 투표 함
              <>
              <br/>
              <div className={`${css.ex}`}>이미 투표하였습니다.</div>
              <div className={`${css.ex} ${css.bottom}`}>잠시 후 투표 결과가 공개됩니다.</div>
              </>:
            // 투표 안함 
            <>
            <div className={css.innerWrapper}>
              <div className={css.title}><span className={css.hl1}>2팀</span>을 선택 후 <span className={css.hl1}>투표</span> 해주세요!</div><br/>

              <button className={css.voteBtn} onClick={voteTeam}>투 표</button>

              <div className={css.container}>

              {/* 1. 랩으로 삼육대를 칭칭감지 (rap) */}
              <div className={`${css.card} ${css.rap_card}`}>
              <span className={css.img} placeholder="blur" />
              <span className={css.content}>
                <span className={`${css.teamName} ${css.rap}`}>랩으로 삼육대를 칭칭감지</span> <br/>
                <span className={css.teamEx}>저희 오늘 데뷔했어요</span> <br/>
                <span className={css.song}>♫ BAND&amp;수퍼비와</span>
              </span>
              <input type="checkbox" className={css.teamBtn} name="team" value="vote_1" onChange={checkTeam} />
              </div>
              
              {/* 2. Open your eyes (oye) */}
              <div className={`${css.card} ${css.oye_card}`}>
              <span className={css.img} placeholder="blur" />
              <span className={css.content}>
                <span className={css.teamName}>Open your eyes</span> <br/>
                <span className={css.teamEx}>당신의 눈을 뜨이게 할 참가자 조범준입니다</span> <br/>
                <span className={css.song}>♫ 그 눈을 떠</span>
              </span>
              <input type="checkbox" className={css.teamBtn} name="team" value="vote_2" onChange={checkTeam} />
              </div>

              {/* 3. 장주안 (jja) */}
              <div className={`${css.card} ${css.jja_card}`}>
              <span className={css.img} placeholder="blur" />
              <span className={css.content}>
                <span className={css.teamName}>장주안</span> <br/>
                <span className={css.teamEx}>오랜만에 찾아온 천보축전이 모두의 기억 속에 마법같은 기억으로 남았으면 좋겠습니다!</span> <br/>
                <span className={css.song}>♫ 선택은 없어&amp;지금 이 순간</span>
              </span>
              <input type="checkbox" className={css.teamBtn} name="team" value="vote_3" onChange={checkTeam} />
              </div>

              {/* 4. 고음불가 (csh) */}
              <div className={`${css.card} ${css.csh_card}`}>
              <span className={css.img} placeholder="blur" />
              <span className={css.content}>
                <span className={css.teamName}>고음불가</span> <br/>
                <span className={css.teamEx}>겁이 많은 저는 이렇게 많은 여러분들 앞에 용기를 얻어가고자 지원했습니다.<br/>이를 계기로 한층 더 성장해나갈 아트앤디자인학과 21학번 박진희 많은 응원 부탁드립니다!</span> <br/>
                <span className={css.song}>♫ 가을밤 떠난 너&amp;가보자</span>
              </span> 
              <input type="checkbox" className={css.teamBtn} name="team" value="vote_4" onChange={checkTeam} />
              </div>

              {/* 5. D.M (dm) */}
              <div className={`${css.card} ${css.dm_card}`}>
              <span className={css.img} placeholder="blur" />
              <span className={css.content}>
                <span className={css.teamName}>D.M</span> <br/>
                <span className={css.teamEx}>케이팝, 현대무용 등 다양한 장르를 가진 Dynamic movement 동아리 D.M</span> <br/>
                <span className={css.song}>♫ 소리꾼&amp;BIG&amp;무용 등</span>
              </span>
              <input type="checkbox" className={css.teamBtn} name="team" value="vote_5" onChange={checkTeam} />
              </div>

              {/* 6. 김주연 (kjy) */}
              <div className={`${css.card} ${css.kjy_card}`}>
              <span className={css.img} placeholder="blur" />
              <span className={css.content}>
                <span className={css.teamName}>김주연</span> <br/>
                <span className={css.teamEx}>안녕하세요! 2022 천보축전의 주연이 될 간호학과 22학번 김주연이라고 합니다.<br/>부족하더라도 호응 많이 해주세요 :&gt;</span> <br/>
                <span className={css.song}>♫ 미친 소리&amp;Believer</span>
              </span> 
              <input type="checkbox" className={css.teamBtn} name="team" value="vote_6" onChange={checkTeam} />
              </div>

              {/* 7. 이성신 (lss) */}
              <div className={`${css.card} ${css.lss_card}`}>
              <span className={css.img} placeholder="blur" />
              <span className={css.content}>
                <span className={css.teamName}>이성신</span> <br/>
                <span className={css.teamEx}>삼육대 최고의 싱어송라이터 이성신... 그를 영접할 시간이다</span> <br/>
                <span className={css.song}>♫ 오늘은 가지마&amp;이 노래</span>
              </span>               
              <input type="checkbox" className={css.teamBtn} name="team" value="vote_7" onChange={checkTeam} />
              </div>
              
              {/* 8. 성시경티 (ssgt) */}
              <div className={`${css.card} ${css.ssgt_card}`}>
              <span className={css.img} placeholder="blur" />
              <span className={css.content}>
                <span className={css.teamName}>성시경티</span> <br/>
                <span className={css.teamEx}>코로나 이후 첫 천보축전!!<br/>아주 재미지게 놀아봅시다<br/>!!!!호응!!!! 많이 해줘잉~</span> <br/>
                <span className={css.song}>♫ 너의 모든 순간&amp;No make up</span>
              </span>    
              <input type="checkbox" className={css.teamBtn} name="team" value="vote_8" onChange={checkTeam} />
              </div>

              {/* 9. 플레이그 (plague) */}
              <div className={`${css.card} ${css.plague_card}`}>
              <span className={css.img} placeholder="blur" />
              <span className={css.content}>
                <span className={css.teamName}>PLAGUE</span> <br/>
                <span className={css.teamEx}>역병 걸리지 말라고?<br/>그거 어떻게 하는 건데</span> <br/>
                <span className={css.song}>♫ Guaya&amp;호랑이&amp;DM&amp;Friday&amp;Fearless&amp;팝송 리믹스&amp;Hello bitches&amp;LALISA</span>
              </span>   
              <input type="checkbox" className={css.teamBtn} name="team" value="vote_9" onChange={checkTeam} />
              </div>

              </div>
              
            </div>
              </>
            ) :
            // 위치 미인증
            <>
            <br/>
            <div className={css.ex}>위치 인증 후 투표할 수 있습니다.</div>
            <button onClick={gpsShow} className={css.gps}>위치 인증하기</button>
            <FAQ/>
            </>
          )
        }
        {
          // 투표 결과
          user.vote_status === 'result' &&
          <>
          <div>투표 결과</div>
          </>
        }
        </>:
        // 비로그인 상태
        <>
        <div className={css.ex}>로그인 후 투표할 수 있습니다.</div>
        <div onClick={kakaoLogin} className={css.kIn}>
          <div className={css.logoWrapper}><div className={css.Logo}></div></div>
          <div className={css.kInText}>카카오톡으로 로그인</div>
        </div>
        <FAQ/>
        </>
      )
    }
    </div>
  )
}

export default vote
