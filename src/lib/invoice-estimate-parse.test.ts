import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseInvoiceEstimate } from "./invoice-estimate-parse.ts";

const sample = `
## Features Development — 25.5 hrs
- Moved branch admin creation to super admin — 1 hr
- Added partial/mock lists in slot creation and two tabs in assign tests panel — 1.5 hrs
- Paused direct result publishing to students (mock) — 30 min
- Added remove and reassign functionality to assign test system — 1 hr
- Added ESC with password system — 1 hr
- Updated auto-download to manual download system — 30 min
- Added writing input formatting — 30 min
- Separated GT mock and regular mock — 30 min
- Added ZIP download for raw results in branch admin panel — 1 hr
- Updated automated seat release system — 1 hr
- Updated Writing AI system with new format — 6.5 hrs
- Added backup paper download system to examiner panel — 1 hr
- Added Excel-like marking system with manual editing — 2 hrs
- Added test review system to branch admin panel — 2 hrs
- Improved response speed and site smoothness — 2 hrs
- Created subdomains and pointed them to Test and HICU platforms — 1 hr
- Deployment and testing — 2 hrs

## Test Paper Preparation — 20 hrs
- Test Mock 08 & 09
  - Reading, Listening, Writing: 5 hrs × 2 = 10 hrs
- GT Mock 01 & 02
  - Reading, Listening, Writing: 5 hrs × 2 = 10 hrs

*Total: 45.5 hrs*

Deployment: 1 hr
Invoice: 45.5 hrs × $8 = $368; $368 × 123 = 44,772 BDT

After Discount: 44772 - 3000 = 41772 BDT
`;

describe("parseInvoiceEstimate", () => {
  it("bills task times, not the heading total, and reads minutes", () => {
    const parsed = parseInvoiceEstimate(sample);
    const features = parsed.lines.find((line) =>
      line.description.startsWith("Features")
    );
    const papers = parsed.lines.find((line) =>
      line.description.startsWith("Test Paper")
    );

    assert.equal(parsed.lines.length, 2);
    assert.equal(features?.quantity, 25);
    assert.equal(papers?.quantity, 20);
    assert.equal(papers?.details?.length, 2);
    assert.match(papers?.details?.[0].text ?? "", /Test Mock 08 & 09 — Reading/);
    assert.equal(parsed.hourlyRateUsd, 8);
    assert.equal(parsed.usdBdtRate, 123);
    assert.equal(parsed.discountBdt, 3000);
    assert.equal(parsed.amountDueBdt, 41772);
    assert.equal(
      parsed.lines.some((line) => line.description === "Deployment"),
      false
    );
    assert.match(parsed.warnings.join("\n"), /25\.5/);
    assert.match(parsed.warnings.join("\n"), /below the total/);
  });

  it("keeps a heading total when the tasks have no times", () => {
    const parsed = parseInvoiceEstimate(`
## Admin Panel Features — 16 hrs
- Add and manage branches. ✅
- Provide feedback. ✅ (AI assisted not done)

Deployment: 1hr
Invoice: 36*$8= $288; $288*123=35424
`);

    assert.equal(parsed.lines.length, 2);
    assert.equal(parsed.lines[0].quantity, 16);
    assert.equal(parsed.lines[0].details?.[0].done, true);
    assert.equal(parsed.lines[0].details?.[1].note, "AI assisted not done");
    assert.equal(parsed.lines[1].description, "Deployment");
    assert.equal(parsed.lines[1].quantity, 1);
    assert.equal(parsed.hourlyRateUsd, 8);
    assert.equal(parsed.usdBdtRate, 123);
    assert.equal(parsed.statedBdt, 35424);
  });

  it("reads minutes, mixed clocks, and x multipliers", () => {
    const parsed = parseInvoiceEstimate(`
## Support
- Call back — 30 minutes
- Rewrite — 1 hr 30 min
- Papers — 5 hrs x 2 = 10 hrs
`);

    assert.equal(parsed.lines[0].quantity, 12);
  });
});
