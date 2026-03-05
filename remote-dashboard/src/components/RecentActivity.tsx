import { memo } from 'react'
import type { Activity } from '../types'

export const ActivityItem = memo(function ActivityItem({
  activity,
}: {
  activity: Activity
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-stone-50">
      <div className="w-8 h-8 rounded-xl text-white flex items-center justify-center text-xs font-black shrink-0 bg-gradient-to-br from-violet-600 to-indigo-600">
        {activity.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-stone-900">
          <span className="font-bold">{activity.user}</span>{' '}
          <span className="text-stone-500">{activity.action}</span>
        </p>
        <p className="font-mono mt-0.5 text-[10px] text-stone-400">
          {activity.time}
        </p>
      </div>
    </div>
  )
})
