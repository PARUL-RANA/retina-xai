import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowRight, Globe2, LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  googleProvider,
  ensureUserProfileDocument,
} from "@/lib/firebase"
import { phcContext } from "@/data/phcMockData"

const MODES = {
  signIn: {
    label: "SIGN IN",
    title: "Welcome back",
    description: "Sign in to your screening workspace.",
    submit: "SIGN IN",
  },
  signUp: {
    label: "SIGN UP",
    title: "Create your access",
    description: "Set up access to the PHC screening workspace.",
    submit: "CREATE ACCOUNT",
  },
}

const INITIAL_VALUES = {
  fullName: "",
  emailOrId: "",
  password: "",
  confirmPassword: "",
}

function Field({ id, label, type = "text", value, onChange, autoComplete, error }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-[#173B3A]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="flex h-12 w-full rounded-md border border-[#C9DCD5] bg-[#F3F6F1] px-3 text-sm text-[#173B3A] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#758A87] focus-visible:border-[#287A72] focus-visible:ring-3 focus-visible:ring-[#3E9D96]/25"
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-[#A24F4F]" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mode, setMode] = useState("signIn")
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resetMessage, setResetMessage] = useState("")
  const [verificationUser, setVerificationUser] = useState(null)
  const [verificationMessage, setVerificationMessage] = useState("")

  const copy = MODES[mode]

  useEffect(() => {
    const shouldPromptVerification = location.state?.emailVerificationRequired || false
    if (shouldPromptVerification) {
      setVerificationMessage("Check your email to verify your account.")
    }
  }, [location.state])

  function updateValue(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined, form: undefined }))
    setResetMessage("")
  }

  function switchMode(nextMode) {
    setMode(nextMode)
    setErrors({})
    setValues(INITIAL_VALUES)
  }

  function validate() {
    const nextErrors = {}
    if (mode === "signUp" && !values.fullName.trim()) {
      nextErrors.fullName = "Full name is required."
    }
    if (!values.emailOrId.trim()) {
      nextErrors.emailOrId = "Email / ID is required."
    }
    if (mode === "signUp" && values.emailOrId.trim() && !values.emailOrId.includes("@")) {
      nextErrors.emailOrId = "Enter a valid email address."
    }
    if (!values.password) {
      nextErrors.password = "Password is required."
    }
    if (mode === "signUp" && values.password !== values.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match."
    }
    return nextErrors
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    setErrors({})
    setVerificationMessage("")

    try {
      if (mode === "signUp") {
        const userCredential = await createUserWithEmailAndPassword(auth, values.emailOrId.trim(), values.password)
        const fullName = values.fullName.trim()

        if (fullName) {
          await updateProfile(userCredential.user, { displayName: fullName })
        }

        await ensureUserProfileDocument(userCredential.user, {
          fullName,
          phcId: phcContext.phcId,
          phcName: phcContext.phcName,
          role: "operator",
        })

        await sendEmailVerification(userCredential.user)
        setVerificationUser(userCredential.user)
        setVerificationMessage("Check your email to verify your account.")
        return
      }

      const credential = await signInWithEmailAndPassword(auth, values.emailOrId.trim(), values.password)
      const passwordUser = credential.user

      if (!passwordUser.emailVerified) {
        await auth.signOut()
        setVerificationUser(passwordUser)
        setVerificationMessage("Check your email to verify your account.")
        setErrors((current) => ({ ...current, form: "Check your email to verify your account." }))
        return
      }

      navigate("/app", { replace: true })
    } catch (error) {
      const code = error?.code
      let message = "Authentication failed. Please try again."

      if (code === "auth/invalid-credential") {
        message = "Email or password is incorrect."
      } else if (code === "auth/email-already-in-use") {
        message = "An account already exists with this email."
      } else if (code === "auth/weak-password") {
        message = "Please choose a stronger password."
      } else if (code === "auth/invalid-email") {
        message = "Please enter a valid email address."
      }

      setErrors((current) => ({ ...current, form: message }))
      console.error("[AUTH ERROR]", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleGoogleSignIn() {
    setIsSubmitting(true)
    setErrors({})
    setVerificationMessage("")

    try {
      const credential = await signInWithPopup(auth, googleProvider)
      await ensureUserProfileDocument(credential.user, {
        fullName: credential.user.displayName || "Google User",
        phcId: phcContext.phcId,
        phcName: phcContext.phcName,
        role: "operator",
      })
      navigate("/app", { replace: true })
    } catch (error) {
      const code = error?.code
      let message = "Google sign-in was cancelled."

      if (code === "auth/popup-closed-by-user") {
        message = "Google sign-in was cancelled."
      } else if (code === "auth/popup-blocked") {
        message = "Your browser blocked the Google sign-in window. Please allow pop-ups and try again."
      } else if (code === "auth/account-exists-with-different-credential") {
        message = "An account already exists with this email."
      }

      setErrors((current) => ({ ...current, form: message }))
      console.error("[GOOGLE AUTH ERROR]", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleForgotPassword() {
    const email = values.emailOrId.trim()
    if (!email) {
      const message = "Please enter your email address first."
      setResetMessage(message)
      setErrors((current) => ({ ...current, form: message }))
      return
    }

    try {
      await sendPasswordResetEmail(auth, email)
      const successMessage = "Password reset email sent. Check your inbox."
      setResetMessage(successMessage)
      setErrors((current) => ({ ...current, form: successMessage }))
    } catch (error) {
      const code = error?.code
      let message = "Unable to send the reset email. Please try again."

      if (code === "auth/invalid-email") {
        message = "Please enter a valid email address."
      } else if (code === "auth/user-not-found") {
        message = "No account was found for that email. Check the address and try again."
      } else if (code === "auth/network-request-failed") {
        message = "Network issue. Please try again in a moment."
      }

      setResetMessage(message)
      setErrors((current) => ({ ...current, form: message }))
      console.error("[RESET PASSWORD ERROR]", error)
    }
  }

  async function handleResendVerification() {
    const currentUser = verificationUser ?? auth.currentUser
    if (!currentUser) {
      setErrors((current) => ({ ...current, form: "No account is available to verify." }))
      return
    }

    try {
      await sendEmailVerification(currentUser)
      setVerificationMessage("Verification email sent again.")
      setErrors((current) => ({ ...current, form: "Verification email sent again." }))
    } catch (error) {
      console.error("[RESEND VERIFICATION ERROR]", error)
      setErrors((current) => ({ ...current, form: "Unable to resend the verification email." }))
    }
  }

  async function handleCheckVerification() {
    const currentUser = verificationUser ?? auth.currentUser
    if (!currentUser) {
      setErrors((current) => ({ ...current, form: "No account is available to verify." }))
      return
    }

    try {
      await currentUser.reload()
      const refreshedUser = auth.currentUser
      if (refreshedUser && refreshedUser.emailVerified) {
        navigate("/app", { replace: true })
        return
      }

      setVerificationMessage("Your email is still unverified. Please check your inbox and try again.")
      setErrors((current) => ({ ...current, form: "Your email is still unverified. Please check your inbox and try again." }))
    } catch (error) {
      console.error("[CHECK VERIFICATION ERROR]", error)
      setErrors((current) => ({ ...current, form: "Unable to refresh verification status." }))
    }
  }

  return (
    <main className="relative flex min-h-svh items-center overflow-hidden bg-[#F3F6F1] px-4 py-8 sm:px-6">
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(#C9DCD5_1px,transparent_1px),linear-gradient(90deg,#C9DCD5_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <section className="hidden lg:block">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[#185B56] transition-colors hover:text-[#287A72]">
            <ArrowLeft className="size-4" aria-hidden="true" />
            RETINA-XAI
          </Link>
          <p className="mt-16 text-[10px] font-semibold tracking-[0.22em] text-[#287A72]">PHC SCREENING WORKSPACE</p>
          <h1 className="mt-4 max-w-md text-5xl font-semibold tracking-[-0.04em] text-[#173B3A]">Clinical clarity, one assisted screening at a time.</h1>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-[#587270]">A focused workspace for guided retinal capture, explainable screening assessment, and clinical follow-up.</p>
          <div className="mt-10 border-l-2 border-[#9EC9BD] pl-4 text-sm text-[#587270]">AI screening assessment<br />Not a confirmed diagnosis.</div>
        </section>

        <section className="mx-auto w-full max-w-md rounded-2xl border border-[#C9DCD5] bg-[#F9FBF8] p-5 shadow-[0_18px_42px_rgba(23,59,58,0.08)] sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Link to="/" className="text-xs font-bold tracking-[0.2em] text-[#185B56] lg:hidden">RETINA-XAI</Link>
              <p className="mt-3 text-[10px] font-semibold tracking-[0.2em] text-[#287A72]">SECURE ACCESS</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#173B3A]">{copy.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#587270]">{copy.description}</p>
            </div>
            <div className="hidden size-10 items-center justify-center rounded-full bg-[#E2F0ED] text-[#185B56] sm:flex" aria-hidden="true">
              <ArrowRight className="size-4" />
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 border-b border-[#C9DCD5]" role="tablist" aria-label="Authentication mode">
            {Object.entries(MODES).map(([key, item]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={mode === key}
                onClick={() => switchMode(key)}
                className={`min-h-11 border-b-2 text-[10px] font-semibold tracking-[0.16em] outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#3E9D96]/50 ${mode === key ? "border-[#287A72] text-[#185B56]" : "border-transparent text-[#758A87] hover:text-[#287A72]"}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <form className="mt-7 space-y-4" onSubmit={handleSubmit} noValidate>
            {mode === "signUp" && <Field id="fullName" label="Full Name" value={values.fullName} onChange={updateValue} autoComplete="name" error={errors.fullName} />}
            <Field id="emailOrId" label="Email / ID" type={mode === "signUp" ? "email" : "text"} value={values.emailOrId} onChange={updateValue} autoComplete="username" error={errors.emailOrId} />
            <Field id="password" label="Password" type="password" value={values.password} onChange={updateValue} autoComplete={mode === "signUp" ? "new-password" : "current-password"} error={errors.password} />
            {mode === "signUp" && <Field id="confirmPassword" label="Confirm Password" type="password" value={values.confirmPassword} onChange={updateValue} autoComplete="new-password" error={errors.confirmPassword} />}

            {mode === "signIn" && (
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={isSubmitting}
                className="inline-flex cursor-pointer items-center text-sm text-[#587270] underline-offset-4 transition-colors hover:text-[#185B56] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3E9D96]/50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Forgot password?
              </button>
            )}
            {(errors.form || resetMessage) && <p className="text-sm text-[#A24F4F]" role="alert">{errors.form || resetMessage}</p>}
            <Button type="submit" disabled={isSubmitting} className="min-h-12 w-full gap-2 font-semibold tracking-[0.08em]">
              {isSubmitting ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : null}
              {isSubmitting ? mode === "signUp" ? "CREATING ACCOUNT" : "SIGNING IN" : copy.submit}
            </Button>
          </form>

          {verificationMessage && (
            <div className="mt-5 rounded-xl border border-[#C9DCD5] bg-[#EEF5F3] p-4 text-sm text-[#173B3A]">
              <p className="font-medium text-[#185B56]">{verificationMessage}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" onClick={handleResendVerification} className="rounded-md border border-[#C9DCD5] bg-white px-3 py-2 text-xs font-medium text-[#185B56]">Resend verification email</button>
                <button type="button" onClick={handleCheckVerification} className="rounded-md border border-[#C9DCD5] bg-white px-3 py-2 text-xs font-medium text-[#185B56]">Refresh verification</button>
              </div>
            </div>
          )}

          <div className="my-6 flex items-center gap-3 text-[10px] font-semibold tracking-[0.16em] text-[#758A87]">
            <span className="h-px flex-1 bg-[#C9DCD5]" />
            OR
            <span className="h-px flex-1 bg-[#C9DCD5]" />
          </div>
          <button type="button" disabled={isSubmitting} onClick={handleGoogleSignIn} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-[#C9DCD5] bg-[#F3F6F1] text-sm font-medium text-[#758A87] disabled:cursor-not-allowed disabled:opacity-80">
            <Globe2 className="size-4" aria-hidden="true" />
            {isSubmitting ? "CONNECTING TO GOOGLE..." : "Continue with Google"}
          </button>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-[#758A87]">Use your Google account to continue.</p>
          {mode === "signUp" && <p className="mt-5 text-center text-[11px] leading-relaxed text-[#758A87]">By creating access, you acknowledge the screening workspace terms and privacy notice.</p>}
          <p className="mt-6 text-center text-[10px] font-medium tracking-[0.1em] text-[#758A87]">DEMO MODE · NO AUTH PROVIDER CONFIGURED</p>
        </section>
      </div>
    </main>
  )
}
