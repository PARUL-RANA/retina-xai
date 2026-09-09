/**
 * Remaining placeholder pages for AppShell route verification.
 * PHC Home is implemented in PHCDashboard (Step 2).
 */

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AlertTriangle, BriefcaseBusiness, CheckCircle2, LoaderCircle, LogOut, Mail, ShieldCheck, UserRound } from "lucide-react"
import { doc, onSnapshot } from "firebase/firestore"
import PHCDashboard from "@/components/phc-home/PHCDashboard"
import PatientsScreen from "@/components/patients/PatientsScreen"
import ReportScreen from "@/components/report/ReportScreen"
import ScreeningWizard from "@/components/screening/ScreeningWizard"
import { auth, db, sendEmailVerification, signOut } from "@/lib/firebase"

function Placeholder({ heading, detail }) {
  return (
    <div className="rounded-xl border border-border/60 bg-surface/40 px-5 py-8 sm:px-8">
      <p className="text-[11px] font-medium tracking-[0.18em] text-cyan">
        PLACEHOLDER
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {heading}
      </h2>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
        {detail}
      </p>
    </div>
  )
}

export function PhcHomePage() {
  return <PHCDashboard />
}

export function ScreenPage() {
  return <ScreeningWizard />
}

export function PatientsPage() {
  return <PatientsScreen />
}

export function SyncPage() {
  return (
    <Placeholder
      heading="SYNC"
      detail="Offline sync queue and status. Not implemented yet."
    />
  )
}

export function DevicePage() {
  return (
    <Placeholder
      heading="DEVICE"
      detail="Device pairing and camera status. Not implemented yet."
    />
  )
}

