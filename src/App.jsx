import React from 'react'
import LandingPage from './vendorDashboard/pages/LandingPage'
import NotFound from './vendorDashboard/components/NotFound'
import "./App.css"
import { Routes,Route } from 'react-router-dom'
const App = () => {
  return (
    <div>
    <Routes>
      <Route path='/' element={<LandingPage></LandingPage>}></Route>
      <Route path='/*' element={<NotFound></NotFound>}></Route>
    </Routes>
    </div>
  )
}

export default App