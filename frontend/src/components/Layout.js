import Head from 'next/head'

const Layout = ({children}) => {
  return (
    <>
    <Head>
      <meta charSet='UTF-8'></meta>
      <meta name="author" content="waeandway"></meta>
      <meta name="viewport" content="width=device-width, maximum-scale=1.0, minimum-scale=1, user-scalable=yes,initial-scale=1.0"/>
      <title>2022 삼육대학교 천보축전 Re-Wind</title>
    </Head>
      <div>
        {children}
      </div> 
    </>
  )
}

export default Layout
