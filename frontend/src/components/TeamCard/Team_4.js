{/* 4. 고음불가 (csh) */}
import React from 'react'
import css from '../../styles/TeamCard.module.css'

const Team_4 = () => {
  return (
    <div className={`${css.card} ${css.csh_card}`}>
    <span className={css.img} placeholder="blur" />
    <span className={css.content}>
      <span className={css.teamName}>고음불가</span> <br/>
      <span className={css.song}>♫ 가을밤 떠난 너&amp;가보자</span>
    </span> 
    </div>
  )
}

export default Team_4