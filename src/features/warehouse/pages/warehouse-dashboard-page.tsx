import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'
import { formatCurrency } from '@/lib/utils'
import { inventoryTrend, stockByWarehouse, warehouseActivities, warehouseKpis } from '@/features/warehouse/data/warehouse-data'

export function WarehouseDashboardPage() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {warehouseKpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader><CardTitle>{kpi.label}</CardTitle></CardHeader>
            <CardContent>
              <p className="font-display text-2xl font-semibold">{typeof kpi.value === 'number' ? formatCurrency(kpi.value) : kpi.value}</p>
              <p className="text-xs text-muted-foreground">{kpi.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Inventory Trend</CardTitle></CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={inventoryTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Stock by Warehouse</CardTitle></CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockByWarehouse}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="warehouse" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Recent Warehouse Activities</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {warehouseActivities.map((activity) => (
            <div key={activity} className="rounded-xl border border-border p-3 text-sm text-muted-foreground">{activity}</div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
