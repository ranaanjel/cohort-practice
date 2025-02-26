import {BrowserRouter, Route, Routes} from "react-router-dom"
import SendMoney from "./pages/send.jsx"
import Signin from "./pages/signin.jsx"
import Signup from "./pages/signup.jsx"  
import Dashboard from "./pages/dashboard.jsx"
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/send" element={<SendMoney/>} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
