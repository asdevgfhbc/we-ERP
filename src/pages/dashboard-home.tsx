import { useEffect, useState } from 'react'
import { AlertTriangle, ArrowRight, Truck } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { dashboardCategory, dashboardPerformance, dashboardStats, lowStockAlerts, recentActivities, topCustomers, topProducts } from '@/app/pages'
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
        <p className="text-sm text-muted-foreground">Executive overview for sales, purchasing, warehouse, finance, and operations.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <CardTitle>{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-3xl font-semibold">{formatCurrency(stat.value)}</p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">{stat.delta} vs yesterday</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales Chart</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardPerformance}>
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
            <CardTitle>Monthly Purchase Chart</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="purchase" fill="hsl(var(--chart-3))" radius={[8, 8, 0, 0]} />
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
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{item.product}</p>
                    <p className="text-sm text-muted-foreground">{item.warehouse} - {item.sku}</p>
                  </div>
                  <StatusBadge value="Pending" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Qty {item.qty} / Min {item.min}</p>
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
            {['DLV-2026-0004', 'DLV-2026-0012', 'DLV-2026-0021', 'DLV-2026-0033'].map((delivery) => (
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

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dashboardCategory.map((item) => (
              <div key={item.category} className="rounded-xl border border-border p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{item.category}</p>
                  <p className="text-sm text-muted-foreground">{item.sales}%</p>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${item.sales}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topCustomers.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-xl border border-border p-3">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Enterprise account</p>
                </div>
                <p className="text-sm text-muted-foreground">{formatCurrency(item.value)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topProducts.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-xl border border-border p-3">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.value} units</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity} className="flex items-start gap-3 rounded-xl border border-border p-3">
                <ArrowRight className="mt-0.5 h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">{activity}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
