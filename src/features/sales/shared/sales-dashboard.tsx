import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'
import { formatCurrency } from '@/lib/utils'
import { salesActivities, salesDashboardKpis, salesRevenueTrend, topSalesCustomers, topSalesProducts } from './data'

export function SalesDashboardView() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {salesDashboardKpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader>
              <CardTitle>{kpi.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-3xl font-semibold">{typeof kpi.value === 'number' ? formatCurrency(kpi.value) : kpi.value}</p>
              <p className="text-sm text-muted-foreground">{kpi.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Revenue Chart</CardTitle></CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesRevenueTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line dataKey="expenses" stroke="hsl(var(--chart-3))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Monthly Orders</CardTitle></CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesRevenueTrend}>
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

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Top Customers</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {topSalesCustomers.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-xl border border-border p-3">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">{formatCurrency(item.value)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Top Products</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {topSalesProducts.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-xl border border-border p-3">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.units} units</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Recent Sales Activities</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {salesActivities.map((activity) => (
              <div key={activity} className="rounded-xl border border-border p-3 text-sm text-muted-foreground">{activity}</div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
