'use client'

import { setRequestLocale } from 'next-intl/server'
import { Fragment, Suspense, lazy, useEffect } from 'react'
import { ArrowRight, Check, Copy, Gift, Sparkles } from 'lucide-react'
import { useLocale, useMessages } from 'next-intl'
import { VideoFeature } from '@/components/home/VideoFeature'
import { AdBanner, NativeBannerAd, SidebarAd } from '@/components/ads'
import { scrollToSection } from '@/lib/scrollToSection'
import { DynamicIcon } from '@/components/ui/DynamicIcon'

const HeroStats = lazy(() => import('@/components/home/HeroStats'))
const FAQSection = lazy(() => import('@/components/home/FAQSection'))
const CTASection = lazy(() => import('@/components/home/CTASection'))

const LoadingPlaceholder = ({ height = 'h-64', label = 'Loading...' }: { height?: string; label?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse flex items-center justify-center`}>
    <div className="text-muted-foreground">{label}</div>
  </div>
)

interface NavCard {
  icon: string
  title: string
  description: string
  sectionId: string
}

interface ModuleItem {
  moduleNumber?: number
  sectionId: string
  title: string
  subtitle: string
  intro: string
  kpis?: Array<{ label: string; value: string }>
  cards?: Array<{ icon?: string; title: string; description: string; tags?: string[] }>
  codes?: Array<{ code: string; status: string; rewards: string[]; notes?: string }>
  steps?: string[]
  columns?: Array<{ title: string; items: string[] }>
  timeline?: Array<{ date: string; title: string; detail: string }>
}

const renderInterModuleAd = (index: number) => {
  if (index === 0 || index === 9) {
    return (
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="my-8"
      />
    )
  }

  if (index === 1 || index === 12) {
    return (
      <AdBanner
        type="banner-320x50"
        adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50}
        className="my-8"
      />
    )
  }

  if (index === 3 || index === 7 || index === 14) {
    return (
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="my-8"
      />
    )
  }

  if (index === 5 || index === 11) {
    return (
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="my-8"
      />
    )
  }

  return null
}

export default function HomePage() {
  const locale = useLocale()
  const t = useMessages() as any
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://animeoverloadwiki.wiki'
  const loadingLabel = t.common?.loading ?? 'Loading...'
  const localePath = (path: string) => (locale === 'en' ? path : `/${locale}${path}`)

  const navCards = (t.tools?.cards ?? []) as NavCard[]
  const modules = (t.modules?.items ?? []) as ModuleItem[]

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Anime Overload Wiki',
        description: 'Anime Overload Wiki for codes, units, traits, raids, story, and beginner guides.',
        image: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/hero.webp`,
          width: 1200,
          height: 630,
          caption: 'Anime Overload hero art',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Anime Overload Wiki',
        alternateName: 'Anime Overload',
        url: siteUrl,
        description: 'Community wiki for Anime Overload with practical guides, code tracking, and unit planning.',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        sameAs: [
          'https://www.roblox.com/games/126297188712308/Anime-Overload',
          'https://discord.com/invite/animeoverload',
          'https://x.com/OfficialHiFun',
          'https://www.youtube.com/@Hi-FunRBLX',
          'https://www.reddit.com/r/AnimeOverloadOfficial/',
        ],
      },
      {
        '@type': 'VideoGame',
        name: 'Anime Overload',
        gamePlatform: ['Roblox'],
        applicationCategory: 'Game',
        genre: ['Tower Defense', 'Anime', 'Strategy'],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: 'https://www.roblox.com/games/126297188712308/Anime-Overload',
        },
      },
    ],
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="sticky top-20 z-20 border-b border-border py-2 bg-background/95 backdrop-blur-sm">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      <div className="hidden lg:block fixed left-4 top-24 z-10">
        <SidebarAd type="sidebar-160x600" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600} />
      </div>

      <div className="hidden lg:block fixed right-4 top-24 z-10">
        <SidebarAd type="sidebar-160x300" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300} />
      </div>

      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--nav-theme)/0.06)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--nav-theme)/0.06)_1px,transparent_1px)] bg-[size:22px_22px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--nav-theme)/0.18),transparent_55%)] pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-8 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border-2 border-[hsl(var(--gold)/0.55)] mb-6">
              <Sparkles className="w-4 h-4 text-[hsl(var(--gold))]" />
              <span className="text-sm font-semibold">{t.hero.badge}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bebas mb-6 leading-tight bg-gradient-to-r from-foreground via-[hsl(var(--nav-theme))] to-foreground bg-clip-text text-transparent">
              {t.hero.title}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="https://discord.com/invite/animeoverload"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.88)] text-primary-foreground rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <Gift className="w-5 h-5 transition-transform group-hover:scale-110" />
                {t.hero.getFreeCodesCTA}
              </a>
              <a
                href="https://www.roblox.com/games/126297188712308/Anime-Overload"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[hsl(var(--gold)/0.5)] hover:bg-[hsl(var(--gold)/0.1)] rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {t.hero.playOnRobloxCTA}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <Suspense fallback={<LoadingPlaceholder height="h-32" label={loadingLabel} />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ''} />

      <section className="px-4 py-12">
        <div className="scroll-reveal container mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-border/70 shadow-xl shadow-[hsl(var(--nav-theme)/0.08)]">
            <VideoFeature
              videoId="_aAIzPTe3xE"
              title={t.gameFeature.title}
              posterImage="/images/hero.webp"
            />
          </div>
        </div>
      </section>

      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} />

      <section className="px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4">
              {t.tools.title}{' '}
              <span className="text-gold-gradient">{t.tools.titleHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-lg">{t.tools.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {navCards.map((card, index) => (
              <button
                key={card.sectionId}
                onClick={() => scrollToSection(card.sectionId)}
                className="scroll-reveal group p-6 rounded-xl border-2 border-border bg-card hover:border-[hsl(var(--gold)/0.6)] transition-all duration-300 cursor-pointer text-left hover:shadow-xl hover:-translate-y-2 relative overflow-hidden"
                style={{ animationDelay: `${index * 45}ms` }}
                aria-label={`Jump to ${card.title}`}
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[hsl(var(--gold)/0.1)] to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="w-12 h-12 rounded-lg mb-4 bg-gradient-to-br from-[hsl(var(--nav-theme)/0.1)] to-[hsl(var(--gold)/0.1)] border-2 border-[hsl(var(--gold)/0.3)] flex items-center justify-center group-hover:border-[hsl(var(--gold))] transition-all duration-300 relative z-10">
                  <DynamicIcon
                    name={card.icon}
                    className="w-6 h-6 text-[hsl(var(--nav-theme-light))] group-hover:scale-110 transition-transform"
                  />
                </div>
                <h3 className="font-bebas text-lg mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} />

      {modules.map((module, index) => (
        <Fragment key={module.sectionId}>
          <section
            id={module.sectionId}
            className={`scroll-mt-24 px-4 py-20 scroll-reveal ${index % 2 === 1 ? 'bg-muted/30' : ''}`}
          >
            <div className="container mx-auto max-w-7xl">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-3 py-1 rounded-full mb-4 border border-[hsl(var(--gold)/0.45)] bg-[hsl(var(--nav-theme)/0.08)]">
                  <span className="text-xs uppercase tracking-wide text-[hsl(var(--nav-theme-light))]">
                    Module {module.moduleNumber ?? index + 1}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
                  {module.title}
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">{module.subtitle}</p>
                <p className="text-base md:text-lg text-muted-foreground/90 max-w-4xl mx-auto mt-5 leading-relaxed">
                  {module.intro}
                </p>
              </div>

              {module.kpis && module.kpis.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  {module.kpis.map((kpi, i) => (
                    <div
                      key={`${module.sectionId}-kpi-${i}`}
                      className="p-4 rounded-lg bg-card border-2 border-[hsl(var(--gold)/0.3)] text-center hover:border-[hsl(var(--gold))] transition-all duration-300"
                    >
                      <div className="text-2xl font-bebas text-gold-gradient">{kpi.value}</div>
                      <div className="text-sm text-muted-foreground mt-1">{kpi.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {module.codes && module.codes.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {module.codes.map((codeItem, i) => (
                    <div
                      key={`${module.sectionId}-code-${i}`}
                      className="p-6 rounded-xl bg-card border-2 border-[hsl(var(--gold)/0.45)] hover:border-[hsl(var(--gold))] transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-bebas text-2xl text-gold-gradient">{codeItem.code}</p>
                        <button
                          onClick={() => navigator.clipboard.writeText(codeItem.code)}
                          className="group px-3 py-2 rounded-lg bg-[hsl(var(--nav-theme))] text-primary-foreground hover:bg-[hsl(var(--nav-theme)/0.9)] transition-all duration-300 inline-flex items-center gap-2"
                          aria-label={`Copy ${codeItem.code}`}
                        >
                          <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          Copy
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{codeItem.status}</p>
                      <ul className="space-y-2 mb-3">
                        {codeItem.rewards.map((reward, rewardIndex) => (
                          <li key={rewardIndex} className="text-sm flex items-start gap-2">
                            <Check className="w-4 h-4 text-[hsl(var(--nav-theme))] mt-0.5 flex-shrink-0" />
                            <span>{reward}</span>
                          </li>
                        ))}
                      </ul>
                      {codeItem.notes && <p className="text-xs text-muted-foreground">{codeItem.notes}</p>}
                    </div>
                  ))}
                </div>
              )}

              {module.columns && module.columns.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {module.columns.map((column, i) => (
                    <div
                      key={`${module.sectionId}-column-${i}`}
                      className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300"
                    >
                      <h3 className="text-xl font-bebas mb-4 text-[hsl(var(--nav-theme))]">{column.title}</h3>
                      <ul className="space-y-2">
                        {column.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm flex items-start gap-2">
                            <Check className="w-4 h-4 text-[hsl(var(--nav-theme))] mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {module.steps && module.steps.length > 0 && (
                <div className="p-6 rounded-xl bg-muted/50 border-2 border-border mb-10">
                  <h3 className="font-bebas text-xl mb-4 text-[hsl(var(--nav-theme-light))]">Execution Flow</h3>
                  <ol className="space-y-3">
                    {module.steps.map((step, i) => (
                      <li key={`${module.sectionId}-step-${i}`} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[hsl(var(--nav-theme))] text-primary-foreground flex items-center justify-center text-sm font-bebas flex-shrink-0">
                          {i + 1}
                        </div>
                        <span className="text-sm md:text-base">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {module.cards && module.cards.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {module.cards.map((card, i) => (
                    <div
                      key={`${module.sectionId}-card-${i}`}
                      className="p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300"
                    >
                      {card.icon && (
                        <div className="w-11 h-11 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.12)] border border-[hsl(var(--gold)/0.35)] flex items-center justify-center">
                          <DynamicIcon name={card.icon} className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                        </div>
                      )}
                      <h3 className="text-lg font-bebas mb-3 text-[hsl(var(--nav-theme))]">{card.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                      {card.tags && card.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {card.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-3 py-1 rounded-full text-xs bg-[hsl(var(--nav-theme)/0.12)] text-[hsl(var(--nav-theme-light))]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {module.timeline && module.timeline.length > 0 && (
                <div className="space-y-4">
                  {module.timeline.map((event, i) => (
                    <div
                      key={`${module.sectionId}-timeline-${i}`}
                      className="p-5 rounded-xl bg-card border border-border hover:border-[hsl(var(--gold)/0.55)] transition-all duration-300"
                    >
                      <p className="text-xs uppercase tracking-wide text-[hsl(var(--gold))] mb-1">{event.date}</p>
                      <h3 className="text-lg font-bebas mb-2 text-[hsl(var(--nav-theme))]">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.detail}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {renderInterModuleAd(index)}
        </Fragment>
      ))}

      <Suspense fallback={<LoadingPlaceholder label={loadingLabel} />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder label={loadingLabel} />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">{t.footer.title}</h3>
              <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.com/invite/animeoverload"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/OfficialHiFun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.reddit.com/r/AnimeOverloadOfficial/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.reddit}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@Hi-FunRBLX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.youtube}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.roblox.com/games/126297188712308/Anime-Overload"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.instagram}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href={localePath('/about')} className="hover:text-[hsl(var(--nav-theme-light))] transition">
                    {t.footer.about}
                  </a>
                </li>
                <li>
                  <a
                    href={localePath('/privacy-policy')}
                    className="hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </a>
                </li>
                <li>
                  <a
                    href={localePath('/terms-of-service')}
                    className="hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </a>
                </li>
                <li>
                  <a href={localePath('/copyright')} className="hover:text-[hsl(var(--nav-theme-light))] transition">
                    {t.footer.copyrightNotice}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.footer.copyright}</p>
              <p className="text-xs text-muted-foreground">{t.footer.disclaimer}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
