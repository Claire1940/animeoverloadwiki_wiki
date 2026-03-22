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
  const path = '/about'
  const title = 'About Anime Overload Wiki'
  const description =
    'Learn about Anime Overload Wiki, a fan-made hub for Roblox Anime Overload guides, codes, unit insights, and community resources.'
  const image = `${siteUrl}/images/hero.webp`

  return {
    title,
    description,
    keywords: [
      'about Anime Overload Wiki',
      'Anime Overload community',
      'Roblox Anime Overload guides',
      'fan wiki',
      'Anime Overload resources',
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
          alt: 'About Anime Overload Wiki',
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

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Anime Overload Wiki</h1>
          <p className="text-slate-300 text-lg">
            Community-focused guides, data, and updates for Roblox Anime Overload players.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>What This Site Is</h2>
            <p>
              Anime Overload Wiki is an unofficial fan-made resource hub built to help players progress faster and make
              better decisions in Anime Overload. We focus on practical information: active codes, unit overviews,
              trait recommendations, raid tips, and beginner pathways.
            </p>

            <h2>What We Publish</h2>
            <ul>
              <li>Code tracking and redemption updates.</li>
              <li>Unit and trait breakdowns.</li>
              <li>Tier list snapshots and meta notes.</li>
              <li>Raid/story progression advice.</li>
              <li>Beginner checklists and optimization tips.</li>
            </ul>

            <h2>Our Editorial Approach</h2>
            <ul>
              <li>Prefer verified in-game behavior over speculation.</li>
              <li>Label opinion-based rankings clearly.</li>
              <li>Update high-traffic pages quickly after patches.</li>
              <li>Keep guides concise, actionable, and searchable.</li>
            </ul>

            <h2>Community Channels</h2>
            <p>
              We actively monitor the official Anime Overload channels for announcements and patch-related changes:
            </p>
            <ul>
              <li><a href="https://www.roblox.com/games/126297188712308/Anime-Overload" target="_blank" rel="noopener noreferrer">Roblox Game Page</a></li>
              <li><a href="https://discord.com/invite/animeoverload" target="_blank" rel="noopener noreferrer">Official Discord</a></li>
              <li><a href="https://x.com/OfficialHiFun" target="_blank" rel="noopener noreferrer">Official X</a></li>
              <li><a href="https://www.youtube.com/@Hi-FunRBLX" target="_blank" rel="noopener noreferrer">Official YouTube</a></li>
              <li><a href="https://www.reddit.com/r/AnimeOverloadOfficial/" target="_blank" rel="noopener noreferrer">Official Reddit</a></li>
            </ul>

            <h2>Disclaimer</h2>
            <p>
              Anime Overload Wiki is not affiliated with, endorsed by, or officially connected to Roblox Corporation,
              Hi-Fun, or any other rights holder. All trademarks and assets belong to their respective owners.
            </p>

            <h2>Contact</h2>
            <p>
              For corrections, partnership inquiries, or legal requests, contact:
            </p>
            <p>
              <strong>General:</strong>{' '}
              <a href="mailto:contact@animeoverloadwiki.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                contact@animeoverloadwiki.wiki
              </a>
              <br />
              <strong>Support:</strong>{' '}
              <a href="mailto:support@animeoverloadwiki.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                support@animeoverloadwiki.wiki
              </a>
            </p>
            <p className="text-slate-400 text-sm">
              Last Updated: March 22, 2026
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
