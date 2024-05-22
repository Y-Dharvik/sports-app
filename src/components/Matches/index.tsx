
import { useEffect } from 'react'
import { useMatchesDispatch } from '../../context/matches/context'
import { fetchMatches } from '../../context/matches/action'
import MatchList from './MatchList'

export default function LiveMatch() {
  const matchDispatch = useMatchesDispatch()

  useEffect(()=>{
    fetchMatches(matchDispatch)
  },[matchDispatch])

  return (
    <div>
      <h1 className='text-gray-900 font-bold text-xl'>Live Games</h1>
      <div className='mt-2 justify-between flex items-center w-full'>
        <MatchList />
      </div>
    </div>
  )
}