import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Container} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import FrontScreen from './screens/FrontScreen'
import SignUp from './screens/SignUp'
import LoginScreen from './screens/LoginScreen'
import UserProfile from './screens/UserProfile'
import Terms from './screens/Terms&conditons'


const App = () => {
  return (
    <Router>
    <Header />
    <main>
     <Container>
      <Routes>
            <Route path='/' Component={FrontScreen} exact />
            <Route path='/photostream' Component={HomeScreen} />
            <Route path='/login' Component={LoginScreen} /> 
            <Route path='/signup' Component={SignUp} />
            <Route path='/userProfile' Component={UserProfile}/>
            <Route path='/terms' Component={Terms}/>
      </Routes>
    </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App //carousal can be added as the front page

