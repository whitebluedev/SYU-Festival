{/* 5. D.M (dm) */}
import React from 'react'
import css from '../../styles/TeamCard.module.css'

const Team_5 = () => {
  return (
    <div className={`${css.card} ${css.dm_card}`}>
    <span className={css.img} placeholder="blur" />
    <span className={css.content}>
      <span className={css.teamName}>D.M</span> <br/>
      <span className={css.song}>♫ 소리꾼&amp;BIG&amp;무용 등</span>
    </span>
    </div>
  )
}

export default Team_5