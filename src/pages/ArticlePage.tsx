import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Markdown from "react-markdown";
import "../ArticlePage.css";

interface Article {
  slug: string;
  title: string;
  description: string;
  favoritesCount: number;
  author: {
    username: string;
  };
  createdAt: string;
  tagList: string[];
  body: string;
}

interface ArticleError {
  slug: string;
  message: string;
}

function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ArticleError | null>(null);

  const isLoading = !error && (loading || article?.slug !== slug);

  useEffect(() => {
    fetch(`https://realworld.habsida.net/api/articles/${slug}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((data) => {
        setArticle(data.article);
        setError(null);
      })
      .catch((error) => {
        setError({
          slug: slug ?? "",
          message: String(error),
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (error && error.slug === slug) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (article === null) {
    return <div>Article not found</div>;
  }

  return (
    <div>
      <div className="article-banner">
        <h1 className="article-title">{article.title}</h1>
        <div className="article-personal-info">
          <div className="article-icon-img">
            <img src="../img/Icon.svg" alt="" />
          </div>
          <div>
            <p className="article-author">{article.author.username}</p>
            <p className="article-date">
              {new Date(article.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
      <div className="article-content">
        <div className="article-body">
          <Markdown>{article.body}</Markdown>
        </div>
        <p>
          {article.tagList.map((tag) => (
            <span key={tag} className="article-tag">
              {tag}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default ArticlePage;
