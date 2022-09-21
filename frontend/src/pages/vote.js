import { useState, useEffect } from 'react'
import axios from 'axios'
import VoteCard from '../components/VoteCard'
import Image from 'next/image'
import img1 from '../public/red.png'
import img2 from '../public/green.png'
import img3 from '../public/blue.png'
import voteStyle from '../styles/Vote.module.css'

const vote = () => {
  const [loading, setLoading] = useState(true)
  const [network, setnetwork] = useState(false)
  const [login, setLogin] = useState(false)
  const [gps, setGps] = useState(null)
  const [vote, setVote] = useState(false)

  const sessionCheck = async() => {
    try{
      const response = await axios.get('https://re-wind.today:444/auth/sessionCheck',
      {
        withCredentials: true
      })
      setLogin(true)
    }catch (exception){
      if (exception.response.status === 400){ // login issue
      }else{
        setnetwork(true)
        window.location.href = 'https://re-wind.today' // network issue
      }
      setLogin(false)
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
        setGps(response.data)
      }catch (exception){
        if (exception.response.status === 401){ // login issue
          window.location.href = 'https://re-wind.today'
        }else if (exception.response.status === 400){ // gps issue
          window.location.reload()
        }else{
          setnetwork(true)
          window.location.href = 'https://re-wind.today' // network issue
        }
        setGps(null)
      }
    })
  }

  const voteCheck = async() => {
    try{
      const response = await axios.get('https://re-wind.today:444/vote/voteStatus',
      {
        withCredentials: true
      })
      setVote(true)
    }catch (exception){
      if (exception.response.status === 400){ // login issue
        setVote(false)
      }else{
        setnetwork(true)
        window.location.href = 'https://re-wind.today' // network issue
      }
    }
  }

  useEffect(() => {
    sessionCheck()
    voteCheck()
  }, [])

  if (loading) return <div>로딩중 입니다.. 잠시만 기다려주세요..</div>

  if (network) return <div>네트워크 오류.. 잠시만 기다려주세요..</div>

  return (
    <>
    <div>
    <h1>This is vote pages.</h1>
    {
      !loading &&
      ( login ?
        <>
        <div>카카오 로그인이 완료되었습니다.</div>
        <br/>
        <div>카카오 로그인 후 위치 인증을 하면 투표가 가능합니다.</div>
        <br/>
        {
          !gps && <button onClick={gpsShow}>위치 인증</button>
        }
        <button onClick={kakaoLogout}>카카오 로그아웃</button>
        {
          gps ?
          <>
          <br/>
          <br/>
          <div>위치 인증에 성공했습니다.</div>
          <br/>
          {
            vote ?
            <>
            <div className={voteStyle.container}>
            <VoteCard className={voteStyle.card}><Image src={img1} width={200} height={200} /></VoteCard>
            <VoteCard className={voteStyle.card}><Image src={img2} width={200} height={200} /></VoteCard>
            
            <VoteCard className={voteStyle.card}><Image src={img3} width={200} height={200} /></VoteCard>
            <VoteCard className={voteStyle.card}><Image src={img1} width={200} height={200} /></VoteCard>
            
            
            <VoteCard className={voteStyle.card}><Image src={img2} width={200} height={200} /></VoteCard>
            <VoteCard className={voteStyle.card}><Image src={img3} width={200} height={200} /></VoteCard>
            
            <VoteCard className={voteStyle.card}><Image src={img1} width={200} height={200} /></VoteCard>
            </div>
            </> :
            <>
            <div>투표 기능이 비활성화 되어있습니다.. 잠시만 기다려주세요..</div>
            </>
          }
          </>:
          <>
          <br/>
          <br/>
          <div>위치 인증에 실패했습니다. 위치 권한을 허용해주세요.</div>
          </>
        }
        </> :
        <> 
        <div>카카오 로그인이 필요합니다.</div>
        <br/>
        <div>카카오 로그인 후 위치 인증을 하면 투표가 가능합니다.</div>
        <br/>
        <button onClick={kakaoLogin}>카카오 로그인</button>
        <br/>
        </> )
      }
      </div>
      </>
  )
}

export default vote