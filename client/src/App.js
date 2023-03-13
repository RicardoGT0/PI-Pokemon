import React from 'react'
import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router'
import './App.css'
import Home from './components/Home'
import Nav from './components/Nav'
import About from './components/About'
import Details from './components/Details'
import Login from './components/Login'
import { useSelector } from 'react-redux'
import Profile from './components/Profile'
import Team from './components/Team'
import CreatePokemon from './components/CreatePokemon'


function App() {
  const navigate = useNavigate();
  const access = useSelector((state) => state.access);

  useEffect(() => {
    !access && navigate('/');
  }, [access, navigate]);

  return (
    <div className='App'>
      <Nav />
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/home"
          element={<Home />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/team"
          element={<Team />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/details/:id"
          element={<Details />}
        />
        <Route
          path="/create"
          element={<CreatePokemon />}
        />
        
      </Routes>
    </div>
  )
}

export default App
