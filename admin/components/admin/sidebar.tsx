import { LayoutGrid, FileText, BarChart3, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ViewType = 'overview' | 'requests'

interface SidebarProps {
  currentView: ViewType
  onNavigate: (view: ViewType) => void
}

export default function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const menuItems = [
    {
      id: 'overview' as ViewType,
      label: 'Dashboard',
      icon: LayoutGrid,
    },
    {
      id: 'requests' as ViewType,
      label: 'Requests',
      icon: FileText,
    },
  ]

  return (
    <aside className="w-64 lg:w-72 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-white">ISSOP</h1>
        <p className="text-sm text-slate-400 mt-1">Admin Portal</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentView === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-slate-700">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-slate-300 hover:text-red-400 hover:bg-slate-700"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  )
}
