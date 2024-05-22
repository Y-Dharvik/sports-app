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
    <div className="flex flex-row overflow-x-auto w-full p-4 bg-gray-100">
      <div className="flex flex-row">
      {matches.map((match: any) => {
        return (
          <MatchId key={match.id} id={match.id} />
        );
      })}
      </div>
    </div>
  )
}