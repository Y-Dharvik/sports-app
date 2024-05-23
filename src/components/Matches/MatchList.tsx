import { useMatchesState } from '../../context/matches/context'
import { useMatchesDispatch } from '../../context/matches/context'
import { fetchMatches } from '../../context/matches/action'
import { useEffect } from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import MatchId from './Match.tsx'


export default function LiveMatchList() {
  const matchDispatch = useMatchesDispatch()
  useEffect(() => {
    fetchMatches(matchDispatch)
  }, [matchDispatch])
  const state = useMatchesState()
  const { matches, isLoading, isError, errorMessage } = state
  console.log("matches: ",matches);

  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

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
    <div className="flex flex-row overflow-x-auto w-full p-4 bg-gray-100">
      <div className="flex flex-row">
        {matches.map((match: any) => {
          return (
            <div className='border-2 mx-2 mb-1 rounded border-red-400 p-2 bg-red-100'>
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
       </div>
          )
        })}
      </div>
    </div>
  )
}