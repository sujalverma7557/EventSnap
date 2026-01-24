import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Container} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import SignUp from './screens/SignUp'
import LoginScreen from './screens/LoginScreen'
import DashboardScreen from './screens/DashboardScreen'
import CreateEventScreen from './screens/CreateEventScreen'
import JoinEventScreen from './screens/JoinEventScreen'
import EventDetailScreen from './screens/EventDetailScreen'
import UserProfile from './screens/UserProfile'


const App = () => {
  return (
    <Router>
    <Header />
    <main>
     <Container>
      <Routes>
            <Route path='/' Component={DashboardScreen} exact />
            <Route path='/login' Component={LoginScreen} /> 
            <Route path='/signup' Component={SignUp} />
            <Route path='/events/new' Component={CreateEventScreen} />
            <Route path='/events/join' Component={JoinEventScreen} />
            <Route path='/events/:id' Component={EventDetailScreen} />
            <Route path='/userProfile' Component={UserProfile}/>
      </Routes>
    </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App //carousal can be added as the front page

