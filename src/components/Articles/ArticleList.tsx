import { useArticlesState } from "../../context/articles/context";
import { useArticlesDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/action";
import { usePreferencesState, usePreferencesDispatch } from '../../context/preferences/context'
import { fetchPreferences } from '../../context/preferences/action'
import { useEffect, useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Article } from "../../context/articles/types";
import { useTranslation } from "react-i18next";

export default function ArticleList(){
  const { t } = useTranslation();
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

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSort, setSelectedSort] = useState<string>("Sort By: Date");
  
  const authenticated = !!localStorage.getItem("authToken");

  const [otherArticles, setOtherArticles] = useState<Article[]>([]);

  const fetchOtherArticles = async () => {
    try {
      const response = await fetch("http://localhost:4000/article", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const data = await response.json();

      setOtherArticles(data);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    }
  }

  useEffect(() => {
    fetchOtherArticles();
  }, []);

  
  var categories = [
    "All",
    "Basketball",
    "American Football",
    "Rugby",
    "Field Hockey",
    "Table Tennis",
    "Cricket",
    "Local Articles"
  ];

  const sortCategories = [
    "Sort By: Date",
    "Sort By: Title",
  ]

  let filteredArticles;
   if(selectedCategory === "All" ){
    filteredArticles = articles;
   }else if(selectedCategory === "Local Articles"){
    filteredArticles = otherArticles;
   }else{
    filteredArticles = articles.filter((article : any) => {
      return article.sport.name === selectedCategory;
    })
  }
  let sortedArticles = filteredArticles;

  let favouriteArticles = articles.filter((article : Article) => {
    if(article.teams.length !== 0){
      let ans1 = preferences.preferences.selectedTeams.includes(article.teams[0].name || article.teams[1].name)
      let ans2 = (article.teams.length > 1) ? preferences.preferences.selectedTeams.includes(article.teams[1].name) : false
      let ans3 = preferences.preferences.selectedSports.includes(article.sport.name)
      return ans1 || ans2 || ans3
    }
  })

  const preferredSport = preferences.preferences.selectedSports
  const preferredTeams = preferences.preferences.selectedTeams  
  if(authenticated){
    var favSportCategories = ["All", ...preferredSport]
    var favTeamCategories = ["All", ...preferredTeams]
  }else{
    var favSportCategories = ["All"]
    var favTeamCategories = ["All"]
  }



  const [selectedFavSportCategory, setSelectedFavSportCategory] = useState("All");
  const [selectedFavTeamCategory, setSelectedFavTeamCategory] = useState("All");

  let filteredFavouriteArticles;
  if(selectedFavSportCategory === "All" && selectedFavTeamCategory === "All"){
    filteredFavouriteArticles = favouriteArticles;
  }else if(selectedFavSportCategory === "All" && selectedFavTeamCategory !== "All"){
    filteredFavouriteArticles = favouriteArticles.filter((article : Article) => {
      if(article.teams.length === 1){
        return article.teams[0].name === selectedFavTeamCategory
      }else{
        return article.teams[0].name === selectedFavTeamCategory || article.teams[1].name === selectedFavTeamCategory
      }
    })
  }else if(selectedFavSportCategory !== "All" && selectedFavTeamCategory === "All"){
    filteredFavouriteArticles = favouriteArticles.filter((article : Article) => {
      return article.sport.name === selectedFavSportCategory;
    })
  }
  else{
    filteredFavouriteArticles = favouriteArticles.filter((article : Article) => {
      if(article.teams.length === 1){
        return article.teams[0].name === selectedFavTeamCategory && article.sport.name === selectedFavSportCategory
      }else{
        return (article.teams[0].name === selectedFavTeamCategory || article.teams[1].name === selectedFavTeamCategory) && article.sport.name === selectedFavSportCategory
      }
    })
  }

  const handleFavSportCategoryChange = (category:any) => {
    setSelectedFavSportCategory(category);
  };

  const handleFavTeamCategoryChange = (category:any) => {
    setSelectedFavTeamCategory(category);
  };

  // if(selectedSort === "Sort By: Date"){
  //   filteredArticles.sort((a: any, b: any) => {
  //     return a.date - b.date;
  //   })
  // }else if(selectedSort === "Sort By: Title"){
  //   filteredArticles.sort((a: any, b: any) => {
  //     return a.title.localeCompare(b.title);
  //   })
  // }

  if(selectedSort === "Sort By: Date"){
    sortedArticles = filteredArticles.sort((a: any, b: any) => {
      return a.date - b.date;
    })
  }else if(selectedSort === "Sort By: Title"){
    sortedArticles = filteredArticles.sort((a: any, b: any) => {
      return a.title.localeCompare(b.title);
    })
  }

  const handleSortChange = (sort:any) => {
    setSelectedSort(sort);
  }


  const handleCategoryChange = (category:any) => {
    setSelectedCategory(category);
    console.log("Selected Category in handle: ", category)
  };

  if (articles.length === 0 && isLoading) {
    return <span data-testid="loading">Loading...</span>
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <div className="container auto flex gap-12">
    <div className="">
      <div className="flex justify-end w-11/12 mx-auto my-2">
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="justify-between py-2 px-5 text-orange-600 bg-grey-400 rounded-lg"
        >
          {categories.map((category) => (
            <option
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={
                category === selectedCategory
                  ? "active bg-slate-500 hover:bg-gray-400 dark:bg-blue-500 p-2 rounded-md hover:bg-blue-400"
                  : "p-2 rounded-md bg-slate-300 hover:bg-gray-400 dark:hover:bg-blue-400 bg-slate-800"
              }
            >
              {category}
            </option>
          ))}
        </select>
        <select
          value={selectedSort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="justify-between py-2 px-5 text-orange-600 bg-grey-400 rounded-lg"
        >
          {sortCategories.map((sortCategory) => (
            <option
              key={sortCategory}
              onClick={() => handleSortChange(sortCategory)}
              className={
                sortCategory === selectedSort
                  ? "active bg-slate-500 hover:bg-gray-400 dark:bg-blue-500 p-2 rounded-md hover:bg-blue-400"
                  : "p-2 rounded-md bg-slate-300 hover:bg-gray-400 dark:hover:bg-blue-400 bg-slate-800"
              }
            >
              {sortCategory}
            </option>
          ))}
        </select>
        <div className="bg-gray-300 rounded-lg mx-2 p-3 text-black-600">
          <FunnelIcon className="h-4 w-4" />
        </div>
      </div>

      <div className="flex flex-col gap-2 overflow-y-scroll max-h-[525px] grid-cols-2 gap-2 p-2 lg:grid container mx-auto rounded-lg bg-orange-200">
        {filteredArticles.length === 0 && !isLoading && (
          <span>No articles available</span>
        )}
        {sortedArticles.map((article: any) => {
          return (
            <div className="flex-auto flex justify-center" data-testid="article-item" key={article.id}>
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
                  <Link to={(authenticated) ? `/account/articles/${article.id}` : `/view/articles/${article.id}`}>
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
    <div>
    <div className="  w-11/11 mx-auto my-0">
        {/* Favourites */}
        <h1 className="text-gray-900 font-bold mb-2 mt-0 ml-2 text-2xl mr-22 mx-9 allign-right">{t("Favourites")}</h1>

        <label className="text-gray-700 text-base">Sport: </label>
        <select
          value={selectedFavSportCategory}
          data-testid="fav-sport-categories"
          onChange={(e) => handleFavSportCategoryChange(e.target.value)}
          className="justify-between py-2 px-5 text-orange-600 bg-grey-400 rounded-lg"
        >
          {favSportCategories.map((category1) => (
            <option
              key={category1}
              onClick={() => handleFavSportCategoryChange(category1)}
              className={
                category1 === selectedFavSportCategory
                  ? "active bg-slate-500 hover:bg-gray-400 dark:bg-blue-500 p-2 rounded-md hover:bg-blue-400"
                  : "p-2 rounded-md bg-slate-300 hover:bg-gray-400 dark:hover:bg-blue-400 bg-slate-800"
              }
            >
              {category1}
            </option>
          ))}
        </select>
        <div className="my-2">
        <label className="text-gray-700 text-base">   Team: </label>
        <select
          value={selectedFavTeamCategory}
          onChange={(e) => handleFavTeamCategoryChange(e.target.value)}
          className="justify-between py-2 px-5 text-orange-600 bg-grey-400 rounded-lg"
        >
          {favTeamCategories.map((category2) => (
            <option
              key={category2}
              onClick={() => handleFavTeamCategoryChange(category2)}
              className={
                category2 === selectedFavTeamCategory
                  ? "active bg-slate-500 hover:bg-gray-400 dark:bg-blue-500 p-2 rounded-md hover:bg-blue-400"
                  : "p-2 rounded-md bg-slate-300 hover:bg-gray-400 dark:hover:bg-blue-400 bg-slate-800"
              }
            >
              {category2}
            </option>
          ))}
        </select>
        </div>
      </div>
    <div className="flex flex-col gap-2 overflow-y-scroll max-h-[510px] grid-cols-1 gap-2 p-2 lg:grid container mx-auto rounded-lg bg-orange-200">
        {filteredFavouriteArticles.length === 0 && !isLoading && (
          <span data-testid="no-favart-item">No articles available</span>
        )}
        {filteredFavouriteArticles.map((article: any) => {
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
              <hr className="border-4 border-orange-500" />
              </div>
            </div>
          );
        })}
      </div>
      </div>
  </div>
  );
}
