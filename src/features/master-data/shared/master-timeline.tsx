import type { TimelineEvent } from './types'
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui/primitives'
import { StatusBadge } from '@/components/shared/page-primitives'

export function MasterTimeline({ title, events }: { title: string; events: TimelineEvent[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="relative rounded-xl border border-border p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Badge>{event.action}</Badge>
                <p className="text-sm text-muted-foreground">{event.date}</p>
              </div>
              <StatusBadge value={event.status} />
            </div>
            <p className="text-sm font-medium">{event.actor}</p>
            <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
