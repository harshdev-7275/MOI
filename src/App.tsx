import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router'
import Dashboard from './pages/Dashboard'
import AuthPage from './pages/AuthPage'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth')
    }
  }, [isAuthenticated])
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
      <Toaster />
    </div>

  )
}

export default App