import { createFileRoute } from '@tanstack/react-router'
import { useContext } from 'react'
import { TabContext } from './__root'
import { motion, AnimatePresence } from 'framer-motion'
import { Hero } from '../components/Hero'
import { Projects } from '../components/Projects'
import { Experience } from '../components/Experience'
import { About } from '../components/About'
import { Contact } from '../components/Contact'
import { Blog } from '../components/Blog'

export const Route = createFileRoute('/')({ component: App })

const tabComponents: Record<string, React.FC<any>> = {
  Home: Hero,
  Projects: Projects,
  Experience: Experience,
  Blog: Blog,
  About: About,
  Contact: Contact,
}

function App() {
  const { activeTab, handleTabChange } = useContext(TabContext)

  const Component = tabComponents[activeTab]

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden" style={{ color: 'var(--color-text-primary)' }} id="home">
      <div className={`relative z-10 mx-auto w-full h-full pt-20 pb-10 overflow-x-hidden ${activeTab === 'Home' ? 'overflow-y-hidden' : 'overflow-y-auto'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full min-h-full"
          >
            {activeTab === 'Home' ? (
              <Component onNavigate={handleTabChange} />
            ) : (
              <Component />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
