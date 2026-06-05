/** Parse outbound campaign params from URL → lead payload + analytics */

export type LeadAttribution = {
  lead_source: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  copy_variant?: string;
};

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

export function parseAttributionFromSearchParams(
  params: URLSearchParams
): LeadAttribution {
  const leadSource = params.get("source")?.trim() || "website";
  const attribution: LeadAttribution = { lead_source: leadSource };

  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) {
      attribution[key] = value;
    }
  }

  const variant = params.get("v")?.trim();
  if (variant) {
    attribution.copy_variant = variant;
  }

  return attribution;
}

export function attributionToHiddenFields(
  attribution: LeadAttribution
): Record<string, string> {
  const fields: Record<string, string> = {
    lead_source: attribution.lead_source,
  };

  for (const key of UTM_KEYS) {
    const value = attribution[key];
    if (value) {
      fields[key] = value;
    }
  }

  if (attribution.copy_variant) {
    fields.copy_variant = attribution.copy_variant;
  }

  return fields;
}

export function buildStartUrl(
  options: {
    need?: "website" | "automation" | "both";
    source: string;
  },
  forward?: Partial<Record<(typeof UTM_KEYS)[number] | "v", string | undefined>>
): string {
  const params = new URLSearchParams();
  params.set("source", options.source);
  if (options.need) {
    params.set("need", options.need);
  }

  if (forward) {
    for (const key of UTM_KEYS) {
      const value = forward[key]?.trim();
      if (value) {
        params.set(key, value);
      }
    }
    const variant = forward.v?.trim();
    if (variant) {
      params.set("v", variant);
    }
  }

  return `/start?${params.toString()}`;
}
