'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Sidebar from '@/components/admin/sidebar'
import Header from '@/components/admin/header'
import Dashboard from '@/components/admin/dashboard'
import RequestsList from '@/components/admin/requests-list'

type ViewType = 'overview' | 'requests'

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (currentView) {
      case 'overview':
        return <Dashboard />
      case 'requests':
        return <RequestsList />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <div className="flex flex-col md:flex-row">
        {/* Mobile Menu Button */}
        <div className="md:hidden fixed top-4 left-4 z-40">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="bg-white shadow-lg"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Sidebar */}
        <div className={`
          fixed md:static inset-0 left-0 z-50 w-64 lg:w-72
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <Sidebar 
            currentView={currentView} 
            onNavigate={(view) => {
              setCurrentView(view)
              setIsSidebarOpen(false) // Close sidebar on mobile after navigation
            }} 
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          <Header userName="Admin User" />
          
          <main className="flex-1 p-4 md:p-8">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  )
}
