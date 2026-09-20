import { POSTS } from "@/data/posts";
import type { Post, PostCategory } from "@/data/types";

export const POSTS_PER_PAGE = 6;

export interface PostFilters {
  query?: string;
  category?: PostCategory | "";
  tag?: string;
}

export function filterPosts(filters: PostFilters, posts: Post[] = POSTS): Post[] {
  const needle = (filters.query ?? "").trim().toLowerCase();
  return posts.filter((post) => {
    if (filters.category && post.category !== filters.category) return false;
    if (filters.tag && !post.tags.includes(filters.tag)) return false;
    if (!needle) return true;
    const haystack = [post.title, post.excerpt, post.author, ...post.tags].join(" ").toLowerCase();
    return haystack.includes(needle);
  });
}

export function sortPostsByDate(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => b.publishedOn.localeCompare(a.publishedOn));
}

export function latestPosts(limit = 3): Post[] {
  return sortPostsByDate(POSTS).slice(0, limit);
}

export function allTags(posts: Post[] = POSTS): string[] {
  return [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) => a.localeCompare(b));
}

export function relatedPosts(post: Post, limit = 3): Post[] {
  return POSTS.filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      post: candidate,
      score:
        (candidate.category === post.category ? 2 : 0) +
        candidate.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.post);
}
