import { useEffect } from "react";
import { useArticlesDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/action";
import ArticleList from "./ArticleList.tsx";

export default function Articles() {
  const articleDispatch = useArticlesDispatch();

  useEffect(() => {
    fetchArticles(articleDispatch);
    console.log("articleDispatch: ", articleDispatch)
  }, [articleDispatch]);

  return (
    <div>
      <h1 className="text-gray-900 font-bold text-xl">Articles</h1>
      <div className="mt-2 justify-between flex items-center w-full">
        <ArticleList />
      </div>
    </div>
  );
}

