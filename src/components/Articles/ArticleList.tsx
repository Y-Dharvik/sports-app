import { useArticlesState } from "../../context/articles/context";
import { useArticlesDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/action";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ArticleId from "./Article.tsx";

export default function ArticleList() {
  const articleDispatch = useArticlesDispatch();
  useEffect(() => {
    fetchArticles(articleDispatch);
  }, [articleDispatch]);

  const state = useArticlesState();
  const { articles, isLoading, isError, errorMessage } = state;
  //console.log("articles in ArticleList.tsx: ", articles);
  if (articles.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  // return (
  //     <>
  //         <div className="auto flex grid-cols-3 gap-2 p-2 lg:grid container mx-auto rounded-lg bg-gray-100">
  //             {articles.map((article:any) => {
  //                 return (
  //                     <ArticleId key={article.id} id={article.id} />
  //                 );
  //             })}
  //         </div>
  //     </>
  // );

  return (
    <div className="auto flex grid-cols-3 gap-2 p-2 lg:grid container mx-auto rounded-lg bg-gray-100">
      {articles.map((article: any) => {
        return (
          <div className="flex-auto flex justify-center">
            <div className="max-w-sm rounded overflow-hidden shadow-lg flex-auto">
              <img
                className="flex items-center justify-center h-48 w-full object-cover"
                src={article.thumbnail}
                alt="Article thumbnail"
              />

              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{article.title}</div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {article.date.toString().slice(0, 10)}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {article.sport.name}
                  </span>
                </div>
                <p className="text-gray-700 text-base">{article.summary}</p>
                <br />
                <Link to={`/account/articles/${article.id}`}>
                  <button
                    id="readToggle"
                    style={{ marginLeft: "240px" }}
                    className="inline-flex rounded-md border border-transparent bg-blue-600 px-2 py-1 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
