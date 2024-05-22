import { useMatchesState } from '../../context/matches/context'
import MatchId from './Match.tsx'

export default function LiveMatchList() {
  const state: any = useMatchesState()
  const { matches, isLoading, isError, errorMessage } = state
  console.log("matches: ",matches);

  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {matches.map((match : any) =>{
        return(
          <MatchId key={match.id} id={match.id} />
        )
      })}
    </>
  )
}