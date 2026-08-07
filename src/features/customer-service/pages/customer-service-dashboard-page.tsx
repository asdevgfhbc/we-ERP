import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'
import { customerServiceKpis } from '@/features/customer-service/data/customer-service-data'

export function CustomerServiceDashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {customerServiceKpis.map((kpi) => (
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
