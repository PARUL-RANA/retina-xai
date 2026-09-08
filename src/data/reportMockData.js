const DEFAULT_REPORT = {
  date: "07 Sep 2026",
  severity: {
    label: "Moderate NPDR",
    level: 2,
  },
  assessmentType: "AI screening assessment",
  disclaimer: "Not a confirmed diagnosis",
  referable: true,
  confidence: 91,
  images: {
    original: null,
  },
  lesions: {
    microaneurysms: 17,
    hemorrhages: 5,
    hardExudates: 4,
  },
}

export function getMockReport(patientId) {
  return {
    ...DEFAULT_REPORT,
    patientId,
    severity: { ...DEFAULT_REPORT.severity },
    images: { ...DEFAULT_REPORT.images },
    lesions: { ...DEFAULT_REPORT.lesions },
  }
}
