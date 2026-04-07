'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import RequestModal from '@/components/admin/request-modal'

interface Request {
  id: string
  title: string
  description: string
  location: string
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'rejected'
  priority: 'low' | 'medium' | 'high'
  date: string
  citizen: string
  citizedEmail: string
  imageUrl?: string
  assignedAgent?: string
}

interface RequestsListProps {
  onSelectRequest?: (id: string | null) => void
}

export default function RequestsList({ onSelectRequest }: RequestsListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [requestsData, setRequestsData] = useState<Request[]>([])

  // Initialize data from localStorage or default
  useEffect(() => {
    const savedRequests = localStorage.getItem('issop_requests')
    if (savedRequests) {
      try {
        setRequestsData(JSON.parse(savedRequests))
        return
      } catch (error) {
        console.error('Error loading from localStorage:', error)
      }
    }
    // Use default requests if nothing in localStorage
    setRequestsData(defaultRequests)
  }, [])

  const defaultRequests: Request[] = [
    {
      id: 'REQ-001',
      title: 'Pothole on Main Street',
      description: 'Large pothole causing traffic issues and vehicle damage',
      location: 'Downtown District',
      status: 'in_progress',
      priority: 'high',
      date: '2024-01-15',
      citizen: 'John Doe',
      citizedEmail: 'john@example.com',
      assignedAgent: 'Robert Chen',
    },
    {
      id: 'REQ-002',
      title: 'Street Light Not Working',
      description: 'Street lamp is broken and needs replacement',
      location: 'Park Avenue',
      status: 'assigned',
      priority: 'medium',
      date: '2024-01-14',
      citizen: 'Sarah Adams',
      citizedEmail: 'sarah@example.com',
      assignedAgent: 'Jessica Martinez',
    },
    {
      id: 'REQ-003',
      title: 'Drainage Issue',
      description: 'Water clogging in residential area during rain',
      location: 'Riverside Area',
      status: 'pending',
      priority: 'high',
      date: '2024-01-13',
      citizen: 'Mike Johnson',
      citizedEmail: 'mike@example.com',
    },
    {
      id: 'REQ-004',
      title: 'Garbage Overflow',
      description: 'Trash bins overflowing for past 3 days',
      location: 'Commercial Zone',
      status: 'completed',
      priority: 'medium',
      date: '2024-01-12',
      citizen: 'Emma Wilson',
      citizedEmail: 'emma@example.com',
      assignedAgent: 'Marcus Anderson',
    },
    {
      id: 'REQ-005',
      title: 'Tree Branch Hazard',
      description: 'Low hanging branch blocking pedestrian path',
      location: 'Residential Area',
      status: 'in_progress',
      priority: 'high',
      date: '2024-01-11',
      citizen: 'David Brown',
      citizedEmail: 'david@example.com',
      assignedAgent: 'Lisa Thompson',
    },
    {
      id: 'REQ-006',
      title: 'Sidewalk Crack',
      description: 'Cracked sidewalk posing tripping hazard',
      location: 'Main Street',
      status: 'pending',
      priority: 'low',
      date: '2024-01-10',
      citizen: 'Rachel Green',
      citizedEmail: 'rachel@example.com',
    },
  ]

  const filteredRequests = requestsData.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === 'all' || request.status === statusFilter
    const matchesPriority =
      priorityFilter === 'all' || request.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

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
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const getPriorityColor = (priority: Request['priority']) => {
    switch (priority) {
      case 'low':
        return 'text-slate-500'
      case 'medium':
        return 'text-amber-600'
      case 'high':
        return 'text-red-600'
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

  const handleRequestUpdate = (updatedRequest: Request) => {
    const updatedData = requestsData.map((req) =>
      req.id === updatedRequest.id ? updatedRequest : req
    )
    setRequestsData(updatedData)
    localStorage.setItem('issop_requests', JSON.stringify(updatedData))
  }

  return (
    <div className="p-4 md:p-8 space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900">Service Requests</h2>
        <p className="text-slate-500 mt-1">
          {filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 md:p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
            />
            <Input
              placeholder="Search by request ID, title, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Status</label>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Priority</label>
              <div className="relative">
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Actions</label>
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('all')
                  setPriorityFilter('all')
                }}
              >
                <Filter size={16} />
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-900">
                  Request ID
                </th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-900">
                  Title
                </th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-900">
                  Location
                </th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-900">
                  Citizen
                </th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-900">
                  Status
                </th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-900">
                  Priority
                </th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-900">
                  Agent
                </th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-center text-xs md:text-sm font-semibold text-slate-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-3 md:px-6 py-3 md:py-4">
                    <span className="text-xs md:text-sm font-bold text-blue-600 bg-blue-50 px-2 md:px-3 py-1 rounded">
                      {request.id}
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-slate-900 font-medium">
                    {request.title}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-slate-600">
                    {request.location}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-slate-600">
                    {request.citizen}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4">
                    <Badge className={getStatusColor(request.status)}>
                      {getStatusLabel(request.status)}
                    </Badge>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4">
                    <span
                      className={`text-xs md:text-sm font-semibold ${getPriorityColor(
                        request.priority
                      )}`}
                    >
                      {request.priority.charAt(0).toUpperCase() +
                        request.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-slate-600">
                    {request.assignedAgent || (
                      <span className="text-slate-400">Not assigned</span>
                    )}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedRequest(request)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRequests.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-slate-500">
              No requests found matching your filters
            </p>
          </div>
        )}
      </div>

      {/* Request Modal */}
      {selectedRequest && (
        <RequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onUpdate={handleRequestUpdate}
        />
      )}
    </div>
  )
}
