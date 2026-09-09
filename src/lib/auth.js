export function createAuthSession(identity) {
  return identity
}

export function hasAuthSession() {
  if (typeof window === "undefined") return false
  return Boolean(window.sessionStorage.getItem("retina-xai-auth-session"))
}

export function clearAuthSession() {
  if (typeof window === "undefined") return
  window.sessionStorage.removeItem("retina-xai-auth-session")
}
