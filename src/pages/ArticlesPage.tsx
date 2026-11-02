import { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router";

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
}

function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState<number>(0);

  const limit = 20;
  const offset = (page - 1) * limit;
  const totalPages = Math.ceil(count / limit);

  useEffect(() => {
    fetch(
      `https://realworld.habsida.net/api/articles?limit=${limit}&offset=${offset}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.articles);
        setCount(data.articlesCount);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setLoading(false);
        setError(String(error));
      });
  }, [offset]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const pages = [];

  for (let n = page; n <= Math.min(page + 6, totalPages); n++) {
    pages.push(n);
  }

  return (
    <div>
      <div className="banner">
        <p className="h1">Realworld Blog</p>
        <p className="h1-under">A place to share your knowledge.</p>
      </div>
      <div className="body">
        <div className="popular-tags">
          <h2>Popular tags</h2>
          <div className="tags">
            <span>one</span>
            <span>something</span>
            <span>chinese</span>
            <span>english</span>
            <span>french</span>
          </div>
        </div>
        {articles.map((article) => (
          <div key={article.slug} className="card">
            <div className="top_info">
              <div className="personal-info">
                <div className="icon-img">
                  <img src="../img/Icon.svg" alt="" />
                </div>
                <div>
                  <p className="author">{article.author.username}</p>
                  <p className="date">
                    {new Date(article.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="count_info">
                <img src="../img/Variant=WithIcon.svg" alt="" />
                <p className="count">{article.favoritesCount}</p>
              </div>
            </div>
            <Link className="title" to={`/articles/${article.slug}`}>
              {article.title}
            </Link>
            <p className="description">{article.description}</p>
            <p>
              {article.tagList.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
        disabled={page === 1}
        className="button"
      >
        Previous
      </button>
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
          className={`page-button ${pageNumber === page ? "active" : ""}`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
        disabled={page === totalPages}
        className="button"
      >
        Next
      </button>
    </div>
  );
}

export default ArticlesPage;
