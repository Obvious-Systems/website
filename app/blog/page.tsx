import { BlogPosts } from "../components/blog/posts"
import { TextScramble } from "../components/core/text-scrambler"

export const metadata = {
    title: 'Newsroom',
    description: 'Join our growing community and stay informed, and inspired.',
}

export default function Page() {
    return (
        <main className="p-4 sm:p-16 flex flex-col gap-16">
            <TextScramble className='font-mono text-sm uppercase'>
                Directory
            </TextScramble>
            <BlogPosts />
        </main >
    )
}