import React, {createContext, useEffect, useState} from 'react'
import './App.css';
import Auth from './components/Auth'
import Dashboard from './screen/Dashboard'
import {Routes, Route} from "react-router-dom";
import SendMoney from './pages/SendMoney'
import Well from './pages/Well'

export const Context = createContext({})

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  return (
    <Context.Provider value={{user, setUser, token, setToken}}>
      {user ? (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/send" element={< SendMoney />} />
          <Route path="/well" element={<Well />} />
        </Routes>
      ) : (
        <Auth/>
      )}
    </Context.Provider>
  );
}

export default App;
