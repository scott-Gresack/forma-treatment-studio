# Forma measurement kit

This is the quickest path for engineering and marketing teams to measure the treatment acceptance journey.

## 1. Install once

The current site already includes the shared loader in `analytics.js`. It initializes:

- GA4: `G-Y8617TLMYK`
- Microsoft Clarity: `pmp4efispy`
- PostHog: configured in `analytics.js`
- `window.digitalData` for the data layer

For another static page, add this before `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Y8617TLMYK"></script>
<script src="analytics.js" defer></script>
```

Do not add a second page-view tag. The shared loader owns page views and event forwarding.

## 2. Use the shared event vocabulary

```js
window.formaTrack('appointment_booked', {
  case_id: 'implant',
  payment_mode: 'finance'
});
```

Available events:

| Event | Business meaning |
| --- | --- |
| `demo_view` | A workspace or patient view was opened |
| `demo_case_start` | A treatment conversation began |
| `payment_path_selected` | A patient chose cash, financing, or staged care |
| `offer_selected` | A financing option was compared or selected |
| `appointment_booked` | The case reached a scheduled next step |
| `followup_requested` | The patient asked for a conversation |
| `refund_issued` | A plan change reached reconciliation |
| `demo_reset` | The demo was reset |

Use stable categories such as `case_id`, `payment_mode`, `path`, and `view_name`. Never send names, email addresses, phone numbers, free-text questions, search terms, clinical notes, or financial account details.

## 3. Marketing scorecard

Create these GA4 explorations or dashboard cards:

1. **Plan-to-appointment rate**: `appointment_booked / demo_case_start`
2. **Funding path rate**: `payment_path_selected / demo_case_start`
3. **Funding gap rate**: count of partial-approval cases reaching `followup_requested`
4. **Time to next step**: time between `demo_case_start` and `appointment_booked`
5. **Reconciliation volume**: count and value of `refund_issued`

## 3a. Recommended GA4 audiences

Create these audiences in **Admin → Data display → Audiences** using the event parameters emitted by `analytics.js`:

- **High-value funding explorers**: `funding_interest = active` and `treatment_value_band` is `high_10k_20k` or `high_20k_plus`.
- **Presented, not scheduled**: `demo_case_start` exists and `appointment_booked` does not exist within 7 days.
- **Highly engaged coordinators**: `engagement_level = high` and `journey_stage` is `funding` or `follow_up`.
- **Accepted next step**: `conversion_signal = accepted_next_step`.
- **Plan-change workflow users**: `journey_stage = reconciled`.

These are aggregate behavioral audiences. They do not contain patient identity or free-text data. Register the parameters as custom dimensions in GA4 if you want them available in standard reports.

The executive story is simple: Forma helps practices move more approved treatment from presentation to scheduled care, while making funding gaps and plan changes visible.

## 4. Monetization model

Use a value-based conversation with practices:

```text
Incremental accepted treatment value
− Forma subscription
− financing and communication costs
= practice ROI
```

Recommended packaging:

- **Starter**: one location, patient presentation, event tracking, basic follow-up
- **Growth**: financing orchestration, reminders, refund ledger, conversion reporting
- **Group**: multi-location benchmarks, roles, integrations, centralized governance

Charge for operational value, not for individual patient events. Keep the patient experience transparent and never monetize or sell patient data.

## 5. QA before launch

- Open the site with `?debug=true` and confirm the data-layer log.
- Confirm one `page_view` per page load.
- Complete a case start, payment choice, appointment, and refund scenario.
- Check GA4 DebugView, Clarity events, and PostHog events.
- Verify that payloads contain no patient identity or free-text values.
