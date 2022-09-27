import Carousel from 'react-material-ui-carousel'
import css from "../styles/Index.module.css"



export default function Main() {
  return (
    <div>
      <div className={css.wrapper}>
        <div className={css.container}>
          {/* Carousel */}
          <div className={css.carousel}> 
            <div className={css.carouselBtn}>
              <span className={css.timetable}>.</span>
              <span className={css.map}>.</span>
              <span className={css.vote}>.</span>
            </div>
            <div className={css.gateway}>

            </div>
          </div>
        </div>

        {/* Footer2 */}
        <div className={css.hangyeol}>
          <div className={css.syu}>
            <hr className={css.hr}/>
            <span className={css.who}>주최</span> 삼육대학교 &nbsp; 
            <span className={css.who}>주관</span> 제62대 한결 총학생회
          </div>
          <div className={css.location}>서울특별시 노원구 화랑로 815</div>
        </div>
      </div>
   </div>
  )
}

