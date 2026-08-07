import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, Input, SecondaryButton } from '@/components/ui/primitives'
import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { exportFile } from '@/features/purchasing/utils/purchasing-utils'
import { formatCurrency } from '@/lib/utils'
import type { ReportBundle } from '@/features/reports/data/reports-data'

export function ReportPageView({
  title,
  bundle,
}: {
  title: string
  bundle: ReportBundle
}) {
  const [fromDate, setFromDate] = useState('2026-01-01')
  const [toDate, setToDate] = useState('2026-08-07')

  const columns = useMemo(() => {
    const sample = bundle.rows[0]
    if (!sample) return [] as Array<{ key: string; label: string; align?: 'left' | 'center' | 'right' }>
    return Object.keys(sample).map((key) => {
      const align: 'left' | 'right' = key.includes('amount') || key.includes('revenue') || key.includes('value') || key.includes('units')
        ? 'right'
        : 'left'
      return {
        key,
        label: key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (value) => value.toUpperCase()),
        align,
      }
    })
  }, [bundle.rows])

  const exportCsv = () => {
    const header = columns.map((column) => column.label).join(',')
    const body = bundle.rows.map((row) => columns.map((column) => `"${String(row[column.key] ?? '')}"`).join(',')).join('\n')
    exportFile(`${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.csv`, `${header}\n${body}`, 'text/csv;charset=utf-8;')
  }

  const exportExcel = () => {
    const header = columns.map((column) => column.label).join('\t')
    const body = bundle.rows.map((row) => columns.map((column) => String(row[column.key] ?? '')).join('\t')).join('\n')
    exportFile(`${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.xls`, `${header}\n${body}`, 'application/vnd.ms-excel')
  }

  const exportPdf = () => {
    const content = [
      `${title} Report`,
      `From: ${fromDate}`,
      `To: ${toDate}`,
      '',
      ...bundle.metrics.map((metric) => `${metric.label}: ${metric.value} (${metric.delta})`),
    ].join('\n')
    exportFile(`${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`, content, 'text/plain;charset=utf-8;')
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <Input type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} />
          <Input type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} />
          <div className="flex flex-wrap gap-2">
            <SecondaryButton onClick={exportCsv}>Export CSV</SecondaryButton>
            <SecondaryButton onClick={exportExcel}>Export Excel</SecondaryButton>
            <SecondaryButton onClick={exportPdf}>Export PDF</SecondaryButton>
            <SecondaryButton onClick={() => window.print()}>Print</SecondaryButton>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {bundle.metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader><CardTitle>{metric.label}</CardTitle></CardHeader>
            <CardContent>
              <p className="font-display text-2xl font-semibold">{formatCurrency(metric.value)}</p>
              <p className="text-xs text-muted-foreground">{metric.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Trend</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bundle.trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Line dataKey="primary" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line dataKey="secondary" stroke="hsl(var(--chart-3))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Breakdown</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bundle.breakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <PurchaseTable title={`${title} Records`} rows={bundle.rows} columns={columns} />
    </div>
  )
}
