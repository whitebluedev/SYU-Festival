{/* 2. Open your eyes (oye) */}
import React from 'react'
import css from '../../styles/TeamCard.module.css'

const Team_2 = () => {
  return (
    <div className={`${css.card} ${css.oye_card}`}>
     <span className={css.img} placeholder="blur" />
     <span className={css.content}>
         <span className={css.teamName}>Open your eyes</span> <br/>
         <span className={css.song}>♫ 그 눈을 떠</span>
    </span>
    </div>
  )
}

export default Team_2