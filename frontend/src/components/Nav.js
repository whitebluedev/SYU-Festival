import Link from 'next/link'
import css from '../styles/Nav.module.css'

const Nav = () => {
  return (
    <>
    <div className={css.container}>
      {/* Home */}
      <Link href="/"><span className={css.home}>Re-Wind</span></Link>
      {/* Sidebar */}
      <div className={css.side}>
        <Link href="/vote"><span className={css.vote}>투표하기</span></Link> &nbsp;&nbsp;&nbsp;&nbsp;
        <Link href="/timetable"><span className={css.timetable}>축제일정</span></Link> &nbsp;&nbsp;&nbsp;&nbsp;
        <Link href="/map"><span className={css.map}>부스정보</span></Link> &nbsp;&nbsp;&nbsp;&nbsp;
      {/* Menuicon */}
        <input type='checkbox' className={css.menuicon}/>
        <div className={css.sidebar}>
          <div className={css.sidebarr}>
          <Link href="/vote"><div className={css.v}>투표하기</div></Link> <br/>
        <Link href="/timetable"><div className={css.t}>축제일정</div></Link> <br/>
        <Link href="/map"><div className={css.m}>부스정보</div></Link> <br/>
         </div>
        </div>


          
      </div>
      <br/>
    </div>
    <hr className={css.navHr}/>
  </>
  )
}

export default Nav