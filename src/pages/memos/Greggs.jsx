import { Link } from 'react-router-dom'
import Container from '../../components/Container.jsx'
import Reveal from '../../components/Reveal.jsx'
import { Banner, Callout, Disclaimer, Section } from '../../components/Prose.jsx'

const valuation = [
  ['P/E on flat forward year', '~15-16x'],
  ['Free-cash-flow yield (forward)', '~6-7%'],
  ['Dividend', 'Held through the weak year'],
]

const falsifiers = [
  'Forward capital-expenditure guidance failing to step down as expected. The thesis rests on this; if it slips, there is nothing left of the case.',
  'Company-managed like-for-like sales negative in two consecutive periods, indicating estate saturation.',
  'Operating margin failing to recover, which would mean the prior compression was structural and the cause was misread.',
  'A dividend cut after guiding to a cash inflection, which would tell us the cash is not arriving.',
]

export default function Greggs() {
  return (
    <Container narrow className="py-12 sm:py-16">
      <Link to="/research" className="text-sm text-mute transition-colors hover:text-ink">
        Back to research
      </Link>

      <Reveal className="mt-8">
        <Banner>
          Illustrative sample memo, written to demonstrate the house standard. Figures are drawn
          from public reporting and should be verified against primary filings before any
          reliance. Not investment advice.
        </Banner>

        <p className="mt-10 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-blue">
          GRG.L · Consumer / Food-on-the-go
        </p>
        <h1 className="mt-3 font-display text-[clamp(1.9rem,5.5vw,3rem)] leading-[1.1] tracking-[-0.02em]">
          A staple priced off flat earnings, mispriced on cash.
        </h1>
        <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-mute">
          Author: [Name] · Sample memo · Illustrative
        </p>
      </Reveal>

      <Callout label="Recommendation">
        Buy. Indicative 7% position. Review on publication of the next full-year results and
        forward capital-expenditure guidance.
      </Callout>

      <Section number="01" title="The business">
        <p>
          Greggs sells low-cost food-on-the-go through a large UK shop estate. The feature that
          distinguishes it from a typical food-to-go chain is vertical integration: it owns its
          bakeries and distribution and supplies its own shops, where most competitors buy
          finished product from third parties. That integration is why it can hold a price point
          rivals struggle to match, and also why it carries manufacturing capital a normal
          retailer does not.
        </p>
        <p>
          Two segments: company-managed shops, the large majority of revenue, and a
          capital-light franchise estate concentrated in travel and forecourt sites. Two
          developments are easy to overlook. Delivery has become a meaningful share of
          managed-shop sales, and the loyalty app now features in a rising proportion of
          transactions, giving Greggs first-party data on a large share of its customers that it
          did not previously hold.
        </p>
      </Section>

      <Section number="02" title="The thesis">
        <p className="font-display text-[1.2rem] leading-snug">
          The market is pricing off flat earnings guidance and missing that the
          capital-investment cycle has peaked.
        </p>
        <p>
          The prior year was weak on the income statement: operating margin compressed as
          legislated wage increases arrived and could not be fully passed through in a business
          that competes on price. The market read that compression as structural and de-rated
          the shares.
        </p>
        <p>
          Two things then changed. First, the wage step began to annualise out, with
          cost-inflation assumptions revised down and no further pricing action flagged, which
          is the profile of margin recovery before it appears in the headline number. Second,
          and more importantly, capital expenditure has peaked. After a multi-year supply-chain
          build-out, guidance steps down materially over the next two years while operating cash
          flow continues to grow. A business generating roughly flat profit but a large positive
          swing in free cash flow is not the same business the market is pricing.
        </p>
        <p>
          The re-rating is only partly done. Consensus targets remain anchored to the earnings
          line rather than the cash-flow inflection, which is where the disagreement, and the
          opportunity, sits.
        </p>
      </Section>

      <Section number="03" title="Valuation">
        <p>
          On earnings the shares are not obviously cheap: a fair mid-teens multiple on a flat
          year. The argument is on cash. As capital expenditure falls against still-growing
          operating cash flow, free cash flow moves from close to breakeven toward a
          high-single-digit yield on the current market capitalisation, for a business still
          opening net new shops and taking share in a shrinking market.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[0.92rem]">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="py-2.5 pr-4 font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] text-mute">
                  Basis
                </th>
                <th className="py-2.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] text-mute">
                  Illustrative
                </th>
              </tr>
            </thead>
            <tbody>
              {valuation.map(([basis, value]) => (
                <tr key={basis} className="border-b border-line">
                  <td className="py-2.5 pr-4">{basis}</td>
                  <td className="py-2.5 font-mono text-[0.88rem]">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          What is being paid for: a mid-teens multiple today in exchange for a business
          converting to a 6-7% free-cash-flow yield with its reinvestment runway intact. What is
          not being underwritten: any multiple re-rating. If the multiple holds, the return
          comes from cash generation and mid-single-digit growth, an acceptable outcome on its
          own.
        </p>
      </Section>

      <Section number="04" title="Risks">
        <p>
          <strong className="font-medium">Saturation.</strong> A large existing estate raises the
          risk that new sites cannibalise old ones. The opening programme has already been
          trimmed; the gap between total and like-for-like sales is the number to watch.
        </p>
        <p>
          <strong className="font-medium">Labour cost is policy, not market.</strong> Further
          statutory wage or employer-tax increases hit a low-ticket, staff-heavy business harder
          than most, and sit outside management control.
        </p>
        <p>
          <strong className="font-medium">The consumer.</strong> Like-for-like growth is thin.
          The top line depends on continuing to take share rather than on a growing market.
        </p>
        <p>
          <strong className="font-medium">Dietary shift.</strong> Longer-term demand risk from
          weight-management drugs on calorie-dense convenience food. Flagged as a genuine
          unknown rather than sized; the honest position is that we do not have a confident
          view.
        </p>
      </Section>

      <Section number="05" title="What would prove us wrong">
        <ul className="space-y-3">
          {falsifiers.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          Where we are most likely to be wrong: the cash-flow case extrapolates full-year
          conversion from limited data in a seasonal business. If second-half conversion is
          materially weaker, the free-cash-flow figures are too generous and the thesis is
          thinner than presented.
        </p>
      </Section>

      <Disclaimer>
        This memo is educational and is not investment advice. Companies and figures shown
        during launch are illustrative.
      </Disclaimer>
    </Container>
  )
}
