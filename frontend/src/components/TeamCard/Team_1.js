{/* 1. 랩으로 삼육대를 칭칭감지 (rap) */ }
import React from 'react'
import css from '../../styles/TeamCard.module.css'

const Team_1 = () => {
  return (
    < div className={`${css.card} ${css.rap_card}`}>
      <span className={css.img} placeholder="blur" />
      <span className={css.content}>
        <span className={`${css.teamName} ${css.rap}`}>랩으로 삼육대를 칭칭감지</span> <br />
        <span className={css.song}>♫ BAND&amp;수퍼비와</span>
      </span>
    </div >
  )
}

export default Team_1