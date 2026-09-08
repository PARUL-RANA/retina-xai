import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "@/pages/Landing"
import Login from "@/pages/Login"
import Dashboard from "@/pages/Dashboard"
import Analysis from "@/pages/Analysis"
import AppShell from "@/components/app-shell/AppShell"
import {
  PhcHomePage,
  ScreenPage,
  PatientsPage,
  SyncPage,
  DevicePage,
  ReportPage,
} from "@/pages/app/placeholders"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analysis" element={<Analysis />} />

        <Route path="/app" element={<AppShell />}>
          <Route index element={<PhcHomePage />} />
          <Route path="screen" element={<ScreenPage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="report/:patientId" element={<ReportPage />} />
          <Route path="sync" element={<SyncPage />} />
          <Route path="device" element={<DevicePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
