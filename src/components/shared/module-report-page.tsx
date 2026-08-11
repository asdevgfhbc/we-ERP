import { CalendarRange, Download, FileBarChart2, Filter, Printer, WandSparkles } from 'lucide-react'
import { useState } from 'react'
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Input, SecondaryButton, Select } from '@/components/ui/primitives'

type ModuleReportPageProps = {
  moduleName: string
}

export function ModuleReportPage({ moduleName }: ModuleReportPageProps) {
  const [range, setRange] = useState('this-month')
  const [format, setFormat] = useState('pdf')

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="inline-flex items-center gap-2">
            <FileBarChart2 className="h-4 w-4" />
            {moduleName} Report Generator
          </CardTitle>
          <Badge>In-module Reporting</Badge>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <CalendarRange className="h-4 w-4" />
              Date Range
            </span>
            <Select value={range} onChange={(event) => setRange(event.target.value)}>
              <option value="today">Today</option>
              <option value="last-7-days">Last 7 Days</option>
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
              <option value="this-quarter">This Quarter</option>
              <option value="custom">Custom</option>
            </Select>
          </label>

          <label className="space-y-2 text-sm">
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <Filter className="h-4 w-4" />
              Report Format
            </span>
            <Select value={format} onChange={(event) => setFormat(event.target.value)}>
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </Select>
          </label>

          <label className="space-y-2 text-sm md:col-span-2">
            <span className="text-muted-foreground">Notes / Filters</span>
            <Input placeholder={`e.g. ${moduleName} by branch, status, or owner`} />
          </label>

          <div className="flex flex-wrap gap-2 md:col-span-2">
            <Button className="gap-2">
              <WandSparkles className="h-4 w-4" />
              Generate Report
            </Button>
            <SecondaryButton className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </SecondaryButton>
            <SecondaryButton className="gap-2" onClick={() => window.print()}>
              <Printer className="h-4 w-4" />
              Print
            </SecondaryButton>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
