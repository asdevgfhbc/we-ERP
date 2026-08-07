import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, FileText, Image as ImageIcon } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { toast } from 'sonner'
import type { PageDefinition } from '@/app/pages'
import {
  dashboardCategory,
  dashboardPerformance,
  lowStockAlerts,
  recentActivities,
  topCustomers,
  topProducts,
} from '@/app/pages'
import { formatCurrency } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle, Input, SecondaryButton, Select } from '@/components/ui/primitives'
import { DataTableSection, LoadingState, SearchFilterBar, StatusBadge } from '@/components/shared/page-primitives'

type ModulePageBaseProps = {
  page: PageDefinition
  primaryActionLabel: string
}

function DetailSection({ page }: { page: PageDefinition }) {
  const records = useMemo(
    () => [
      { label: 'Reference', value: `${page.entity.toUpperCase()}-2026-001` },
      { label: 'Status', value: 'Approved' },
      { label: 'Owner', value: 'Operations Team' },
      { label: 'Branch', value: 'Head Office' },
      { label: 'Created On', value: '2026-08-06' },
      { label: 'Last Updated', value: '2026-08-06' },
    ],
    [page.entity],
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>{page.title} Details</CardTitle>
        <StatusBadge value="Approved" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {records.map((record) => (
            <div key={record.label} className="rounded-xl border border-border p-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{record.label}</p>
              <p className="mt-1 font-medium">{record.value}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-border p-4">
            <p className="mb-3 font-semibold">Activity</p>
            <div className="space-y-3 text-sm text-muted-foreground">
              {recentActivities.map((activity) => (
                <div key={activity} className="rounded-xl bg-muted/50 p-3">
                  {activity}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border p-4">
            <p className="mb-3 font-semibold">Summary</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['Net Value', formatCurrency(128400)],
                ['Open Items', '18'],
                ['Priority', 'Medium'],
                ['Compliance', 'On Track'],
              ].map(([label, value]) => (
                <div key={label as string} className="rounded-xl bg-muted/50 p-3">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
                  <p className="mt-1 font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function FormSection({ page }: { page: PageDefinition }) {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [fileName, setFileName] = useState('')
  const [imageName, setImageName] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const nextErrors: Record<string, string> = {}

    page.formFields.forEach((field) => {
      if (!field.required) return
      const value = String(formData.get(field.name) ?? '').trim()
      if (!value) nextErrors[field.name] = `${field.label} is required`
    })

    setErrors(nextErrors)
    setSubmitted(false)

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true)
      toast.success(`${page.title} saved successfully`)
      event.currentTarget.reset()
      setFileName('')
      setImageName('')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{page.title}</CardTitle>
        <StatusBadge value={submitted ? 'Approved' : 'Pending'} />
      </CardHeader>
      <CardContent>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          {page.formFields.map((field) => {
            const error = errors[field.name]

            if (field.type === 'textarea') {
              return (
                <label key={field.name} className="md:col-span-2">
                  <span className="mb-1 block text-sm font-medium">
                    {field.label}
                    {field.required ? ' *' : ''}
                  </span>
                  <textarea
                    name={field.name}
                    placeholder={field.placeholder}
                    className="min-h-28 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
                  />
                  {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
                </label>
              )
            }

            if (field.type === 'select') {
              return (
                <label key={field.name}>
                  <span className="mb-1 block text-sm font-medium">
                    {field.label}
                    {field.required ? ' *' : ''}
                  </span>
                  <Select name={field.name} defaultValue="">
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                  {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
                </label>
              )
            }

            if (field.type === 'file') {
              return (
                <label key={field.name} className="md:col-span-2">
                  <span className="mb-1 block text-sm font-medium">{field.label}</span>
                  <div className="flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-border p-4">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{fileName || 'Drop files here or browse'}</span>
                    <input
                      className="hidden"
                      id={`${page.path}-${field.name}`}
                      name={field.name}
                      type="file"
                      onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')}
                    />
                    <label
                      className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium hover:bg-muted"
                      htmlFor={`${page.path}-${field.name}`}
                    >
                      Browse
                    </label>
                  </div>
                </label>
              )
            }

            if (field.type === 'image') {
              return (
                <label key={field.name} className="md:col-span-2">
                  <span className="mb-1 block text-sm font-medium">{field.label}</span>
                  <div className="flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-border p-4">
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{imageName || 'Upload company or item image'}</span>
                    <input
                      className="hidden"
                      id={`${page.path}-${field.name}`}
                      name={field.name}
                      type="file"
                      accept="image/*"
                      onChange={(event) => setImageName(event.target.files?.[0]?.name ?? '')}
                    />
                    <label
                      className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium hover:bg-muted"
                      htmlFor={`${page.path}-${field.name}`}
                    >
                      Choose Image
                    </label>
                  </div>
                </label>
              )
            }

            return (
              <label key={field.name}>
                <span className="mb-1 block text-sm font-medium">
                  {field.label}
                  {field.required ? ' *' : ''}
                </span>
                <Input name={field.name} placeholder={field.placeholder ?? field.label} type={field.type === 'date' ? 'date' : field.type} />
                {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
              </label>
            )
          })}
          <div className="md:col-span-2 flex flex-wrap items-center justify-end gap-2">
            {submitted ? (
              <div className="mr-auto flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                Changes saved successfully.
              </div>
            ) : null}
            <SecondaryButton type="button" onClick={() => setErrors({})}>
              Reset Errors
            </SecondaryButton>
            <SecondaryButton type="button">
              Cancel
            </SecondaryButton>
            <button className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground" type="submit">
              Save {page.title}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function DashboardSection() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Today's Sales", 184200],
          ["Today's Purchases", 93100],
          ['Revenue', 1842000],
          ['Profit', 487000],
        ].map(([label, value]) => (
          <Card key={label as string}>
            <CardHeader>
              <CardTitle>{label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-3xl font-semibold">{formatCurrency(Number(value))}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                <Bar dataKey="purchase" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dashboardCategory.map((item) => (
              <div key={item.category} className="rounded-xl border border-border p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{item.category}</p>
                  <p className="text-sm text-muted-foreground">{item.sales}% share</p>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${item.sales}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {lowStockAlerts.map((item) => (
              <div key={item.sku} className="flex items-center justify-between rounded-xl border border-border p-3">
                <div>
                  <p className="font-medium">{item.product}</p>
                  <p className="text-sm text-muted-foreground">{item.warehouse}</p>
                </div>
                <StatusBadge value="Pending" />
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
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">{formatCurrency(item.value)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
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
              <div key={activity} className="rounded-xl border border-border p-3 text-sm text-muted-foreground">
                {activity}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ReportSection({ page }: { page: PageDefinition }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Report Period', 'This Month'],
          ['Searchable Rows', '24'],
          ['Export Options', 'PDF / Excel'],
          ['Print Ready', 'Yes'],
        ].map(([label, value]) => (
          <Card key={label as string}>
            <CardHeader>
              <CardTitle>{label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{page.title}</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dashboardPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey={page.entity.includes('purchase') ? 'purchase' : page.entity.includes('inventory') ? 'profit' : 'sales'} fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <DataTableSection page={page} />
    </div>
  )
}

export function ModulePageBase({ page, primaryActionLabel }: ModulePageBaseProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450)
    return () => clearTimeout(timer)
  }, [page.path])

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">{page.title}</h1>
          <p className="text-sm text-muted-foreground">{page.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <SecondaryButton>Export</SecondaryButton>
          <SecondaryButton>Print</SecondaryButton>
          <button className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground" type="button">
            {primaryActionLabel}
          </button>
        </div>
      </div>

      {page.kind !== 'dashboard' && page.kind !== 'report' ? <SearchFilterBar title={page.title} /> : null}

      {loading ? (
        <LoadingState />
      ) : page.kind === 'form' ? (
        <FormSection page={page} />
      ) : page.kind === 'detail' ? (
        <DetailSection page={page} />
      ) : page.kind === 'dashboard' ? (
        <DashboardSection />
      ) : page.kind === 'report' ? (
        <ReportSection page={page} />
      ) : (
        <DataTableSection page={page} />
      )}
    </div>
  )
}