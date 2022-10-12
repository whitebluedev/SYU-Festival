{/* 6. 김주연 (kjy) */}
import React from 'react'
import css from '../../styles/TeamCard.module.css'

const Team_6 = () => {
  return (
    <div className={`${css.card} ${css.kjy_card}`}>
    <span className={css.img} placeholder="blur" />
    <span className={css.content}>
      <span className={css.teamName}>김주연</span> <br/>
      <span className={css.song}>♫ 미친 소리&amp;Believer</span>
    </span> 
    </div>  )
}

export default Team_6