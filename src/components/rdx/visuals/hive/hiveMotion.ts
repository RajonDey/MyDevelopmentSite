/** Shared hive motion language — keep marks in sync with the hero diagram. */
export const hiveMotion = {
  /** Continuous hex field / cluster drift. */
  drift: {
    duration: 4.8,
    ease: "easeInOut" as const,
    stagger: 0.28,
    /** svg units — readable movement, not a micro-nudge */
    amount: 6.5,
  },
  /** Accent breathe / pulse (matches hero CRM ring). */
  breath: {
    duration: 3.2,
    ease: "easeInOut" as const,
  },
  /** Bee / courier path (matches hero flight loop). */
  flight: {
    duration: 5.5,
    ease: "easeInOut" as const,
  },
} as const;
