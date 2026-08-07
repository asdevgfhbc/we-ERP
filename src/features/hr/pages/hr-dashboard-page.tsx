import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'
import { hrKpis } from '@/features/hr/data/hr-data'

export function HrDashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {hrKpis.map((kpi) => (
        <Card key={kpi.label}>
          <CardHeader><CardTitle>{kpi.label}</CardTitle></CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-semibold">{kpi.value}</p>
            <p className="text-xs text-muted-foreground">{kpi.hint}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
