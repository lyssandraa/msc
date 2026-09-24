import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

import Home from './pages/Home.jsx'
import Research from './pages/Research.jsx'
import Thesis from './pages/Thesis.jsx'
import Process from './pages/Process.jsx'
import Committee from './pages/Committee.jsx'
import Alumni from './pages/Alumni.jsx'
import Sponsors from './pages/Sponsors.jsx'
import Updates from './pages/Updates.jsx'
import Apply from './pages/Apply.jsx'
import NotFound from './pages/NotFound.jsx'

import UpdateDetail from './pages/updates/UpdateDetail.jsx'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/research" element={<Research />} />
          <Route path="/thesis" element={<Thesis />} />
          <Route path="/process" element={<Process />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/updates/:slug" element={<UpdateDetail />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
