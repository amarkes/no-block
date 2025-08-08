import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from '@/pages/sign-in/index'
import HomePage from '@/pages/home/index'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  )
}