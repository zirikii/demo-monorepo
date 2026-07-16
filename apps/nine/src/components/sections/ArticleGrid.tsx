import type { Article } from "@/data/types";
import { ArticleCard } from "../article/ArticleCard";

type Props = {
  articles: Article[];
  columns?: 2 | 3;
  showPillar?: boolean;
};

const colClass: Record<2 | 3, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
};

export function ArticleGrid({ articles, columns = 3, showPillar = false }: Props) {
  return (
    <div className={`grid gap-x-6 gap-y-7 ${colClass[columns]}`}>
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} showPillar={showPillar} />
      ))}
    </div>
  );
}
