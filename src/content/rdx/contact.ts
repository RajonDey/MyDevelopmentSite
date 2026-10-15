/** Public + ops mailboxes. Resend FROM stays on the verified rajondey.com sender. */

export const contactEmails = {
  hello: "hello@rdxhive.com",
  sales: "sales@rdxhive.com",
  team: "team@rdxhive.com",
  support: "support@rdxhive.com",
} as const;

/** Free Resend plan — rdxhive.com is not a verified sending domain yet. */
export const resendFromFallback = "contact@rajondey.com";
