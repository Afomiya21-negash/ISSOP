'use client'

import { TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import MetricCard from '@/components/admin/metric-card'
import RecentRequests from '@/components/admin/recent-requests'

type MetricColor = 'blue' | 'amber' | 'green' | 'red'

export default function Dashboard() {
  const metrics: Array<{
    title: string
    value: string
    change: string
    icon: any
    color: MetricColor
    bgColor: string
    description: string
  }> = [
    {
      title: 'Total Requests',
      value: '128',
      change: '+12%',
      icon: TrendingUp,
      color: 'blue',
      bgColor: 'bg-blue-50',
      description: 'All time',
    },
    {
      title: 'In Progress',
      value: '34',
      change: '+5%',
      icon: Clock,
      color: 'amber',
      bgColor: 'bg-amber-50',
      description: 'Active now',
    },
    {
      title: 'Completed',
      value: '89',
      change: '+18%',
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-50',
      description: 'Resolved',
    },
    {
      title: 'Pending',
      value: '5',
      change: '-2%',
      icon: AlertCircle,
      color: 'red',
      bgColor: 'bg-red-50',
      description: 'Unassigned',
    },
  ]

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            {...metric}
          />
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <RecentRequests />
      </div>
    </div>
  )
}
