import { useEffect, useState } from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { API_ENDPOINT } from '../../config/constants'
import { Match } from '../../context/matches/types.ts'

interface Props {
  id : number
}



export default function MatchId(props : Props, State : Match) {
  const [match,setMatch] = useState<Match>(State)

  const fetchMatch = async (id : number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/matches/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch matche');
      }

      const data = await response.json();

      setMatch(data)
      console.log(match);
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  }

  useEffect(()=>{
    fetchMatch(props.id);
  }, [props.id]);

  return (
    <>
      {<div className='border-2 mx-2 mb-1 rounded border-red-400 p-2 bg-red-100'>
         <div className=' flex justify-between w-48'>
           <h3 className='font-bold text-black-800'>{match.sportName}</h3>
           <ArrowPathIcon className="h-6 w-6 hover:rotate-90 transition-all ease-in-out" aria-hidden="true" onClick={()=> { fetchMatch(match.id)}}/>
         </div>
         <p className='text-sm text-gray-600'>{match.location}</p>
          <p className='text-sm text-gray-600'>Date: {match.startsAt.slice(0,10)}</p>
         <div className='flex flex-col my-2'>
           <div className='flex justify-between mt-1'>
             <p className='font-semibold'>{match.teams[0].name}</p>
             <p className='font-semibold'>{match.score[match.teams[0].name]}</p>
           </div>
           <div className='flex justify-between'>
             <p className='font-semibold'>{match.teams[1].name}</p>
             <p className='font-semibold'>{match.score[match.teams[1].name]}</p>
           </div>
         </div>
       </div>}
    </>
  )
}