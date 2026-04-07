'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface Request {
  id: string
  title: string
  location: string
  status: 'pending' | 'assigned' | 'in_progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  date: string
  citizen: string
}

export default function RecentRequests() {
  const requests: Request[] = [
    {
      id: 'REQ-001',
      title: 'Pothole on Main Street',
      location: 'Downtown District',
      status: 'in_progress',
      priority: 'high',
      date: '2 hours ago',
      citizen: 'John Doe',
    },
    {
      id: 'REQ-002',
      title: 'Street Light Not Working',
      location: 'Park Avenue',
      status: 'assigned',
      priority: 'medium',
      date: '4 hours ago',
      citizen: 'Sarah Adams',
    },
    {
      id: 'REQ-003',
      title: 'Drainage Issue',
      location: 'Riverside Area',
      status: 'pending',
      priority: 'high',
      date: '6 hours ago',
      citizen: 'Mike Johnson',
    },
    {
      id: 'REQ-004',
      title: 'Garbage Overflow',
      location: 'Commercial Zone',
      status: 'completed',
      priority: 'medium',
      date: '8 hours ago',
      citizen: 'Emma Wilson',
    },
    {
      id: 'REQ-005',
      title: 'Tree Branch Hazard',
      location: 'Residential Area',
      status: 'in_progress',
      priority: 'high',
      date: '10 hours ago',
      citizen: 'David Brown',
    },
  ]

  const getStatusColor = (status: Request['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-slate-100 text-slate-800'
      case 'assigned':
        return 'bg-blue-100 text-blue-800'
      case 'in_progress':
        return 'bg-amber-100 text-amber-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const getPriorityColor = (priority: Request['priority']) => {
    switch (priority) {
      case 'low':
        return 'text-slate-500'
      case 'medium':
        return 'text-amber-500'
      case 'high':
        return 'text-red-500'
      default:
        return 'text-slate-500'
    }
  }

  const getStatusLabel = (status: Request['status']) => {
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-bold text-gray-900">Recent Requests</h3>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 self-start sm:self-auto"
        >
          View All
          <ArrowRight size={16} />
        </Button>
      </div>

      <div className="space-y-2 md:space-y-3">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex flex-col sm:flex-row sm:items-start sm:justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors gap-3"
          >
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded w-fit">
                  {request.id}
                </span>
                <h4 className="text-sm font-medium text-gray-900">{request.title}</h4>
              </div>
              <p className="text-xs text-gray-600 mb-2">
                {request.location} · {request.citizen}
              </p>
              <div className="flex items-center gap-2 text-xs">
                <Badge className={getStatusColor(request.status)}>
                  {getStatusLabel(request.status)}
                </Badge>
                <span className={`font-medium ${getPriorityColor(request.priority)}`}>
                  {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="whitespace-nowrap text-xs self-start sm:self-auto"
            >
              View
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
