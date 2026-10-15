export const CONSENT_STORAGE_KEY = "rdx-cookie-consent";
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

/** Runs before GTM: Consent Mode v2 defaults to denied unless a fresh "granted" choice is stored. */
export const consentDefaultScript = `
window.dataLayer = window.dataLayer || [];
window.gtag = function(){window.dataLayer.push(arguments);};
var rdxConsent = 'denied';
try {
  var stored = JSON.parse(localStorage.getItem('${CONSENT_STORAGE_KEY}') || 'null');
  if (stored && stored.value === 'granted' && Date.now() - stored.ts < ${CONSENT_MAX_AGE_MS}) rdxConsent = 'granted';
} catch (e) {}
window.gtag('consent', 'default', {
  analytics_storage: rdxConsent,
  ad_storage: rdxConsent,
  ad_user_data: rdxConsent,
  ad_personalization: rdxConsent,
  wait_for_update: 500
});
`;
