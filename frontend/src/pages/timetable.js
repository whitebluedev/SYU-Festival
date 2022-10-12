import css from '../styles/TimeTable.module.css'

const timetable = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.title}>축제 일정</div> 

      {/*------------ 10. 5 수요일 -------------*/}
      <table className={`${css.table} ${css.wedTable}`}>
      <caption className={css.date}>10월 5일 (수)</caption>
        <thead>
          <tr className={css.tr}>
            <td className={`${css.th} ${css.time}`}>시간</td>
            <td className={css.th}>일정</td>
          </tr>  
        </thead>
        <tbody>
        <tr className={css.tr}>
          <td className={`${css.td} ${css.time}`}>10:00 - 16:30</td>
          <td className={css.td}>부스 진행</td>
        </tr>
        <tr className={css.tr}>
          <td className={`${css.td} ${css.time}`}>17:00 - 18:00</td>
          <td className={css.td}>입장 안내 및 공연 준비</td>
        </tr>
        <tr className={css.tr}>
          <td className={`${css.td} ${css.time}`}>18:00 - 18:10</td>
          <td className={css.td}>레크레이션 1</td>
        </tr>
        <tr className={css.tr}>
          <td className={`${css.td} ${css.time}`}>18:10 - 18:40</td>
          <td className={css.td}>뮤지컬 공연 (요소)</td>
        </tr>
        <tr className={css.tr}>
          <td className={`${css.td} ${css.time}`}>18:40 - 20:10</td>
          <td className={css.td}>장기자랑 Our Tape</td>
        </tr>
        <tr className={css.tr}>
          <td className={`${css.td} ${css.time}`}>20:10 - 20:20</td>
          <td className={css.td}>레크레이션 2</td>
        </tr>
        <tr className={css.tr}>
          <td className={`${css.td} ${css.time}`}>20:20 - 20:50</td>
          <td className={css.td}>치어리딩 공연</td>
        </tr>
        <tr className={css.tr}>
          <td className={`${css.td} ${css.time}`}>20:50 - 21:30</td>
          <td className={css.td}>레크레이션 3</td>
        </tr>
        <tr className={css.tr}>
          <td className={`${css.td} ${css.time}`}>21:30 - 22:00</td>
          <td className={css.td}>연예인 공연 (오마이걸)</td>
        </tr>
        <tr className={css.tr}>
          <td className={`${css.td} ${css.time}`}>22:00 - 22:30 </td>
          <td className={css.td}>장기자랑 시상 및 인터뷰</td>
        </tr>
        <tr className={css.tr}>
          <td className={`${css.td} ${css.time}`}>22:30~</td>
          <td className={css.td}>퇴장</td>
        </tr>
        </tbody>
      </table>       


      {/*------------ 10. 6 목요일 -------------*/}
      <table className={`${css.table} ${css.thuTable}`}>
        <caption className={css.date}>10월 6일 (목)</caption>
        <thead>
          <tr className={css.tr}>
            <td className={`${css.th} ${css.time}`}>시간</td>
            <td className={css.th}>일정</td>
          </tr>
        </thead>
        <tbody>
          <tr className={css.tr}>
            <td className={`${css.td} ${css.time}`}>~ 16:00</td>
            <td className={css.td}>입장 팔찌 배부</td>
          </tr>
          <tr className={css.tr}>
            <td className={`${css.td} ${css.time}`}>18:00 - 19:00</td>
            <td className={css.td}>입장 안내 및 공연 준비</td>
          </tr>
          <tr className={css.tr}>
            <td className={`${css.td} ${css.time}`}>19:00 - 19:50</td>
            <td className={css.td}>연예인 공연 (윤하)</td>
          </tr>
          <tr className={css.tr}>
            <td className={`${css.td} ${css.time}`}>19:50 - 21:00</td>
            <td className={css.td}>밴드공연 두유 Want Play?</td>
          </tr>
          <tr className={css.tr}>
            <td className={`${css.td} ${css.time}`}>21:00 - 21:20</td>
            <td className={css.td}>연예인 공연 (소수빈)</td>
          </tr>
          <tr className={css.tr}>
            <td className={`${css.td} ${css.time}`}>21:20 - 22:00</td>
            <td className={css.td}>연예인 공연 (10cm)</td>
          </tr>
          <tr className={css.tr}>
            <td className={`${css.td} ${css.time}`}>22:00 - 22:30</td>
            <td className={css.td}>마무리 멘트 및 퇴장 안내</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default timetable