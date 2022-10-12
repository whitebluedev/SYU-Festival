{/* 3. 장주안 (jja) */}
import React from 'react'
import css from '../../styles/TeamCard.module.css'

const Team_3 = () => {
  return (
    <div className={`${css.card} ${css.jja_card}`}>
    <span className={css.img} placeholder="blur" />
    <span className={css.content}>
      <span className={css.teamName}>장주안</span> <br/>
      <span className={css.song}>♫ 선택은 없어&amp;지금 이 순간</span>
    </span>
    </div>
  )
}

export default Team_3