
import { useEffect } from 'react'
import { useMatchesDispatch } from '../../context/matches/context'
import { fetchMatches } from '../../context/matches/action'
import ErrorBoundary from '../ErrorBoundary'
import { Suspense } from 'react'
import MatchList from './MatchList'
import { useTranslation } from 'react-i18next'

export default function LiveMatch() {
  const { t } = useTranslation()
  const matchDispatch = useMatchesDispatch()

  useEffect(()=>{
    fetchMatches(matchDispatch)
  },[matchDispatch])

  return (
    <div>
      <h1 className="text-gray-900 font-bold mb-2 mt-4 ml-2 text-2xl">{t("Live Games")}</h1>
      <div className='mt-2 justify-between flex items-center w-full'>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <MatchList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
}