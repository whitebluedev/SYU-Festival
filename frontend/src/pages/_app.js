import '../styles/globals.css'
import Layout from '../components/Layout'
import Nav from '../components/Nav'
import 'semantic-ui-css/semantic.min.css'



function App({ Component, Page }) {
  return (
    <div className='wrapper'>
     <Nav/>
     <Layout>
      <Component {...Page}/>
     </Layout>
      <div className='footer'>COPYRIGHT © 2022 Whiteblue SYU Security Club. ALL RIGHTS RESERVED.</div>    
   </div>
  )
}

export default App
