import Head from 'next/head'
import Footer from '../components/Footer'
import NavigationBar from '../components/NavigationBar'

function MainLayout({children}) {
  return (
    <div className="app">
      <NavigationBar />
        {children}
      <Footer />
    </div>
  )
}

export default MainLayout