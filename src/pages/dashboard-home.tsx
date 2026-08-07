import { useEffect, useState } from 'react'
import { AlertTriangle, Truck } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { dashboardStats, lowStockAlerts, monthlyPerformance } from '@/app/mock-data'
import { formatCurrency } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle, Skeleton } from '@/components/ui/primitives'
import { StatusBadge } from '@/components/shared/page-primitives'

export function DashboardHomePage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-72 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Dashboard Home</h1>
        <p className="text-sm text-muted-foreground">Sales, purchase, inventory, and finance overview in one unified cockpit.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <CardTitle>{stat.title}</CardTitle>
              <StatusBadge value="Approved" />
            </CardHeader>
            <CardContent>
              <p className="font-display text-3xl font-semibold">{formatCurrency(stat.value)}</p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">{stat.trend} vs last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="purchase" stroke="hsl(var(--chart-2))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory & Margin Analytics</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="margin" fill="hsl(var(--chart-3))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {lowStockAlerts.map((item) => (
              <div key={item.sku} className="rounded-xl border border-border p-3">
                <p className="font-medium">{item.product}</p>
                <p className="text-sm text-muted-foreground">{item.sku} - Qty {item.qty} (Min {item.min})</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-indigo-500" />
              Pending Deliveries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {['DEL-2201', 'DEL-2207', 'DEL-2234', 'DEL-2290'].map((delivery) => (
              <div key={delivery} className="flex items-center justify-between rounded-xl border border-border p-3">
                <div>
                  <p className="font-medium">{delivery}</p>
                  <p className="text-sm text-muted-foreground">Expected within 24 hours</p>
                </div>
                <StatusBadge value="In Transit" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
