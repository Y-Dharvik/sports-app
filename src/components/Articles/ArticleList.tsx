import { useArticlesState } from "../../context/articles/context";
import ArticleId from "./Article.tsx";

export default function ArticleList() {
    const state = useArticlesState();
    const { articles, isLoading, isError, errorMessage } = state;
    //console.log("articles in ArticleList.tsx: ", articles);    
    if (articles.length === 0 && isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>{errorMessage}</span>;
    }

    return (
        <>
            <div className="auto flex grid-cols-3 gap-2 p-2 lg:grid container mx-auto rounded-lg bg-gray-100">
                {articles.map((article:any) => {
                    return (
                        <ArticleId key={article.id} id={article.id} />
                    );
                })}
            </div>
        </>
    );

}