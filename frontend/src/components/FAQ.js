import React from 'react'
import css from '../styles/FAQ.module.css'

const FAQ = () => {
  return (
    <div className={css.wrapper}>

            <div className={css.ques}>Q. 카카오 로그인이 필요한 이유는 무엇인가요?</div>
             <p className={css.p}>- 투표 서비스에서 <span className={css.hl}>사용자를 식별하기 위해</span> 카카오 로그인 서비스가 필요합니다.</p>
             <p className={css.p}>- 로그인시 사용자의 카카오 고유ID, 닉네임만 수집되며 <span className={css.hl}>투표가 끝난 직후 데이터는 즉시 파기</span>됩니다.</p>
             <p className={css.p}>- 카카오 고유ID, 닉네임은 사용자 데이터에 저장됩니다.</p>

            <div className={css.ques}>Q. 위치 정보 서비스가 필요한 이유는 무엇인가요?</div>
             <p className={css.p}>- 투표 서비스에서 사용자의 <span className={css.hl}>부정 투표를 방지하기 위해</span> 위치 정보 수집이 필요합니다.</p>
             <p className={css.p}>- 사용자의 위도, 경도를 통해 위치를 파악한 후 데이터는 즉시 파기됩니다.</p>
             <p className={css.p}>- 위치 정보는 사용자 데이터에 저장되지 않습니다.</p>

            <div className={css.ques}>Q. 위치 인증이 되지 않아요.</div>
             <p className={css.p}>- PC의 경우 GPS 기능이 없어 위치 인증이 어렵습니다.</p>
             <p className={css.p}>- iOS의 위치 서비스가 비활성화돼 있는 경우 인증이 되지 않습니다.</p>
             <p className={css.p}>- 네트워크 상태 또는 GPS 활성화를 체크해주세요.</p>

            <div className={css.ques}>Q. 투표가 끝난 후, 수집된 개인 정보는 어떻게 되나요?</div>
             <p className={css.p}>- 수집된 개인 정보는 <span className={css.hl}>투표 당일(10/5) 오후 11:59분부터 자동으로 초기화</span>됩니다.</p>
    </div>
  )
}

export default FAQ