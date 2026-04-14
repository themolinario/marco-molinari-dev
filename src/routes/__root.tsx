import { Outlet, createRootRoute, useNavigate, useRouterState } from '@tanstack/react-router'
import { useState, useEffect, createContext } from 'react'
import { Navbar } from '../components/Navbar'
import { Scene } from '../components/Scene'

import '../styles.css'

export const TabContext = createContext<{
  activeTab: string
  handleTabChange: (newTab: string) => void
  TABS: string[]
}>({
  activeTab: 'Home',
  handleTabChange: () => {},
  TABS: ['Home', 'Projects', 'Experience', 'Blog', 'About', 'Contact']
})

export const Route = createRootRoute({
  component: RootComponent,
})

const TABS = ['Home', 'Projects', 'Experience', 'Blog', 'About', 'Contact']

function RootComponent() {
  const [activeTab, setActiveTab] = useState('Home')
  const navigate = useNavigate()
  const routerState = useRouterState()

  // Sync activeTab with hash if on home page
  useEffect(() => {
    if (routerState.location.pathname === '/') {
      const hash = routerState.location.hash
      if (hash) {
        const matchingTab = TABS.find(t => t.toLowerCase() === hash)
        if (matchingTab && matchingTab !== activeTab) {
          setActiveTab(matchingTab)
        }
      }
    }
  }, [routerState.location.pathname, routerState.location.hash])

  const handleTabChange = (newTab: string) => {
    if (newTab === activeTab && routerState.location.pathname === '/') return
    setActiveTab(newTab)
    
    // If we're not on the home page, or we need to update the hash, navigate
    navigate({
      to: '/',
      hash: newTab.toLowerCase(),
    })
  }

  return (
    <TabContext.Provider value={{ activeTab, handleTabChange, TABS }}>
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />
      <Scene activeTab={activeTab} />
      
      <Outlet />
    </TabContext.Provider>
  )
}
