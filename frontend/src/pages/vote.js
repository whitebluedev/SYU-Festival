import VoteSlider from '../components/VoteSlider';
import css from '../styles/Vote.module.css'



const vote = () => {

  return (
      <div className={css.wrapper}>
        <VoteSlider/>
      </div>
  )
}

export default vote
