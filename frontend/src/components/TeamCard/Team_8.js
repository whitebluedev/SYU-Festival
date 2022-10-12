{/* 8. 성시경티 (ssgt) */}
import React from 'react'
import css from '../../styles/TeamCard.module.css'

const Team_8 = () => {
  return (
    <div className={`${css.card} ${css.ssgt_card}`}>
    <span className={css.img} placeholder="blur" />
    <span className={css.content}>
      <span className={css.teamName}>성시경티</span> <br/>
      <span className={css.song}>♫ 너의 모든 순간&amp;No make up</span>
    </span>    
    </div>  )
}

export default Team_8