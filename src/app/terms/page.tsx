import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | Resonant Frequency Studio',
  description:
    'Review the terms and conditions that govern projects with Resonant Frequency Studio, a California-based web design and software development studio.',
};

const sections = [
  {
    title: 'Overview & Acceptance',
    body: [
      'These Terms & Conditions (“Terms”) govern all proposals, projects, and services provided by Resonant Frequency Studio (“we,” “our,” or “us”), a California web design and software development studio. By engaging our services, signing a proposal, submitting payment, or using our website, you agree to these Terms.',
      'If you are accepting on behalf of a company or organization, you represent that you have the authority to bind that entity. Conflicts between these Terms and a signed master services agreement (if applicable) will be resolved in favor of the signed agreement.',
    ],
  },
  {
    title: 'Services & Scope',
    body: [
      'We deliver web strategy, interface design, brand systems, front-end and back-end development, and related consulting. The specific scope of work, deliverables, timeline, and fees will be outlined in a proposal, statement of work, or project brief approved by both parties.',
      'Requests outside the approved scope will be treated as change orders and may adjust the timeline and fees. We will provide an estimate and secure written approval before proceeding with out-of-scope work.',
    ],
  },
  {
    title: 'Proposals, Fees & Payments',
    body: [
      'All quotes are valid for 30 days unless otherwise stated. Fees are typically billed according to milestones or monthly retainers. Invoices are due net 15 unless a different schedule is specified in writing.',
      'Late payments may incur a finance charge of 1.5% per month (18% annually) or the maximum rate permitted by California law. We reserve the right to suspend work, withhold deliverables, or delay launch until outstanding invoices are satisfied.',
    ],
  },
  {
    title: 'Client Responsibilities',
    body: [
      'You agree to provide timely access to content, assets, logins, and decision-makers, and to supply feedback within the agreed review windows. Delays in approvals or delivery of required materials may shift the project timeline and could result in additional costs.',
      'You represent that all content you supply does not infringe third-party rights, comply with applicable laws, and may be used by us for the project. You retain all rights to your pre-existing materials.',
    ],
  },
  {
    title: 'Intellectual Property',
    body: [
      'Upon receipt of full payment, we grant you a non-exclusive, perpetual license to use the final project deliverables for the specified use case. We retain ownership of our pre-existing tools, design systems, development frameworks, and processes, and may reuse generalized knowledge and patterns in future work.',
      'Unless otherwise agreed, we may showcase completed work in our portfolio, case studies, proposals, and social channels. If confidentiality is required, please notify us prior to project kickoff so it can be reflected in the agreement.',
    ],
  },
  {
    title: 'Confidentiality & Data Security',
    body: [
      'Each party agrees to keep the other party’s confidential information secure and to use it solely for the purpose of performing the project. Confidential information excludes materials already known to the receiving party, publicly available, or obtained legitimately from a third party.',
      'We apply commercially reasonable safeguards to protect project data, but you acknowledge that no system is impenetrable. Please notify us promptly of any suspected security incidents related to the project.',
    ],
  },
  {
    title: 'Warranties & Disclaimers',
    body: [
      'We warrant that the services will be performed in a professional manner consistent with industry standards. Except as expressly provided, the deliverables are provided “as is” and we disclaim all other warranties, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
      'We do not guarantee third-party platform performance, search engine rankings, ad campaign outcomes, or uninterrupted system uptime. Hosting, domain registration, and third-party licenses are the client’s responsibility unless otherwise specified.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'To the fullest extent permitted by law, neither party will be liable for indirect, incidental, special, or consequential damages. Our aggregate liability for any claim arising out of these Terms or a project will not exceed the total fees paid to us for the services giving rise to the claim.',
      'This limitation does not apply to violations of confidentiality obligations, intellectual property infringement, or payment obligations.',
    ],
  },
  {
    title: 'Indemnification',
    body: [
      'You agree to indemnify and hold us harmless from any claims, damages, or expenses arising out of content or materials you provide, your misuse of the deliverables, or your violation of applicable laws. We agree to indemnify you against claims alleging that our original work infringes third-party intellectual property rights, subject to limitations stated in the project agreement.',
    ],
  },
  {
    title: 'Project Suspension & Termination',
    body: [
      'Either party may terminate a project for material breach if the breach is not cured within 14 days of written notice. If you terminate for convenience, you agree to pay for work completed through the termination date and any non-cancellable commitments we have incurred.',
      'In the event of termination, you will have the right to receive completed deliverables upon payment of outstanding invoices, and both parties will return or destroy confidential information upon request.',
    ],
  },
  {
    title: 'Governing Law & Dispute Resolution',
    body: [
      'These Terms are governed by the laws of the State of California, without regard to conflict of laws principles. Any disputes shall be resolved in the state or federal courts located in Sonoma County, California, and each party consents to the exclusive jurisdiction of those courts.',
      'Before pursuing litigation, the parties agree to attempt to resolve disputes through good-faith discussions and, if mutually agreed, mediation.',
    ],
  },
  {
    title: 'Changes to These Terms',
    body: [
      'We may update these Terms to reflect business, legal, or technical changes. Revised Terms will be posted on this page with an updated “Last Updated” date. Continued use of our services after changes become effective constitutes acceptance of the revised Terms.',
    ],
  },
  {
    title: 'Contact',
    body: [
      'For questions about these Terms or to discuss a potential project, please contact us at: hello@resonantfrequency.studio or +1.707.595.8958.',
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#121212] text-[#E4E4DE]">
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(89,95,57,0.25)_0%,rgba(18,18,18,1)_60%)]" />
        <div className="container relative z-10 mx-auto max-w-5xl px-6">
          <span className="text-sm uppercase tracking-[0.4em] text-[#ACAF9C]">
            Terms &amp; Conditions
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-6xl">
            Clear terms so every build stays aligned, on-time, and on-brand.
          </h1>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-3xl text-lg text-[#E4E4DE]/80">
              Last Updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#ACAF9C] transition hover:text-[#E4E4DE]"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(89,95,57,0.15)_0%,rgba(18,18,18,1)_60%)]" />
        <div className="container relative z-10 mx-auto max-w-4xl space-y-14 px-6">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur"
            >
              <h2 className="text-2xl font-semibold uppercase tracking-[0.08em] md:text-3xl">
                {section.title}
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-[#E4E4DE]/85 md:text-lg">
                {section.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
