

const VoteCard = ({children}) => {
  return (
    <div>
        <div>
            {children} <br/>  {/* <Image/> */}
            Team Name <br/>
            <button>투표</button>
        </div>
    </div>
  )
}

export default VoteCard