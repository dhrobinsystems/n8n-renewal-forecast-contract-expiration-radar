# ⚠️ Disclaimer & Liability Limitation

**Use at your own risk.** The code, workflows, and scripts in this repository (`n8n-renewal-forecast-contract-expiration-radar`) are provided for educational and architectural demonstration purposes.

**No Liability:** The author and dhRobin Systems accept no responsibility or liability for any direct, indirect, incidental, or consequential damages that result from using, misusing, or deploying these scripts. That includes, without limitation, missed or late renewals, lapsed or auto-renewed contracts, churn, lost or misstated revenue, inaccurate renewal forecasts, duplicate or missing renewal deals, wrongly assigned deal owners, changed deal stages, and corrupted or overwritten CRM records.

**No Warranty:** All software, n8n JSON blueprints, JavaScript modules, milestone rules, threshold defaults and forecast calculations are provided "AS IS", without warranty of any kind, express or implied. This includes, but is not limited to, warranties of merchantability, fitness for a particular purpose, and non-infringement. Renewal dates, ARR figures and forecasts are only as accurate as the CRM data they are calculated from, and they are not a substitute for the signed contract.

**Production Testing Required:** Always test thoroughly in an isolated staging environment, such as a HubSpot developer test account or sandbox account, with `SANDBOX_MODE=true`, `DRY_RUN=true` and `RENEWAL_DEALS_CREATION_ENABLED=false` enabled, before you connect live HubSpot credentials or Slack webhooks. Treat every provisioned renewal deal, proposed stage change and Account Manager alert as a draft that a person must review. Confirm your pipeline IDs, stage IDs, property names and association types in the target portal before you enable writes.

**Contract Terms Are Your Responsibility:** This workflow reads dates and amounts from CRM properties. It does not read or interpret contracts, notice periods, auto-renewal clauses, termination rights or pricing terms. Notice deadlines can fall well before the contract end date, so you must confirm every renewal deadline against the signed agreement.

**Third-Party APIs & Compliance:** You alone are responsible for complying with the terms of service, rate limits, data privacy regulations (GDPR/CCPA and others), and security policies of HubSpot, Slack, n8n and any connected services. That includes protecting your HubSpot private app token and webhook URLs, limiting the token to the scopes this workflow needs, keeping customer and contact personal data out of Slack alerts and logs, respecting your internal access controls for revenue data, and reviewing every automatically created or updated record.

The full disclaimer is also available in `DISCLAIMER.md`.

## License

Released under the MIT License. Copyright (c) 2026 DH Robin (dhRobin Systems). See `LICENSE`.

---

Full text: DISCLAIMER.md · Licensed under the MIT License. License: MIT © 2026 DH Robin (dhRobin Systems) · Provided as-is, see the disclaimer.
