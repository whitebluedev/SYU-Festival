{/* 7. 이성신 (lss) */}
import React from 'react'
import css from '../../styles/TeamCard.module.css'

const Team_7 = () => {
  return (
    <div className={`${css.card} ${css.lss_card}`}>
    <span className={css.img} placeholder="blur" />
    <span className={css.content}>
      <span className={css.teamName}>이성신</span> <br/>
      <span className={css.song}>♫ 오늘은 가지마&amp;이 노래</span>
    </span>               
    </div>  )
}

export default Team_7