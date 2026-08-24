# Premium conversion experience

This branch replaces the GoDaddy-faithful layout with a **conversion-first** presentation inspired by high-performing cosmetic surgery sites (procedure-specific journeys, trust before ask, persistent CTAs, concierge storytelling).

## Design references (patterns, not copies)

- **Procedure-specific landing architecture** — filtered procedure discovery instead of a flat grid ([Medical Marketing Firm CPA case study](https://medicalmarketingfirm.com/case-studies/plastic-surgery-landing-page-cpa-reduction/)).
- **Trust → education → consult** homepage flow ([Bajaj Plastic Surgery / Aesthetic Brand Marketing](https://www.aestheticbrandmarketing.com/portfolio/bajaj-plastic-surgery/)).
- **Single-column narrative + sticky consult bar** ([Rocket.new Consult template patterns](https://www.rocket.new/templates/consult-transformative-surgeon-landing-page-template)).
- **12-section conversion frameworks** for medical tourism / high-intent queries ([Elaen case study](https://tandemmedicalmarketing.com/case-studies/elaen-plastic-surgery/)).

## What changed

| Area | Behavior |
|------|----------|
| Home | Testimonial-led hero, trust strip, filterable procedure cards, 4-step concierge journey, bento “difference”, travel block, gradient final CTA |
| Inner pages | Shorter hero + **sticky consultation rail** (desktop) |
| Global | Sticky bottom bar after scroll; header **Free consult** pill; DM Sans + Cormorant typography |
| Content | Same JSON / routes / copy sources — new components under `src/components/experience/` |

Toggle experience mode in `src/lib/experience.ts` (`SITE_EXPERIENCE`).

## Run

```bash
npm run dev   # http://localhost:3010
```
