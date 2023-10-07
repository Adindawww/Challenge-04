import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Detail } from './pages/Detail'

const App = () => {
  return (
    <Routes>
      <Route path='*' element={<Home />} />
      <Route path='/DetailMovies/:id' element={<Detail />} />
    </Routes>
  )
}

export default App

