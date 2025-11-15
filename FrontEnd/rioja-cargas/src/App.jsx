import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App
