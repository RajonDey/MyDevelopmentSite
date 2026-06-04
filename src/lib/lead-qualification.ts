/** Budget bands that qualify for a 15-min review call — Phase 13 */

const QUALIFIED_BUDGETS = new Set([
  "1500-3000",
  "3000-5000",
  "5000-plus",
]);

export function isQualifiedForReviewCall(
  payload: Record<string, string>
): boolean {
  const budget = payload.budget;
  if (budget && QUALIFIED_BUDGETS.has(budget)) {
    return true;
  }

  const band = payload.scope_band ?? "";
  if (band.includes("$5,000+") || band.includes("$3,000")) {
    return true;
  }
  if (band.includes("$1,500")) {
    return true;
  }

  return false;
}

export function isQualifiedBudget(budget: string): boolean {
  return QUALIFIED_BUDGETS.has(budget);
}
