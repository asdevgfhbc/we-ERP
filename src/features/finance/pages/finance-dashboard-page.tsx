import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'
import { formatCurrency } from '@/lib/utils'
import { financeKpis } from '@/features/finance/data/finance-data'

export function FinanceDashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {financeKpis.map((kpi) => (
        <Card key={kpi.label}>
          <CardHeader><CardTitle>{kpi.label}</CardTitle></CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-semibold">{formatCurrency(kpi.value)}</p>
            <p className="text-xs text-muted-foreground">{kpi.hint}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
