import Link from 'next/link'
import css from '../styles/Nav.module.css'

const Nav = () => {
  return (
    <nav className={css.container}>
    
        <Link href="/"><span className={css.home} >Re-Wind</span></Link>

      {/* Sidebar */}
      <div className={css.sidebar}>
        <Link href="/vote"><span className={css.vote}>투표하기</span></Link> &nbsp;&nbsp;&nbsp;&nbsp;
        <Link href="/timetable"><span className={css.timetable}>축제 일정</span></Link> &nbsp;&nbsp;&nbsp;&nbsp;
        <Link href="/map"><span className={css.map}>부스맵</span></Link> &nbsp;&nbsp;&nbsp;&nbsp;
        {/* Menuicon */}
        <span className={css.menuicon}>☰</span>
      </div>


    </nav>
  )
}

export default Nav