import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Every route change should start at the top of the page. */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
