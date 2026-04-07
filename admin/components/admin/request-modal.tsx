'use client'

import { useState, useEffect } from 'react'
import { X, User, MapPin, Calendar, Phone, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

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

interface RequestModalProps {
  request: Request
  onClose: () => void
  onUpdate?: (updatedRequest: Request) => void
}

export default function RequestModal({ request, onClose, onUpdate }: RequestModalProps) {
  const [status, setStatus] = useState<Request['status']>(request.status)
  const [assignedAgent, setAssignedAgent] = useState(request.assignedAgent || '')
  const [showAssignMenu, setShowAssignMenu] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const agents = [
    'Robert Chen',
    'Jessica Martinez',
    'Marcus Anderson',
    'Lisa Thompson',
  ]

  const statuses = [
    'pending',
    'assigned',
    'in_progress',
    'completed',
    'rejected',
  ] as const

  // Load and save to localStorage
  useEffect(() => {
    const savedRequests = localStorage.getItem('issop_requests')
    if (savedRequests) {
      try {
        const requests = JSON.parse(savedRequests)
        const savedRequest = requests.find((r: Request) => r.id === request.id)
        if (savedRequest) {
          setStatus(savedRequest.status)
          setAssignedAgent(savedRequest.assignedAgent || '')
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error)
      }
    }
  }, [request.id])

  const handleUpdateRequest = () => {
    const updatedRequest: Request = {
      ...request,
      status,
      assignedAgent,
    }

    // Get existing requests from localStorage
    const savedRequests = localStorage.getItem('issop_requests')
    let requests: Request[] = []
    
    if (savedRequests) {
      try {
        requests = JSON.parse(savedRequests)
      } catch (error) {
        console.error('Error parsing localStorage:', error)
      }
    }

    // Update or add the request
    const existingIndex = requests.findIndex((r) => r.id === request.id)
    if (existingIndex >= 0) {
      requests[existingIndex] = updatedRequest
    } else {
      requests.push(updatedRequest)
    }

    // Save to localStorage
    localStorage.setItem('issop_requests', JSON.stringify(requests))

    // Show success message
    setShowSuccessMessage(true)
    setTimeout(() => {
      setShowSuccessMessage(false)
      onUpdate?.(updatedRequest)
      onClose()
    }, 1500)
  }

  const getStatusColor = (s: typeof status) => {
    switch (s) {
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
        return 'bg-slate-100 text-slate-800'
      case 'medium':
        return 'bg-amber-100 text-amber-800'
      case 'high':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{request.id}</h2>
            <p className="text-gray-600 text-sm mt-1">{request.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Request['status'])}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s
                      .split('_')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Priority
              </label>
              <Badge className={getPriorityColor(request.priority)}>
                {request.priority.charAt(0).toUpperCase() +
                  request.priority.slice(1)}
              </Badge>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Description
            </label>
            <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
              {request.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-gray-400 mt-1" />
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  Location
                </p>
                <p className="text-gray-900 font-medium">{request.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar size={20} className="text-gray-400 mt-1" />
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  Date Submitted
                </p>
                <p className="text-gray-900 font-medium">{request.date}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Citizen Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User size={18} className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Name</p>
                  <p className="text-sm font-medium text-gray-900">
                    {request.citizen}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="text-sm font-medium text-gray-900">
                    {request.citizedEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Assign to Agent
            </label>
            <div className="relative">
              <button
                onClick={() => setShowAssignMenu(!showAssignMenu)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span>
                  {assignedAgent || (
                    <span className="text-gray-400">Select an agent...</span>
                  )}
                </span>
                <span className="text-gray-400">▼</span>
              </button>

              {showAssignMenu && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {agents.map((agent) => (
                    <button
                      key={agent}
                      onClick={() => {
                        setAssignedAgent(agent)
                        setShowAssignMenu(false)
                      }}
                      className="w-full px-4 py-3 text-left text-sm text-gray-900 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                    >
                      {agent}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {assignedAgent && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800">
                Assigned to <strong>{assignedAgent}</strong>
              </p>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={showSuccessMessage}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleUpdateRequest}
            disabled={showSuccessMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            {showSuccessMessage && <Check size={18} />}
            {showSuccessMessage ? 'Saved to Storage' : 'Update Request'}
          </Button>
        </div>
      </div>
    </div>
  )
}
