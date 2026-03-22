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
  const path = '/copyright'
  const title = 'Copyright Notice - Anime Overload Wiki'
  const description =
    'Copyright policy for Anime Overload Wiki, including ownership, fair use statements, and DMCA contact details.'
  const image = `${siteUrl}/images/hero.webp`

  return {
    title,
    description,
    keywords: [
      'copyright notice',
      'Anime Overload Wiki copyright',
      'DMCA',
      'fair use',
      'intellectual property',
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
          alt: 'Anime Overload Wiki copyright notice',
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

export default function Copyright() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Copyright Notice</h1>
          <p className="text-slate-300 text-lg mb-2">Ownership, fair use, and attribution rules</p>
          <p className="text-slate-400 text-sm">Last Updated: March 22, 2026</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Website Content Ownership</h2>
            <p>
              © 2026 Anime Overload Wiki. Original text, layout, and editorial materials on this site are protected
              by copyright unless otherwise noted.
            </p>

            <h2>2. Third-Party Game Assets</h2>
            <p>
              Game-related names, logos, characters, screenshots, and related assets remain the property of their
              respective rights holders.
            </p>

            <h2>3. Fair Use</h2>
            <p>
              We use limited game assets for commentary, education, and fan-reference purposes. This use is intended
              to be transformative and non-substitutive.
            </p>

            <h2>4. Attribution Requirements</h2>
            <ul>
              <li>Credit Anime Overload Wiki when reusing our original writeups.</li>
              <li>Include a link back to the source page whenever possible.</li>
              <li>Do not imply endorsement by Anime Overload Wiki or any game owner.</li>
            </ul>

            <h2>5. DMCA Policy</h2>
            <p>
              If you believe material on this site infringes your copyright, please send a takedown notice with:
            </p>
            <ul>
              <li>Your signature and contact information.</li>
              <li>Identification of the copyrighted work.</li>
              <li>Identification of the allegedly infringing material and its URL.</li>
              <li>A good-faith statement and accuracy statement under penalty of perjury.</li>
            </ul>

            <h2>6. Counter-Notice</h2>
            <p>
              If content was removed by mistake, affected parties may submit a counter-notice containing legally
              required details.
            </p>

            <h2>7. Contact</h2>
            <p>
              <strong>General copyright inquiries:</strong>{' '}
              <a href="mailto:copyright@animeoverloadwiki.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                copyright@animeoverloadwiki.wiki
              </a>
              <br />
              <strong>DMCA notices:</strong>{' '}
              <a href="mailto:dmca@animeoverloadwiki.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                dmca@animeoverloadwiki.wiki
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
