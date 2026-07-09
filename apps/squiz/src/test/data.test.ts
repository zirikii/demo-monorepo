import { describe, expect, it } from "vitest";
import { capabilities, getCapability } from "@/data/capabilities";
import { industries, getIndustry } from "@/data/industries";
import { useCases, getUseCase } from "@/data/useCases";
import { stories, getStory } from "@/data/stories";
import { posts, getPost } from "@/data/posts";
import { navMenus, footerColumns } from "@/data/nav";

function assertUniqueSlugs(slugs: string[]) {
  expect(new Set(slugs).size).toBe(slugs.length);
}

describe("content data integrity", () => {
  it("has 13 capabilities with unique, resolvable slugs", () => {
    expect(capabilities).toHaveLength(13);
    assertUniqueSlugs(capabilities.map((c) => c.slug));
    for (const c of capabilities) {
      expect(getCapability(c.slug)).toBe(c);
      expect(c.features.length).toBeGreaterThanOrEqual(3);
      expect(c.faqs.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("has 6 industries whose capability references resolve", () => {
    expect(industries).toHaveLength(6);
    assertUniqueSlugs(industries.map((i) => i.slug));
    for (const industry of industries) {
      for (const slug of industry.capabilities) {
        expect(getCapability(slug), `capability ${slug} in ${industry.slug}`).toBeDefined();
      }
      if (industry.storySlug) {
        expect(getStory(industry.storySlug), `story ${industry.storySlug}`).toBeDefined();
      }
    }
  });

  it("has 6 use cases whose capability references resolve", () => {
    expect(useCases).toHaveLength(6);
    assertUniqueSlugs(useCases.map((u) => u.slug));
    for (const useCase of useCases) {
      expect(getUseCase(useCase.slug)).toBe(useCase);
      for (const slug of useCase.capabilities) {
        expect(getCapability(slug), `capability ${slug} in ${useCase.slug}`).toBeDefined();
      }
    }
  });

  it("has 6 customer stories linked to real industries", () => {
    expect(stories).toHaveLength(6);
    assertUniqueSlugs(stories.map((s) => s.slug));
    for (const story of stories) {
      expect(getIndustry(story.industrySlug), `industry ${story.industrySlug}`).toBeDefined();
      expect(story.stats.length).toBeGreaterThanOrEqual(3);
      expect(story.body.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("has 9 blog posts with unique slugs and sections", () => {
    expect(posts).toHaveLength(9);
    assertUniqueSlugs(posts.map((p) => p.slug));
    for (const post of posts) {
      expect(getPost(post.slug)).toBe(post);
      expect(post.sections.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("nav and footer links point at app-internal routes", () => {
    const links = [
      ...navMenus.flatMap((m) => m.columns.flatMap((c) => c.links.map((l) => l.to))),
      ...navMenus.flatMap((m) => (m.promo ? [m.promo.to] : [])),
      ...footerColumns.flatMap((c) => c.links.map((l) => l.to)),
    ];
    for (const to of links) {
      expect(to.startsWith("/"), `internal link ${to}`).toBe(true);
    }
  });
});
