import { useState, useEffect } from 'react'
import axios from 'axios'
import VoteCard from '../components/VoteCard'
import Image from 'next/image'
import img1 from '../public/red.png'
import img2 from '../public/green.png'
import img3 from '../public/blue.png'
import voteStyle from '../styles/Vote.module.css'

axios.defaults.withCredentials = true

const vote = () => {
  const [loading, setLoading] = useState(true)
  const [login, setLogin] = useState(false)
  const [gps, setGps] = useState(null)

  const gpsShow = (event) => {
    event.preventDefault()
    navigator.geolocation.getCurrentPosition(async(pos) => {
      try{
        const response = await axios.post('https://re-wind.today:444/auth/gpsCheck', {
          x: pos.coords.longitude,
          y: pos.coords.latitude
        })
        setGps(response.data)
        console.log(response.data)
      }catch (e){
        setGps(null)
        console.log(e)
      }
    })
  }

  const sessionCheck = async() => {
    try{
      const response = await axios.get('https://re-wind.today:444/auth/sessionCheck')
      setLogin(true)
      console.log(response.data)
    }catch (e){
      setLogin(false)
      console.log(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    sessionCheck()
  }, [])

  if (loading) return <div>로딩중 입니다.. 잠시만 기다려주세요..</div>

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
        <button onClick={gpsShow}>위치 인증하기</button>
        <a href='https://re-wind.today:444/auth/kakao/logout'>카카오 로그아웃</a>
        {
          gps ?
          <>
          <div>위치 인증에 성공했습니다.</div>
          <br/>
          <div className={voteStyle.container}>
          <VoteCard className={voteStyle.card}><Image src={img1} width={200} height={200} /></VoteCard>
          <VoteCard className={voteStyle.card}><Image src={img2} width={200} height={200} /></VoteCard>
          
          <VoteCard className={voteStyle.card}><Image src={img3} width={200} height={200} /></VoteCard>
          <VoteCard className={voteStyle.card}><Image src={img1} width={200} height={200} /></VoteCard>
          
          
          <VoteCard className={voteStyle.card}><Image src={img2} width={200} height={200} /></VoteCard>
          <VoteCard className={voteStyle.card}><Image src={img3} width={200} height={200} /></VoteCard>
          
          <VoteCard className={voteStyle.card}><Image src={img1} width={200} height={200} /></VoteCard>
          </div>
          </>:
          <div>위치 인증에 실패했습니다.</div>
        }
        </> :
        <> 
        <div>카카오 로그인이 필요합니다.</div>
        <br/>
        <div>카카오 로그인 후 위치 인증을 하면 투표가 가능합니다.</div>
        <br/>
        <a href='https://re-wind.today:444/auth/kakao/callback'>카카오 로그인</a>
        <br/>
        </> )
      }
      </div>
      </>
  )
}

export default vote