import { auth, db } from "@/lib/firebase"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"

export async function getCurrentUserPhcId() {
  const user = auth.currentUser
  if (!user) {
    throw new Error("Authentication required to save patient data.")
  }

  const profileRef = doc(db, "users", user.uid)
  const profileSnap = await getDoc(profileRef)
  const phcId = profileSnap.exists() ? profileSnap.data().phcId : null

  if (!phcId) {
    throw new Error("Your clinic profile is missing PHC details.")
  }

  return phcId
}

export async function savePatientRecord(patientInput = {}) {
  const user = auth.currentUser
  if (!user) {
    throw new Error("Authentication required to save patient data.")
  }

  const patientId = String(patientInput.patientId ?? "").trim()
  const patientName = String(patientInput.patientName ?? "").trim()
  const age = Number(patientInput.age)
  const diabetesDuration = Number(patientInput.diabetesDuration)

  if (!patientId) {
    throw new Error("Patient ID is required.")
  }

  if (!patientName) {
    throw new Error("Patient name is required.")
  }

  if (!Number.isFinite(age) || age <= 0) {
    throw new Error("Enter a valid positive age.")
  }

  if (!Number.isFinite(diabetesDuration) || diabetesDuration < 0) {
    throw new Error("Enter a valid diabetes duration in years.")
  }

  const phcId = await getCurrentUserPhcId()
  const profileRef = doc(db, "users", user.uid)
  const profileSnap = await getDoc(profileRef)
  const profile = profileSnap.exists() ? profileSnap.data() : null
  const patientRef = doc(db, "patients", patientId)
  const existingSnap = await getDoc(patientRef)

  if (existingSnap.exists()) {
    const existing = existingSnap.data() ?? {}
    const existingPhcId = existing.phcId ?? phcId

    if (existingPhcId && existingPhcId !== phcId) {
      throw new Error("This patient belongs to a different PHC and cannot be moved.")
    }

    const updatedPatient = {
      ...existing,
      patientId,
      patientName,
      age,
      diabetesDuration,
      phcId: existingPhcId,
      createdBy: existing.createdBy || user.uid,
      createdAt: existing.createdAt ?? serverTimestamp(),
    }

    await setDoc(patientRef, updatedPatient, { merge: true })
    return updatedPatient
  }

  const payload = {
    patientId,
    patientName,
    age,
    diabetesDuration,
    phcId,
    createdBy: user.uid,
    createdAt: serverTimestamp(),
  }

  console.log("[PATIENT CREATE DEBUG] currentUser.uid =", user?.uid)
  console.log("[PATIENT CREATE DEBUG] payload =", payload)
  console.log("[PATIENT CREATE DEBUG] payload.patientId =", payload?.patientId)
  console.log("[PATIENT CREATE DEBUG] payload.patientName =", payload?.patientName)
  console.log("[PATIENT CREATE DEBUG] payload.age =", payload?.age)
  console.log("[PATIENT CREATE DEBUG] payload.diabetesDuration =", payload?.diabetesDuration)
  console.log("[PATIENT CREATE DEBUG] payload.phcId =", payload?.phcId)
  console.log("[PATIENT CREATE DEBUG] payload.createdBy =", payload?.createdBy)
  console.log("[PATIENT CREATE DEBUG] payload.createdAt =", payload?.createdAt)
  console.log("[PATIENT CREATE DEBUG] user profile =", profile)
  console.log("[PATIENT CREATE DEBUG] profile.phcId =", profile?.phcId)

  try {
    await setDoc(patientRef, payload)
  } catch (error) {
    console.error("[PATIENT CREATE ERROR]", error)
    console.error("[PATIENT CREATE ERROR CODE]", error?.code)
    console.error("[PATIENT CREATE ERROR MESSAGE]", error?.message)
    throw error
  }

  return payload
}
