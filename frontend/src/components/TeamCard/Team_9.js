{/* 9. 플레이그 (plague) */}
import React from 'react'
import css from '../../styles/TeamCard.module.css'

const Team_9 = () => {
  return (
    <div className={`${css.card} ${css.plague_card}`}>
    <span className={css.img} placeholder="blur" />
    <span className={css.content}>
      <span className={css.teamName}>PLAGUE</span> <br/>
      <span className={css.song}>♫ Guaya&amp;호랑이&amp;DM&amp;Friday&amp;Fearless&amp;팝송 리믹스&amp;Hello bitches&amp;LALISA</span>
    </span>   
    </div>  )
}

export default Team_9