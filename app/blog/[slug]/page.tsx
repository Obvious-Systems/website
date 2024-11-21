import { notFound } from 'next/navigation'
import { formatDate, getBlogPosts } from '../utils'
import { CustomMDX } from '../../components/blog/mdx'
import Link from 'next/link'
import { baseUrl } from '@/app/sitemap'
import { TextScramble } from '@/app/components/core/text-scrambler'

export async function generateStaticParams() {
    let posts = getBlogPosts()

    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export function generateMetadata({ params }) {
    let post = getBlogPosts().find((post) => post.slug === params.slug)
    if (!post) {
        return
    }
    let {
        title,
        publishedAt: publishedTime,
        summary: description,
        image,
    } = post.metadata
    let ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime,
            url: `${baseUrl}/blog/${post.slug}`,
            images: [
                {
                    url: ogImage,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
    }
}

export default function Blog({ params }) {
    let post = getBlogPosts().find((post) => post.slug === params.slug)

    if (!post) {
        notFound()
    }

    return (
        <main className="bg-light font-inter grid grid-cols-1 sm:grid-cols-2 min-h-screen wrapper px-6 pb-24 pt-16">
            <div className="mx-auto w-full sm:max-w-[600px]">
                <Link
                    href="/"
                    className="fixed bottom-8 left-8 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg text-gray-800 hover:text-blue-600 transition-colors duration-200 z-10"
                    aria-label="Back to Blog"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </Link>
                <script
                    type="application/ld+json"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'BlogPosting',
                            headline: post.metadata.title,
                            datePublished: post.metadata.publishedAt,
                            dateModified: post.metadata.publishedAt,
                            description: post.metadata.summary,
                            image: post.metadata.image
                                ? `${baseUrl}${post.metadata.image}`
                                : `/og?title=${encodeURIComponent(post.metadata.title)}`,
                            url: `${baseUrl}/blog/${post.slug}`,
                            author: {
                                '@type': 'MentorGrow',
                                name: 'MentorGrow',
                            },
                        }),
                    }}
                />
                <div className="max-w-prose space-y-6">
                    <div className="flex justify-start font-mono uppercase text-sm">
                        <TextScramble className=''>
                            {formatDate(post.metadata.publishedAt)}
                        </TextScramble>
                    </div>
                    <TextScramble className='uppercase font-mono text-5xl sm:text-6xl font-medium my-5 text-left'>
                        {post.metadata.title}
                    </TextScramble>
                </div>
            </div>
            <div className="mx-auto max-w-[600px]">
                <div className="prose space-y-5 prose-headings:scroll-mt-12 prose-a:text-blue-600 prose-neutral">
                    <article className="first:mt-12">
                        <CustomMDX source={post.content} />
                    </article>
                </div>
            </div>
        </main>
    )
}