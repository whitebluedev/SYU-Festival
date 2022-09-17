import '../styles/globals.css'
import Layout from '../components/Layout'
import Nav from '../components/Nav'
import 'semantic-ui-css/semantic.min.css'

function App({ Component, pageProps }) {
  return (
    <div className='container'>
      <div className='nav'>
        <Nav/>
      </div>
      <div className='main'>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
      <footer className='footer'>
        COPYRIGHT © 2022 Whiteblue SYU Security Club. ALL RIGHTS RESERVED.
      </footer>    
    </div>
  ) 
}

export default App
