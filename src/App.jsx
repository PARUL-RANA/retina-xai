import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import Landing from "@/pages/Landing"
import Login from "@/pages/Login"
import Dashboard from "@/pages/Dashboard"
import Analysis from "@/pages/Analysis"
import { auth } from "@/lib/firebase"
import {
  PhcHomePage,
  ScreenPage,
  PatientsPage,
  AccountPage,
  SyncPage,
  DevicePage,
  ReportPage,
} from "@/pages/app/placeholders"

function ProtectedApp({ user, authReady }) {
  if (!authReady) {
    return <div className="flex min-h-svh items-center justify-center text-sm font-medium text-[#185B56]">Checking authentication...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const isPasswordUser = user.providerData.some((provider) => provider.providerId === "password")
  if (isPasswordUser && !user.emailVerified) {
    return <Navigate to="/login" replace />
  }

  return <AppShell />
}

export default function App() {
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      setAuthReady(true)
    })

    return () => unsubscribe()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analysis" element={<Analysis />} />

        <Route path="/app" element={<ProtectedApp user={user} authReady={authReady} />}>
          <Route index element={<PhcHomePage />} />
          <Route path="screen" element={<ScreenPage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="report/:patientId" element={<ReportPage />} />
          <Route path="sync" element={<SyncPage />} />
          <Route path="device" element={<DevicePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
