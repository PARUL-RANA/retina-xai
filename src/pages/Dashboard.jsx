import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-4">
      <div className="glass w-full max-w-md rounded-2xl p-8 text-center">
        <p className="text-sm font-semibold tracking-[0.18em] text-foreground">RETINA-XAI</p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Dashboard views arrive in a later stage. This route is a placeholder shell.
        </p>
        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button nativeButton={false} render={<Link to="/" />}>Back to Home</Button>
          <Button variant="outline" nativeButton={false} render={<Link to="/analysis" />}>
            Open Analysis
          </Button>
        </div>
      </div>
    </div>
  )
}
