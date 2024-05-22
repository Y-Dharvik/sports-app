import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Article } from "../../context/articles/types";

interface Props {
  id: number;
}

export default function ArticleId(props: Props, State: Article) {
  const [articlee, setArticle] = useState<Article>(State);

  const fetchArticle = async (id: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch article");
      }

      const data = await response.json();

      setArticle(data);
      console.log("article in fetch : ", articlee);
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  useEffect(() => {
    fetchArticle(props.id);
  }, [props.id]);

  console.log("article in Article.tsx: ", articlee);

  return(
    <div>
      <h1 className="text-gray-900 font-bold text-xl">{articlee.title}</h1>
      <img src={articlee.thumbnail} alt={articlee.title} />
      <p>{articlee.summary}</p>
      <p>{articlee.date}</p>
    </div>
  )
}
