import { useEffect, useState } from 'react'
import { Upload } from 'lucide-react'
import type { ErpPage } from '@/app/pages'
import { Card, CardContent, CardHeader, CardTitle, Input, SecondaryButton } from '@/components/ui/primitives'
import { DataTableSection, LoadingState, SearchFilterBar } from '@/components/shared/page-primitives'

function FormSection({ page }: { page: ErpPage }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{page.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2">
        <Input placeholder="Name" />
        <Input placeholder="Reference" />
        <Input type="date" />
        <Input placeholder="Amount" />
        <Input placeholder="Assigned User" />
        <Input placeholder="Department" />
        <label className="md:col-span-2">
          <span className="mb-1 block text-sm text-muted-foreground">File Upload</span>
          <div className="flex items-center gap-2 rounded-lg border border-dashed border-border p-4">
            <Upload className="h-4 w-4" />
            <span className="text-sm text-muted-foreground">Drop files here or browse</span>
            <SecondaryButton className="ml-auto">Browse</SecondaryButton>
          </div>
        </label>
        <div className="md:col-span-2 flex justify-end gap-2">
          <SecondaryButton>Cancel</SecondaryButton>
          <SecondaryButton className="text-destructive hover:bg-destructive/10">Delete</SecondaryButton>
          <button className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground" type="button">
            Save
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

function DetailSection({ page }: { page: ErpPage }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{page.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {[
          ['Code', 'ERP-220901'],
          ['Status', 'Approved'],
          ['Owner', 'Operations Team'],
          ['Created', '2026-08-06'],
          ['Updated', '2026-08-06'],
          ['Branch', 'North Hub'],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-border p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
            <p className="font-medium">{value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function GenericPage({ page }: { page: ErpPage }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450)
    return () => clearTimeout(timer)
  }, [page.path])

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">{page.title}</h1>
        <p className="text-sm text-muted-foreground">{page.module} module with mock data, reusable controls, and responsive enterprise tables.</p>
      </div>

      <SearchFilterBar title={page.title} />

      {loading ? (
        <LoadingState />
      ) : page.kind === 'form' ? (
        <FormSection page={page} />
      ) : page.kind === 'detail' ? (
        <DetailSection page={page} />
      ) : (
        <DataTableSection pageTitle={page.title} />
      )}
    </div>
  )
}