function AccountDetail({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-[#C9DCD5] bg-[#F9FBF8] p-4 shadow-[inset_0_0_0_1px_rgba(24,91,86,0.02)]">
      <div className="flex items-center gap-3 text-[#587270]">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E2F0ED] text-[#185B56]">
          <Icon className="size-4" aria-hidden="true" />
        </div>
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase">{label}</p>
      </div>
      <p className="mt-3 text-base font-medium text-[#173B3A]">{value}</p>
    </div>
  )
}

export function AccountPage() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loadingProfile, setLoadingProfile] = useState(Boolean(auth.currentUser))
  const [logoutPending, setLogoutPending] = useState(false)
  const [verificationMessage, setVerificationMessage] = useState("")
  const [verificationError, setVerificationError] = useState("")

  useEffect(() => {
    const currentUser = auth.currentUser
    if (!currentUser) {
      setProfile(null)
      setLoadingProfile(false)
      return undefined
    }

    const ref = doc(db, "users", currentUser.uid)
    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        setProfile(snapshot.exists() ? snapshot.data() : null)
        setLoadingProfile(false)
      },
      (error) => {
        console.error("[ACCOUNT PROFILE ERROR]", error)
        setProfile(null)
        setLoadingProfile(false)
      }
    )

    return () => unsubscribe()
  }, [])

  async function handleLogout() {
    setLogoutPending(true)
    try {
      await signOut(auth)
      navigate("/login", { replace: true })
    } catch (error) {
      console.error("[LOGOUT ERROR]", error)
      navigate("/login", { replace: true })
    } finally {
      setLogoutPending(false)
    }
  }

  async function handleResendVerification() {
    const currentUser = auth.currentUser
    if (!currentUser) return

    const isPasswordUser = currentUser.providerData.some((provider) => provider.providerId === "password")
    if (!isPasswordUser) {
      setVerificationError("Google-authenticated users do not need a resend option.")
      return
    }

    try {
      await sendEmailVerification(currentUser)
      setVerificationMessage("Verification email sent. Check your inbox.")
      setVerificationError("")
    } catch (error) {
      console.error("[RESEND VERIFICATION ERROR]", error)
      setVerificationError("Unable to resend the verification email. Please try again.")
      setVerificationMessage("")
    }
  }

  const currentUser = auth.currentUser
  const displayName = currentUser?.displayName || profile?.fullName || "Not provided"
  const email = currentUser?.email || profile?.email || "Not available"
  const role = profile?.role || "Not assigned"
  const phcId = profile?.phcId || "Not assigned"
  const phcName = profile?.phcName || "Not assigned"
  const isPasswordUser = currentUser?.providerData.some((provider) => provider.providerId === "password") ?? false
  const emailVerified = currentUser?.emailVerified ?? false

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-[#C9DCD5] bg-[linear-gradient(180deg,#F9FBF8_0%,#EEF7F3_100%)] p-5 shadow-[0_18px_42px_rgba(23,59,58,0.06)] sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E2F0ED] text-[#185B56] shadow-[inset_0_0_0_1px_rgba(24,91,86,0.04)]">
              <UserRound className="size-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-[#287A72] uppercase">Account</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#173B3A]">{displayName}</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            disabled={logoutPending}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#C9DCD5] bg-[#185B56] px-4 text-sm font-medium text-[#F3F6F1] shadow-[0_12px_24px_rgba(24,91,86,0.14)] transition-colors hover:bg-[#143F3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3E9D96]/50 disabled:cursor-wait disabled:opacity-60"
          >
            <LogOut className="size-4" aria-hidden="true" />
            {logoutPending ? "Logging out..." : "Log Out"}
          </button>
        </div>
      </div>

      {loadingProfile ? (
        <div className="rounded-2xl border border-[#C9DCD5] bg-[#F9FBF8] p-5 text-sm text-[#587270]">
          <div className="flex items-center gap-3">
            <LoaderCircle className="size-4 animate-spin text-[#185B56]" aria-hidden="true" />
            Loading profile...
          </div>
        </div>
      ) : null}

      {!loadingProfile && !profile && currentUser && (
        <div className="rounded-2xl border border-[#C9DCD5] bg-[#F9FBF8] p-5 text-sm text-[#587270]">
          Profile not available yet. Please check your account settings or sign in again.
        </div>
      )}

      <div className="rounded-2xl border border-[#C9DCD5] bg-[#F9FBF8] p-5 shadow-[inset_0_0_0_1px_rgba(24,91,86,0.02)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            {emailVerified ? (
              <CheckCircle2 className="size-5 text-[#1E7A61]" aria-hidden="true" />
            ) : (
              <AlertTriangle className="size-5 text-[#B76A2B]" aria-hidden="true" />
            )}
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#287A72]">Email verification</p>
              <p className="mt-1 text-base font-medium text-[#173B3A]">{emailVerified ? "Verified" : "Not verified"}</p>
            </div>
          </div>

          {isPasswordUser && !emailVerified ? (
            <button
              type="button"
              onClick={handleResendVerification}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#C9DCD5] bg-[#F3F6F1] px-4 text-sm font-medium text-[#185B56] transition-colors hover:bg-[#E2F0ED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3E9D96]/50"
            >
              Resend verification email
            </button>
          ) : null}
        </div>

        {verificationMessage ? (
          <p className="mt-3 text-sm text-[#1E7A61]" role="status">{verificationMessage}</p>
        ) : null}
        {verificationError ? (
          <p className="mt-3 text-sm text-[#A24F4F]" role="alert">{verificationError}</p>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AccountDetail icon={UserRound} label="Full name" value={displayName} />
        <AccountDetail icon={Mail} label="Email" value={email} />
        <AccountDetail icon={BriefcaseBusiness} label="Role" value={role} />
        <AccountDetail icon={ShieldCheck} label="PHC ID" value={phcId} />
        <div className="md:col-span-2">
          <AccountDetail icon={UserRound} label="PHC name" value={phcName} />
        </div>
      </div>
    </section>
  )
}

export function ReportPage() {
  return <ReportScreen />
}
