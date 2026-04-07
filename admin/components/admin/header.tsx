import { Bell, Settings, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  userName: string
}

export default function Header({ userName }: HeaderProps) {
  const userInitial = userName.split(' ').map(n => n[0]).join('').toUpperCase()

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Service Management Dashboard</h2>
          <p className="text-xs md:text-sm text-gray-600 mt-1 hidden sm:block">Manage and track citizen service requests</p>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
         

          <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-4 border-l border-gray-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-600">Administrator</p>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs md:text-sm">
              {userInitial}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
