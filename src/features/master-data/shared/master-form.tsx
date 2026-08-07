import { useMemo, useState } from 'react'
import { CheckCircle2, FileText, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle, Input, SecondaryButton, Select } from '@/components/ui/primitives'
import type { MasterConfig } from './types'
import { useUnsavedChangesWarning } from './use-unsaved-changes-warning'

export function MasterForm({
  config,
  mode,
  initialData,
}: {
  config: MasterConfig
  mode: 'create' | 'edit'
  initialData?: Record<string, string | number>
}) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [fileName, setFileName] = useState('')
  const [imageName, setImageName] = useState('')

  useUnsavedChangesWarning(dirty)

  const title = useMemo(() => `${mode === 'create' ? 'Create' : 'Edit'} ${config.singularLabel}`, [config.singularLabel, mode])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const nextErrors: Record<string, string> = {}

    config.formFields.forEach((field) => {
      if (!field.required) return
      const value = String(data.get(field.name) ?? '').trim()
      if (!value) {
        nextErrors[field.name] = `${field.label} is required`
      }
    })

    setErrors(nextErrors)
    setSubmitted(false)

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true)
      setDirty(false)
      toast.success(`${config.singularLabel} saved successfully`)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit} onChange={() => setDirty(true)}>
          {config.formFields.map((field) => {
            const error = errors[field.name]
            const defaultValue = initialData?.[field.name]

            if (field.type === 'textarea') {
              return (
                <label key={field.name} className="md:col-span-2">
                  <span className="mb-1 block text-sm font-medium">{field.label}{field.required ? ' *' : ''}</span>
                  <textarea
                    name={field.name}
                    defaultValue={defaultValue as string | undefined}
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
                  <span className="mb-1 block text-sm font-medium">{field.label}{field.required ? ' *' : ''}</span>
                  <Select name={field.name} defaultValue={(defaultValue as string | undefined) ?? ''}>
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>{option}</option>
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
                    <span className="text-sm text-muted-foreground">{fileName || 'Upload file attachment'}</span>
                    <input
                      className="hidden"
                      id={`${config.entity}-${field.name}-file`}
                      name={field.name}
                      type="file"
                      onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')}
                    />
                    <label
                      className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium hover:bg-muted"
                      htmlFor={`${config.entity}-${field.name}-file`}
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
                    <span className="text-sm text-muted-foreground">{imageName || 'Upload image file'}</span>
                    <input
                      className="hidden"
                      id={`${config.entity}-${field.name}-image`}
                      name={field.name}
                      type="file"
                      accept="image/*"
                      onChange={(event) => setImageName(event.target.files?.[0]?.name ?? '')}
                    />
                    <label
                      className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium hover:bg-muted"
                      htmlFor={`${config.entity}-${field.name}-image`}
                    >
                      Choose Image
                    </label>
                  </div>
                </label>
              )
            }

            return (
              <label key={field.name}>
                <span className="mb-1 block text-sm font-medium">{field.label}{field.required ? ' *' : ''}</span>
                <Input
                  defaultValue={defaultValue as string | number | undefined}
                  name={field.name}
                  placeholder={field.placeholder ?? field.label}
                  type={field.type === 'date' ? 'date' : field.type}
                />
                {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
              </label>
            )
          })}
          <div className="md:col-span-2 flex flex-wrap items-center justify-end gap-2">
            {dirty ? <p className="mr-auto text-xs text-amber-600 dark:text-amber-400">You have unsaved changes.</p> : null}
            {submitted ? (
              <p className="mr-auto flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                Saved successfully.
              </p>
            ) : null}
            <SecondaryButton
              type="button"
              onClick={() => {
                setErrors({})
                setDirty(false)
              }}
            >
              Reset
            </SecondaryButton>
            <button className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground" type="submit">
              {mode === 'create' ? `Create ${config.singularLabel}` : `Save ${config.singularLabel}`}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
