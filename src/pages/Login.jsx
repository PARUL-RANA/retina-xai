import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import ConnectivityIndicator from "@/components/app-shell/ConnectivityIndicator"

export default function Login() {
  const navigate = useNavigate()
  const [emailOrId, setEmailOrId] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = {}
    if (!emailOrId.trim()) {
      nextErrors.emailOrId = "Email / ID is required."
    }
    if (!password) {
      nextErrors.password = "Password is required."
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      navigate("/app")
    }
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-4 py-8">
      <section className="w-full max-w-sm rounded-xl border border-border/80 bg-card/90 p-6 shadow-2xl shadow-black/10 sm:p-8">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">RETINA-XAI</p>
          <h1 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
            Sign in to Screening
          </h1>
        </div>

        <form className="mt-7 space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <label htmlFor="email-or-id" className="text-sm font-medium text-foreground">
              Email / ID
            </label>
            <input
              id="email-or-id"
              name="emailOrId"
              type="text"
              value={emailOrId}
              onChange={(event) => setEmailOrId(event.target.value)}
              autoComplete="username"
              aria-invalid={Boolean(errors.emailOrId)}
              aria-describedby={errors.emailOrId ? "email-or-id-error" : undefined}
              className="flex h-11 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
            {errors.emailOrId && (
              <p id="email-or-id-error" className="text-sm text-destructive" role="alert">
                {errors.emailOrId}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
              className="flex h-11 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
            {errors.password && (
              <p id="password-error" className="text-sm text-destructive" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          <Button type="submit" className="min-h-12 w-full text-sm">
            Sign in
          </Button>
        </form>

        <button
          type="button"
          className="mx-auto mt-5 block text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Forgot password?
        </button>

        <ConnectivityIndicator status="ONLINE" className="mx-auto mt-7" />
      </section>
    </main>
  )
}
