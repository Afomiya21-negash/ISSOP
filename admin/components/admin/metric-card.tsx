import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  color: 'blue' | 'amber' | 'green' | 'red'
  bgColor: string
  description: string
}

const colorClasses = {
  blue: 'text-blue-600',
  amber: 'text-amber-600',
  green: 'text-green-600',
  red: 'text-red-600',
}

export default function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  color,
  bgColor,
  description,
}: MetricCardProps) {
  const isPositive = change.startsWith('+')

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 md:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex-1">
          <p className="text-xs md:text-sm text-slate-500 font-medium">{title}</p>
          <p className="text-xl md:text-2xl font-bold text-slate-900 mt-1 md:mt-2">{value}</p>
        </div>
        <div className={`${bgColor} p-2 md:p-3 rounded-lg ml-2`}>
          <Icon size={20} className={colorClasses[color]} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">{description}</p>
        <span
          className={`text-xs md:text-sm font-semibold ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  )
}
