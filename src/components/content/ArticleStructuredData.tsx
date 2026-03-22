import type { ContentFrontmatter, ContentType } from '@/lib/content'

interface ArticleStructuredDataProps {
	frontmatter: ContentFrontmatter
	contentType: ContentType
	locale: string
	slug: string
}

export function ArticleStructuredData({
	frontmatter,
	contentType,
	locale,
	slug,
}: ArticleStructuredDataProps) {
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://animeoverloadwiki.wiki'
	const articleUrl =
		locale === 'en'
			? `${siteUrl}/${contentType}/${slug}`
			: `${siteUrl}/${locale}/${contentType}/${slug}`
	const imageUrl = frontmatter.image
		? frontmatter.image.startsWith('http')
			? frontmatter.image
			: `${siteUrl}${frontmatter.image.startsWith('/') ? '' : '/'}${frontmatter.image}`
		: `${siteUrl}/images/hero.webp`

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: frontmatter.title,
		description: frontmatter.description,
		image: imageUrl,
		url: articleUrl,
		datePublished: frontmatter.date,
		dateModified: ('lastModified' in frontmatter && frontmatter.lastModified) || frontmatter.date,
		author: {
			'@type': 'Organization',
			name: 'Anime Overload Wiki Team',
		},
		publisher: {
			'@type': 'Organization',
			name: 'Anime Overload Wiki',
			url: siteUrl,
			logo: {
				'@type': 'ImageObject',
				url: `${siteUrl}/android-chrome-512x512.png`,
			},
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': articleUrl,
		},
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	)
}
