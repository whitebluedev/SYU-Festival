import VoteCard from '../components/VoteCard'
import Image from 'next/image'
import img1 from '../public/red.png'
import img2 from '../public/green.png'
import img3 from '../public/blue.png'
import voteStyle from '../styles/Vote.module.css'


const vote = () => {
  return (
    <div>
      <h1>This is vote pages.</h1>
      <div className={voteStyle.container}>

          <VoteCard className={voteStyle.card}><Image src={img1} width={200} height={200} /></VoteCard>
          <VoteCard className={voteStyle.card}><Image src={img2} width={200} height={200} /></VoteCard>

          <VoteCard className={voteStyle.card}><Image src={img3} width={200} height={200} /></VoteCard>
          <VoteCard className={voteStyle.card}><Image src={img1} width={200} height={200} /></VoteCard>


          <VoteCard className={voteStyle.card}><Image src={img2} width={200} height={200} /></VoteCard>
          <VoteCard className={voteStyle.card}><Image src={img3} width={200} height={200} /></VoteCard>

          <VoteCard className={voteStyle.card}><Image src={img1} width={200} height={200} /></VoteCard>
      </div>
    </div>
  )
}

export default vote

/*export const getServerSideProps = async()=>{  // SSR
    const res = await fetch('');
      const photos = await res.json();
       
      return {
        props : {
          
        }
      }
    }*/