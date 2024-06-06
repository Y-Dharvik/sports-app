import { useArticlesState } from "../../context/articles/context";
import { useArticlesDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/action";
import { usePreferencesState, usePreferencesDispatch } from '../../context/preferences/context'
import { fetchPreferences } from '../../context/preferences/action'
import { useEffect, useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Article } from "../../context/articles/types";

export default function ArticleList(){
  const articleDispatch = useArticlesDispatch();
  useEffect(() => {
    fetchArticles(articleDispatch);
  }, [articleDispatch]);

  const state = useArticlesState();
  const { articles, isLoading, isError, errorMessage } = state;

  const preferenceDispatch = usePreferencesDispatch();
  useEffect(() => {
    fetchPreferences(preferenceDispatch);
  }, [preferenceDispatch]);
  const preferencesState = usePreferencesState();
  const { preferences } = preferencesState;

  const [selectedCategory, setSelectedCategory] = useState("All");

  const authenticated = !!localStorage.getItem("authToken");
  if(authenticated){
    var categories = [
      "All",
      "Prefered Articles",
      "Basketball",
      "American Football",
      "Rugby",
      "Field Hockey",
      "Table Tennis",
      "Cricket"
    ];
  }else{
    var categories = [
      "All",
      "Basketball",
      "American Football",
      "Rugby",
      "Field Hockey",
      "Table Tennis",
      "Cricket"
    ];
  }

  let filteredArticles;
   if(selectedCategory === "All" ){
    filteredArticles = articles;
   }else if(selectedCategory === "Prefered Articles"){
    filteredArticles = articles.filter((article : Article) => {
      console.log("article.teams: ", article.teams);
      if(article.teams.length !== 0){
        // console.log("article.teams[0].name: ", article.teams[0].name);
        // console.log("article.teams[1].name: ", article.teams[1].name);
        let ans1 = preferences.preferredTeams.includes(article.teams[0].name || article.teams[1].name)
        let ans2 = (article.teams.length > 1) ? preferences.preferredTeams.includes(article.teams[1].name) : false
        let ans3 = preferences.preferredSport.includes(article.sport.name)
        // the culmination of all these articles combined to give the final answer
        return ans1 || ans2 || ans3
      }
      // console.log("article.teams.name: ", article.teams[0].name);
      // || preferences.preferredSport.includes(article.sport.name)
    })
  }else{
    filteredArticles = articles.filter((article : any) => {
      return article.sport.name === selectedCategory;
    })
  }

  const handleCategoryChange = (category:any) => {
    setSelectedCategory(category);
    // if(selectedCategory === "All" ){
    //   filteredArticles = articles;
    //  }else if(selectedCategory === "Prefered Articles"){
    //   filteredArticles = articles.filter((article : Article) => {
    //     console.log("article.teams[0].name: ", article.teams[0].name);
    //     console.log("article.teams[1].name: ", article.teams[1].name);
    //     return preferences.preferredTeams.includes(article.teams[0].name || article.teams[1].name) 
    //     // || preferences.preferredSport.includes(article.sport.name)
    //   })
    // }else{
    //   filteredArticles = articles.filter((article : any) => {
    //     return article.sport.name === selectedCategory;
    //   })
    // }
  };

  // console.log("preferences.preferredTeams: ", preferences.preferredTeams);
  // console.log("articles: ", articles);
  // console.log("filteredArticles: ", filteredArticles);

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
    <div className="container mx-auto">
      <div className="flex justify-end w-11/12 mx-auto my-4">
        <select
          name=""
          id=""
          className="justify-between py-2 px-5 text-orange-600 bg-grey-400 rounded-lg"
        >
        {categories.map(category => (
          <option 
            key={category} 
            onClick={() => handleCategoryChange(category)}
            className={category === selectedCategory ? "active bg-slate-500 hover:bg-gray-400 dark:bg-blue-500 p-2 rounded-md hover:bg-blue-400" : "p-2 rounded-md bg-slate-300 hover:bg-gray-400 dark:hover:bg-blue-400 bg-slate-800"}
          >
            {category}
          </option>
        ))}
        </select>
        <div className="bg-gray-300 rounded-lg mx-2 p-3 text-black-600">
              <FunnelIcon className="h-4 w-4" />
            </div>
      </div>
      
      <div className="auto flex grid-cols-3 gap-2 p-2 lg:grid container mx-auto rounded-lg bg-orange-200 my-4">
        {filteredArticles.length === 0 && !isLoading && <span>No articles available</span>}
        {filteredArticles.map((article: any) => {
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
    </div>
  );
}
