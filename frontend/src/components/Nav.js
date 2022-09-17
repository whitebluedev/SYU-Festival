import Link from 'next/link'
import navStyle from '../styles/Nav.module.css'

const Nav = () => {
  return (
    <nav className={navStyle.container}>
      <span className={navStyle.home} >
        <Link href="/">Re-Wind</Link>
      </span>
      <ul className={navStyle.menu}>
        <li><Link href="/vote">투표하기</Link></li>
        <li><Link href="/timetable">축제 일정</Link></li>
        <li><Link href="/map">캠퍼스맵</Link></li>
      </ul>
    </nav>
  )
}

export default Nav