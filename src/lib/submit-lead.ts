import { FORMSPREE_ENDPOINT } from "@/content/rdx/forms";
import type { LeadFormType } from "@/types/rdx/lead";

type SubmitLeadOptions = {
  formType: LeadFormType;
  form: HTMLFormElement;
};

async function submitViaFormspree(
  formType: LeadFormType,
  formData: FormData
): Promise<{ ok: true } | { ok: false; error: string }> {
  formData.set("form_type", formType);
  formData.set(
    "_subject",
    formType === "start" || formType === "audit"
      ? "RDX Review Request"
      : "RDX Contact Inquiry"
  );

  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    return {
      ok: false,
      error: "Submission failed. Email contact@rajondey.com directly.",
    };
  }

  return { ok: true };
}

export async function submitLeadForm({
  formType,
  form,
}: SubmitLeadOptions): Promise<{ ok: true } | { ok: false; error: string }> {
  const formData = new FormData(form);
  const payload: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && !["form_type", "_subject", "_next"].includes(key)) {
      if (key === "agency_name" || key === "contact_name" || key === "email") {
        continue;
      }
      payload[key] = value;
    }
  }

  const response = await fetch("/api/leads/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      formType,
      agencyName: String(formData.get("agency_name") ?? ""),
      contactName: String(formData.get("contact_name") ?? ""),
      email: String(formData.get("email") ?? ""),
      payload,
    }),
  });

  if (response.ok) {
    return { ok: true };
  }

  if (response.status === 503) {
    return submitViaFormspree(formType, new FormData(form));
  }

  const data = (await response.json().catch(() => null)) as {
    error?: string;
  } | null;

  return { ok: false, error: data?.error ?? "Submission failed" };
}
