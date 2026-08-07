import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'
import { formatCurrency } from '@/lib/utils'
import { purchaseTrend, purchasingKpis, recentPurchaseActivities, topSuppliers } from '@/features/purchasing/data/purchasing-data'

export function PurchasingDashboardPage() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {purchasingKpis.map((kpi) => (
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
          <CardHeader><CardTitle>Purchase Trend Chart</CardTitle></CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={purchaseTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Monthly Purchase Orders</CardTitle></CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={purchaseTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Top Suppliers</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {topSuppliers.map((supplier) => (
              <div key={supplier.name} className="flex items-center justify-between rounded-xl border border-border p-3">
                <div>
                  <p className="font-medium">{supplier.name}</p>
                  <p className="text-xs text-muted-foreground">Lead Time: {supplier.leadTime} • Rating {supplier.rating}/5</p>
                </div>
                <p className="text-sm text-muted-foreground">{formatCurrency(supplier.value)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Recent Purchase Activities</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {recentPurchaseActivities.map((activity) => (
              <div key={activity} className="rounded-xl border border-border p-3 text-sm text-muted-foreground">{activity}</div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
