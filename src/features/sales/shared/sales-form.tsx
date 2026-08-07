import { useState } from 'react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle, Input, SecondaryButton, Select } from '@/components/ui/primitives'
import { useUnsavedChangesWarning } from '@/features/master-data/shared/use-unsaved-changes-warning'

export function SalesForm({ title }: { title: string }) {
  const [dirty, setDirty] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  useUnsavedChangesWarning(dirty)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const next: Record<string, string> = {}
    ;['customer', 'invoiceDate', 'status'].forEach((field) => {
      const value = String(data.get(field) ?? '').trim()
      if (!value) next[field] = 'Required field'
    })

    setErrors(next)
    setSubmitted(false)
    if (Object.keys(next).length === 0) {
      setSubmitted(true)
      setDirty(false)
      toast.success(`${title} saved successfully`)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit} onChange={() => setDirty(true)}>
          <label>
            <span className="mb-1 block text-sm font-medium">Customer *</span>
            <Select name="customer" defaultValue="">
              <option value="">Select customer</option>
              <option>Orbit Engineering LLC</option>
              <option>Metro Build Systems</option>
              <option>Prime Energy Works</option>
            </Select>
            {errors.customer ? <p className="mt-1 text-xs text-destructive">{errors.customer}</p> : null}
          </label>
          <label>
            <span className="mb-1 block text-sm font-medium">Invoice Date *</span>
            <Input name="invoiceDate" type="date" />
            {errors.invoiceDate ? <p className="mt-1 text-xs text-destructive">{errors.invoiceDate}</p> : null}
          </label>
          <label>
            <span className="mb-1 block text-sm font-medium">Reference</span>
            <Input name="reference" placeholder="Reference number" />
          </label>
          <label>
            <span className="mb-1 block text-sm font-medium">Status *</span>
            <Select name="status" defaultValue="">
              <option value="">Select status</option>
              <option>Draft</option>
              <option>Pending</option>
              <option>Approved</option>
            </Select>
            {errors.status ? <p className="mt-1 text-xs text-destructive">{errors.status}</p> : null}
          </label>
          <label className="md:col-span-2">
            <span className="mb-1 block text-sm font-medium">Notes</span>
            <textarea className="min-h-24 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20" name="notes" placeholder="Commercial notes" />
          </label>
          <div className="md:col-span-2 flex items-center justify-end gap-2">
            {dirty ? <p className="mr-auto text-xs text-amber-600 dark:text-amber-400">You have unsaved changes.</p> : null}
            {submitted ? <p className="mr-auto text-xs text-emerald-600 dark:text-emerald-400">Saved successfully.</p> : null}
            <SecondaryButton type="button" onClick={() => setErrors({})}>Reset</SecondaryButton>
            <button className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground" type="submit">Save</button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
