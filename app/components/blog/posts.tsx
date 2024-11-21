import Link from 'next/link'
import { formatDate, getBlogPosts } from '../../blog/utils'
import { TextScramble } from '../core/text-scrambler'

export function BlogPosts() {
    let allBlogs = getBlogPosts()

    // Group posts by year
    const groupedPosts = allBlogs.reduce((acc, post) => {
        const year = new Date(post.metadata.publishedAt).getFullYear()
        if (!acc[year]) {
            acc[year] = []
        }
        acc[year].push(post)
        return acc
    }, {} as Record<number, typeof allBlogs>)

    // Sort years in descending order
    const sortedYears = Object.keys(groupedPosts)
        .map(Number)
        .sort((a, b) => b - a)

    return (
        <div>
            {sortedYears.map(year => (
                <section key={year} className="pt-12">
                    <TextScramble className='font-mono text-3xl mb-6 uppercase'>
                        {String(year)}
                    </TextScramble>
                    <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 transition-all duration-500">
                        {groupedPosts[year]
                            .sort((a, b) => {
                                if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
                                    return -1
                                }
                                return 1
                            })
                            .map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="bg-[#ebebeb] overflow-hidden rounded-lg"
                                >
                                    <div className="relative group p-3">
                                        <img
                                            src={post.metadata.image}
                                            alt={post.metadata.title}
                                            className="relative w-full aspect-video object-cover object-center rounded-lg"
                                        />
                                        <div className="h-full relative font-mono font-medium uppercase text-sm flex flex-col justify-between pt-4 pb-1 rounded-lg">
                                            <TextScramble>
                                                {post.metadata.title}
                                            </TextScramble>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </ul>
                </section>
            ))}
        </div>
    )
}