const SESSION_KEY = "retina-xai-screening-session"

export function saveScreeningSession(session) {
  if (typeof window === "undefined") return
  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function getScreeningSession() {
  if (typeof window === "undefined") return null

  try {
    const value = window.sessionStorage.getItem(SESSION_KEY)
    return value ? JSON.parse(value) : null
  } catch {
    return null
  }
}
