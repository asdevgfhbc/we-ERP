import { useState } from 'react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle, Input, SecondaryButton, Select } from '@/components/ui/primitives'
import { useUnsavedChangesWarning } from '@/features/master-data/shared/use-unsaved-changes-warning'

export function PurchaseForm({ title }: { title: string }) {
  const [dirty, setDirty] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useUnsavedChangesWarning(dirty)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const next: Record<string, string> = {}

    ;['supplier', 'orderDate', 'currency', 'expectedDate', 'status'].forEach((field) => {
      const value = String(data.get(field) ?? '').trim()
      if (!value) next[field] = 'Required field'
    })

    if (!data.get('attachments') || Number((data.get('attachments') as File).size ?? 0) <= 0) {
      next.attachments = 'Attachment is required'
    }

    setErrors(next)

    if (Object.keys(next).length === 0) {
      setDirty(false)
      toast.success(`${title} saved successfully`)
    }
  }

  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit} onChange={() => setDirty(true)}>
          <label>
            <span className="mb-1 block text-sm font-medium">Supplier *</span>
            <Select name="supplier" defaultValue="">
              <option value="">Select supplier</option>
              <option>Global Industrial Source</option>
              <option>Nova Parts Trading</option>
              <option>Harborline Components</option>
            </Select>
            {errors.supplier ? <p className="mt-1 text-xs text-destructive">{errors.supplier}</p> : null}
          </label>
          <label>
            <span className="mb-1 block text-sm font-medium">Order Date *</span>
            <Input name="orderDate" type="date" />
            {errors.orderDate ? <p className="mt-1 text-xs text-destructive">{errors.orderDate}</p> : null}
          </label>
          <label>
            <span className="mb-1 block text-sm font-medium">Expected Delivery Date *</span>
            <Input name="expectedDate" type="date" />
            {errors.expectedDate ? <p className="mt-1 text-xs text-destructive">{errors.expectedDate}</p> : null}
          </label>
          <label>
            <span className="mb-1 block text-sm font-medium">Currency *</span>
            <Select name="currency" defaultValue="">
              <option value="">Select currency</option>
              <option>USD</option>
              <option>EUR</option>
              <option>SAR</option>
            </Select>
            {errors.currency ? <p className="mt-1 text-xs text-destructive">{errors.currency}</p> : null}
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
          <label>
            <span className="mb-1 block text-sm font-medium">Image Upload</span>
            <Input name="previewImage" type="file" accept="image/*" />
          </label>
          <label className="md:col-span-2">
            <span className="mb-1 block text-sm font-medium">File Upload (Attachments) *</span>
            <Input name="attachments" type="file" multiple />
            {errors.attachments ? <p className="mt-1 text-xs text-destructive">{errors.attachments}</p> : null}
          </label>
          <label className="md:col-span-2">
            <span className="mb-1 block text-sm font-medium">Notes</span>
            <textarea className="min-h-24 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20" name="notes" placeholder="PO notes, shipment conditions, or customs constraints" />
          </label>

          <div className="md:col-span-2 flex items-center justify-end gap-2">
            {dirty ? <p className="mr-auto text-xs text-amber-600 dark:text-amber-400">You have unsaved changes.</p> : null}
            <SecondaryButton type="button" onClick={() => setErrors({})}>Reset</SecondaryButton>
            <button className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground" type="submit">Save</button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
