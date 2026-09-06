import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "@/pages/Landing"
import Login from "@/pages/Login"
import Dashboard from "@/pages/Dashboard"
import Analysis from "@/pages/Analysis"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </BrowserRouter>
  )
}
