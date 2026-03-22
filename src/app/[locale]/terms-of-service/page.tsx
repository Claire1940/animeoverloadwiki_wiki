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
  const path = '/terms-of-service'
  const title = 'Terms of Service - Anime Overload Wiki'
  const description =
    'Terms of Service for Anime Overload Wiki, including acceptable use, intellectual property, and disclaimer terms for this fan-made Roblox resource site.'
  const image = `${siteUrl}/images/hero.webp`

  return {
    title,
    description,
    keywords: [
      'terms of service',
      'Anime Overload Wiki terms',
      'user agreement',
      'content policy',
      'legal terms',
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
          alt: 'Anime Overload Wiki terms of service',
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

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-slate-300 text-lg mb-2">Rules for using Anime Overload Wiki</p>
          <p className="text-slate-400 text-sm">Last Updated: March 22, 2026</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By using Anime Overload Wiki, you agree to these Terms of Service. If you do not agree, please stop
              using the website.
            </p>

            <h2>2. Service Description</h2>
            <p>
              Anime Overload Wiki is an unofficial fan-made reference site focused on Roblox Anime Overload content,
              including guides, tier lists, unit pages, trait info, and community-facing resources.
            </p>

            <h2>3. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the site for illegal activity.</li>
              <li>Attempt unauthorized access to infrastructure or data.</li>
              <li>Use bots/scrapers in ways that harm service availability.</li>
              <li>Upload malicious code or disruptive content.</li>
              <li>Repost our original content at scale without attribution.</li>
            </ul>

            <h2>4. Intellectual Property</h2>
            <p>
              Original website content is owned by Anime Overload Wiki unless otherwise stated. Game names, logos,
              screenshots, and related assets belong to their respective owners.
            </p>

            <h2>5. Fan-Site Disclaimer</h2>
            <p>
              Anime Overload Wiki is not affiliated with, endorsed by, or officially connected to Roblox Corporation,
              Hi-Fun, or any publisher/developer mentioned on the site.
            </p>

            <h2>6. External Links</h2>
            <p>
              We may link to Roblox, Discord, X, Reddit, YouTube, and other third-party services. We are not
              responsible for third-party content or policies.
            </p>

            <h2>7. No Warranty</h2>
            <p>
              Content is provided "as is" without warranties. We strive for accuracy, but game updates may make
              information outdated at any time.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Anime Overload Wiki is not liable for indirect, incidental,
              consequential, or special damages arising from use of this website.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the site after updates means you accept
              the revised terms.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These terms are governed by applicable law in the jurisdiction where the site operator is established,
              without prejudice to mandatory consumer protections.
            </p>

            <h2>11. Contact</h2>
            <p>Questions regarding these terms:</p>
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:legal@animeoverloadwiki.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                legal@animeoverloadwiki.wiki
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
