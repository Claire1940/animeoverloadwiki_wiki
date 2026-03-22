import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://animeoverloadwiki.wiki'
  const path = '/privacy-policy'
  const title = 'Privacy Policy - Anime Overload Wiki'
  const description =
    'Learn how Anime Overload Wiki collects, uses, and protects data while providing Roblox Anime Overload guides and community resources.'
  const image = `${siteUrl}/images/hero.webp`

  return {
    title,
    description,
    keywords: [
      'privacy policy',
      'Anime Overload Wiki privacy',
      'data protection',
      'cookies',
      'analytics policy',
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'Anime Overload Wiki',
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: 'Anime Overload Wiki privacy policy',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-300 text-lg mb-2">How Anime Overload Wiki handles your information</p>
          <p className="text-slate-400 text-sm">Last Updated: March 22, 2026</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Who We Are</h2>
            <p>
              Anime Overload Wiki is an unofficial fan-made resource website focused on the Roblox game Anime Overload.
              This policy explains what information we collect and how we use it.
            </p>

            <h2>2. Information We Collect</h2>
            <ul>
              <li><strong>Usage data:</strong> pages visited, time on page, and referring sources.</li>
              <li><strong>Device data:</strong> browser type, OS, and approximate region.</li>
              <li><strong>Local preferences:</strong> language/theme settings saved in your browser.</li>
            </ul>
            <p>We do not require account registration to browse the site.</p>

            <h2>3. How We Use Information</h2>
            <ul>
              <li>Operate and improve website performance.</li>
              <li>Understand which guides and tools are most useful.</li>
              <li>Detect abuse, errors, or security incidents.</li>
            </ul>

            <h2>4. Cookies and Analytics</h2>
            <p>
              We may use cookies and privacy-respecting analytics tools to understand aggregate traffic trends.
              You can manage cookies via browser settings at any time.
            </p>

            <h2>5. Third-Party Links</h2>
            <p>
              Our pages include links to third-party websites such as Roblox, Discord, X, Reddit, and YouTube.
              Their privacy practices are governed by their own policies.
            </p>

            <h2>6. Children&apos;s Privacy</h2>
            <p>
              We do not knowingly collect personal information from children under 13. If you believe personal
              information was provided by a child, contact us and we will review and remove it as appropriate.
            </p>

            <h2>7. Data Retention</h2>
            <p>
              Analytics and operational logs are retained only as long as reasonably needed for site operation,
              reliability, and legal compliance.
            </p>

            <h2>8. Security</h2>
            <p>
              We apply reasonable security controls, but no internet transmission or storage system can be guaranteed
              100% secure.
            </p>

            <h2>9. International Visitors</h2>
            <p>
              If you access the site from outside your home country, your information may be processed in other
              jurisdictions where our infrastructure providers operate.
            </p>

            <h2>10. Policy Updates</h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will be reflected by updating the
              date at the top of this page.
            </p>

            <h2>11. Disclaimer</h2>
            <p>
              Anime Overload Wiki is not affiliated with, endorsed by, or officially connected to Roblox Corporation,
              Hi-Fun, or any trademark owner.
            </p>

            <h2>12. Contact</h2>
            <p>
              Questions about this policy can be sent to:
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:privacy@animeoverloadwiki.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                privacy@animeoverloadwiki.wiki
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
