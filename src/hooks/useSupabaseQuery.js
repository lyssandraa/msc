import { useEffect, useState } from 'react'

/** Runs a Supabase query on mount (and whenever `deps` change), tracking loading/data/error. */
export function useSupabaseQuery(queryFn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null })

  useEffect(() => {
    let active = true
    setState({ data: null, loading: true, error: null })

    queryFn()
      .then(({ data, error }) => {
        if (!active) return
        setState({ data: data ?? null, loading: false, error: error ?? null })
      })
      .catch((error) => {
        if (!active) return
        setState({ data: null, loading: false, error })
      })

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
