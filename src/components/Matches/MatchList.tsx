import { useMatchesState, useMatchesDispatch } from '../../context/matches/context'
import { fetchMatches } from '../../context/matches/action'
import { usePreferencesState, usePreferencesDispatch } from '../../context/preferences/context'
import { fetchPreferences } from '../../context/preferences/action'
import { useEffect, useState } from 'react'
import { FunnelIcon } from '@heroicons/react/24/outline'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'


export default function LiveMatchList() {
  const matchDispatch = useMatchesDispatch()
  useEffect(() => {
    fetchMatches(matchDispatch)
  }, [matchDispatch])
  const state = useMatchesState()
  const { matches, isLoading, isError, errorMessage } = state;

  const preferenceDispatch = usePreferencesDispatch();
  useEffect(() => {
    fetchPreferences(preferenceDispatch);
  }, [preferenceDispatch]);
  const preferencesState = usePreferencesState();
  const { preferences } = preferencesState;
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Prefered Matches",
    "Basketball",
    "American Football",
    "Rugby",
    "Field Hockey",
    "Table Tennis",
    "Cricket"
  ];

  const handleCategoryChange = (category:any) => {
    setSelectedCategory(category);
  };

  // prefered matches should fetch the prefences and filter the matches based on the preferences
  

  let filteredMatches;
  if(selectedCategory === "All" ){
    filteredMatches = matches;
  }else if(selectedCategory === "Prefered Matches"){
    filteredMatches = matches.filter((match : any) => {
      return  preferences.preferredTeams.includes(match.teams.name) || preferences.preferredSport.includes(match.sportName);
    })
  }
  else{
    filteredMatches = matches.filter((match : any) => {
      return match.sportName === selectedCategory;
    })
  }
  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }
  console.log("matches: ",matches);

  // if ((matches.length === 0 || filteredMatches.length === 0) && !isLoading) {
  //   return <span>No matches available</span>;
  // }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    // <>
    // <table className="table-auto flex grid-cols-3 gap-2 p-2 lg:grid container mx-auto rounded-lg bg-gray-100">
    //   <ScrollMenu
    //     LeftArrow={LeftArrow}
    //     RightArrow={RightArrow}
    //   >
    //     {matches.map((match : any) =>{
    //       return(
    //         <MatchId key={match.id} id={match.id} />
    //       )
    //     })}
    //   </ScrollMenu>
    // </table>
    // </>
    // <div className="flex flex-row overflow-x-auto w-full p-4 bg-gray-100">
    //   <div className="flex flex-row">
    //   {matches.map((match: any) => {
    //     return (
    //       <MatchId key={match.id} id={match.id} />
    //     );
    //   })}
    //   </div>
    // </div>
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
    <div className="flex flex-row overflow-x-auto w-full p-4 bg-gray-100">
      {filteredMatches.length === 0 && <span>No matches available</span>}
      <div className="flex flex-row">
        {filteredMatches.map((match: any) => {
          return (
            <div className='border-2 mx-2 mb-1 rounded border-red-400 p-2 bg-red-100'>
               <Link to={`/account/matches/${match.id}`}>
         <div className=' flex justify-between w-48'>
           <h3 className='font-bold text-black-800'>{match.name}</h3>
           <ArrowPathIcon className="h-6 w-6 hover:rotate-90 transition-all ease-in-out" aria-hidden="true"/>
         </div>
         <p className='text-sm text-gray-600'>{match.location}</p>
          <p className='text-sm text-gray-600'>Date: {match.endsAt.slice(0,10)}</p>
         {/* <div className='flex flex-col my-2'>
           <div className='flex justify-between mt-1 px-2'>
             <p className='font-semibold'>{match.teams[0].name}</p>
             <p className='font-semibold'>{match.score[match.teams[0].name]}</p>
           </div>
           <div className='flex justify-between'>
             <p className='font-semibold'>{match.teams[1].name}</p>
             <p className='font-semibold'>{match.score[match.teams[1].name]}</p>
           </div>
         </div> */}
         </Link>
       </div>
          )
        })}
      </div>
    </div>
    </div>
  )
}