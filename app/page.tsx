import { motion } from "framer-motion";
import { BlogPosts } from "./components/blog/posts";

export default function Home() {
  return (
    <div className="w-full h-screen px-12">
      <img src="/starfish.svg" alt="starfish" className="absolute top-6 right-6 w-12 h-12" />
      <BlogPosts />
    </div>
  );
}
