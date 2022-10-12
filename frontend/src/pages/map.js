import css from '../styles/Map.module.css'


const map = () => {

  return (
    <div className={css.wrapper}><br/>
      <div className={css.title}>부스 정보</div><div className={css.dev}>: 모바일 화면에서 봐주세요.</div><br/>
      <div className={css.bthAll}></div>

        <input className={`${css.rad} ${css.univ}`} type='radio' name='booth' />
        <div className={css.univEx}>
          <div className={css.where}>
            중앙도서관 앞 <br/><br/>
            <p className={css.p}>- 대학혁신지원사업 도장깨기</p>
            <p className={css.p}>- 캡스톤디자인 설명회 및 만족도 조사 | 마이크로 전공 설명회</p>
            <p className={css.p}>- 스앤스(SNS)말고 스미스를 하자</p>
            <p className={css.p}>- 찾아가는 대학 일자리 플러스센터</p>
            <p className={css.p}>- 삼육마을 해외봉사</p>
            <p className={css.p}>- ESG와 만난 마음건강 프로그램</p>
          </div>
        </div>

        <input className={`${css.rad} ${css.sol}`} type='radio' name='booth' />
        <div className={css.solEx}>
          <div className={css.where}>
            솔로몬광장 <br/><br/>
            <p className={css.p}>- PLANT WAKER <span className={css.span}>: 환경디자인원예학과 학과 동아리 plant waker</span></p>
            <p className={css.p}>- 추억의 문방구 <span className={css.span}>: 글로벌한국학과 학생회</span></p>
            <p className={css.p}>- 총학생회 <span className={css.span}>: 두유는 사랑을 타고</span></p>
            <p className={css.p}>- 동.행.길 <span className={css.span}>: 동행길</span></p>
            <p className={css.p}>- '술잔 비우고, 술자리도 비우자!' <span className={css.span}>: 보건관리학과</span></p>
            <p className={css.p}>- ♥️ 삼육항공의 탑승을 환영합니다 ♥️ <span className={css.span}>: 항공관광외국어학부</span></p>
            <p className={css.p}>- 밝은눈안과 <span className={css.span}>: 룰렛돌리고 상품 받아가세요~</span></p>
            <p className={css.p}>- 원모아 <span className={css.span}>: 간단한 게임진행 부스</span></p>
            <p className={css.p}>- 한국인터넷방송 <span className={css.span}>: 온라인 강의 홍보</span></p>
            <p className={css.p}>- 학교 <span className={css.span}>: 장애체험 "함께하는 생활"</span></p>
            <p className={css.p}>- 신나는 양궁게임</p>
          </div>
        </div>

        <input className={`${css.rad} ${css.han}`} type='radio' name='booth' />
        <div className={css.hanEx}>
          <div className={css.where}>
            다니엘관 앞 <br/><br/>
            <p className={css.p}><span className={css.hg}>총학생회 부스</span></p>
            <p className={css.p}>- 삼육랜드</p> <br/>
            <p className={css.p}>- 학생 휴식공간</p> <br/>
            <p className={css.p}>- 버스킹</p>    <br/>
          </div>
        </div>

        <input className={`${css.rad} ${css.food}`} type='radio' name='booth' />
        <div className={css.foodEx}>
          <div className={css.where}>푸드트럭</div>
        </div>
    </div>
 

 
   
  
  )
}

export default map