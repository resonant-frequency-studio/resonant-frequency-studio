import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Resonant Frequency Studio',
  description:
    'Learn how Resonant Frequency Studio collects, uses, and protects personal information for our web design and software development services in California.',
};

const sections = [
  {
    title: 'Overview',
    body: [
      'Resonant Frequency Studio (“we,” “our,” or “us”) is a California-based web design and software development studio. This Privacy Policy explains how we collect, use, disclose, and safeguard personal information when you visit our website, engage our services, or communicate with our team. By interacting with us, you agree to the practices described below.',
      'This policy is intended to meet the requirements of applicable California state and U.S. federal privacy laws, including the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA).',
    ],
  },
  {
    title: 'Information We Collect',
    body: [
      'We collect information in three primary ways: (1) directly from you, (2) automatically through your use of our website, and (3) from select third-party partners that help us deliver and improve our services.',
      'Personal information may include: identifiers (such as name, email address, phone number, company details), commercial information (project requirements, billing details), internet or network activity (device type, IP address, browser characteristics, analytics data), and professional or employment-related information relevant to project engagements.',
      'We do not intentionally collect sensitive personal information unless it is necessary for a specific engagement and provided voluntarily by the client.',
    ],
  },
  {
    title: 'How We Use Personal Information',
    body: [
      'We use personal information to respond to inquiries, scope and deliver services, manage client accounts, process payments, personalize website experiences, perform analytics, improve our offerings, and comply with legal obligations. We may also use contact information to send project updates, proposals, service announcements, or marketing communications—always with the option to opt out.',
    ],
  },
  {
    title: 'Sharing and Disclosure',
    body: [
      'We do not sell personal information. We may share limited data with trusted service providers that assist with hosting, analytics, accounting, project management, and legal compliance. These providers are bound by confidentiality obligations and may only use data as instructed by us.',
      'We may disclose information if required by law, to protect our rights or safety, or in connection with a merger, acquisition, or asset sale involving Resonant Frequency Studio.',
    ],
  },
  {
    title: 'Cookies and Tracking Technologies',
    body: [
      'Our website uses cookies, pixel tags, and similar technologies to measure performance, personalize content, and understand usage patterns. You can manage cookie preferences through your browser settings. Declining cookies may impact certain site features.',
    ],
  },
  {
    title: 'California Privacy Rights',
    body: [
      'If you are a California resident, you have the right to request access to, correction of, or deletion of personal information we hold about you, subject to certain exceptions. You may also opt out of any data-sharing arrangements that constitute “selling” or “sharing” under the CCPA/CPRA, and you have the right to limit the use of sensitive personal information.',
      'To exercise these rights, email us at hello@resonantfrequency.studio or call +1.707.595.8958. We will verify your identity before fulfilling a request and respond within the timeframes required by law. Authorized agents may submit requests on your behalf if they provide proof of authorization.',
    ],
  },
  {
    title: 'Data Security and Retention',
    body: [
      'We implement administrative, technical, and physical safeguards designed to protect personal information against unauthorized access, loss, or misuse. Despite these efforts, no system is entirely secure, and we cannot guarantee absolute security.',
      'We retain personal information only for as long as necessary to fulfill the purposes described in this policy, comply with legal requirements, resolve disputes, and enforce our agreements.',
    ],
  },
  {
    title: `Children's Privacy`,
    body: [
      'Our services are not directed to children under 16, and we do not knowingly collect personal information from minors. If we learn that we have collected such information, we will take steps to delete it promptly.',
    ],
  },
  {
    title: 'International Visitors',
    body: [
      'Our operations and data infrastructure are located in the United States. By providing information to us, you acknowledge that your data will be processed in the U.S. and may be subject to U.S. laws, which may differ from those in your home country.',
    ],
  },
  {
    title: 'Changes to This Policy',
    body: [
      'We may update this Privacy Policy to reflect changes in our practices or applicable law. When we post changes, we will revise the “Last Updated” date below. Significant updates will be communicated through our website or direct notice, as appropriate.',
    ],
  },
  {
    title: 'Contact Us',
    body: [
      'If you have questions about this Privacy Policy or our privacy practices, please reach out using the contact information below:',
      'Resonant Frequency Studio 427 Mendocino Ave #100 Santa Rosa, CA 95401 hello@resonantfrequency.studio +1.707.595.8958',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#121212] text-[#E4E4DE]">
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(89,95,57,0.25)_0%,rgba(18,18,18,1)_60%)]" />
        <div className="relative z-10 container mx-auto max-w-5xl px-6">
          <span className="text-sm uppercase tracking-[0.4em] text-[#ACAF9C]">
            Privacy Policy
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-6xl">
            Safeguarding your data while we design experiences that resonate.
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
        <div className="relative z-10 container mx-auto max-w-4xl space-y-14 px-6">
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
