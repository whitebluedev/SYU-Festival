import React, {useState, useEffect, useRef} from "react"
import TeamCard1 from "../components/TeamCard/Team_1"
import TeamCard2 from "../components/TeamCard/Team_2"
import TeamCard3 from "../components/TeamCard/Team_3"
import TeamCard4 from "../components/TeamCard/Team_4"
import TeamCard5 from "../components/TeamCard/Team_5"
import TeamCard6 from "../components/TeamCard/Team_6"
import TeamCard7 from "../components/TeamCard/Team_7"
import TeamCard8 from "../components/TeamCard/Team_8"
import TeamCard9 from "../components/TeamCard/Team_9"
import css from "../styles/VoteShow.module.css"
import axios from 'axios'

const vote_show = () => {
  const [loading, setLoading] = useState(true)
  const [network, setNetwork] = useState(false)

  const [data, setData] = useState(null)

  //const [gps, setGps] = useState(null)
  //const [vote, setVote] = useState(false)

  const sessionCheck = async() => {
    try{
      const response = await axios.get('https://re-wind.today:444/vote/votegetall',
      {
        withCredentials: true
      })
      setData(response.data)
    }catch (exception){
      setNetwork(true)
      window.location.href = 'https://re-wind.today' // network issue
    }
    setLoading(false)
  }

  const show = () => {
    if (data !== null){
      let vote_ = {};
      for (let element in data){
        if (element !== 'date' && element !== 'vote_status'){
          vote_[element] = data[element].length;
        }
      }
      let sort_ = [];
      for (let vote in vote_){
        sort_.push([vote, vote_[vote]]);
      }
      sort_.sort(function(a, b){
        return b[1] - a[1];
      });
      const team_name = {
        'vote_1': <TeamCard1/>,
        'vote_2': <TeamCard2/>,
        'vote_3': <TeamCard3/>,
        'vote_4': <TeamCard4/>,
        'vote_5': <TeamCard5/>,
        'vote_6': <TeamCard6/>,
        'vote_7': <TeamCard7/>,
        'vote_8': <TeamCard8/>,
        'vote_9': <TeamCard9/>
      };
      let result = [];
      let rank_count = 0;
      sort_.forEach(element => { // rank, team num, team name, vote count
        rank_count++;
        if (rank_count <= 3){ // key prop issue
          result.push(
          <div key={rank_count} className={css.rankWrap}>

            <span className={css.rank}>{rank_count}등</span>
            <span className={css.count}>&nbsp; {element[1]} 표</span> 
            {team_name[element[0]]}

          </div>
          );
        }/*else{
          result.push(team_name[element[0]]);
        }*/
      });
      return result;
      //return <div dangerouslySetInnerHTML={ {__html: html_tag} }></div>;
    }
  }

  useEffect(() => {
    sessionCheck()
  }, [])

  if (loading) return ( <div className={css.voteBottom}>로딩중 입니다.. 잠시만 기다려주세요..</div> )

  if (network) return ( <div className={css.voteBottom}>네트워크 오류.. 잠시만 기다려주세요..</div> )

  if (data === null) window.location.href = 'https://re-wind.today'

  {/*-------------------------------------- View --------------------------------------*/}
  return (
    <div className={css.wrapper}>
    {
      data !== null &&
      !loading &&
      ( data.vote_status === 'result' ?
        // 투표 결과 상태 때
        <>
        <div className={css.title}> 투표 결과 </div>
        {show()}
        </>:
        // 투표 결과 상태 아닐 때
        <>
        </>
      )
    }
    </div>
  )
}

export default vote_show

