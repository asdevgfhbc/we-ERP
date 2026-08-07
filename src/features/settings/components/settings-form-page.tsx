import { useState } from 'react'
import { CheckCircle2, FileText, Image as ImageIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Input, SecondaryButton, Select } from '@/components/ui/primitives'
import type { SettingsFormConfig } from '@/features/settings/data/settings-data'
import { useSettingsFormState } from '@/features/settings/hooks/use-settings-form-state'
import { atLeastOneFile, requiredValue, validEmail, validPhone } from '@/features/settings/utils/settings-validators'

export function SettingsFormPage({ config }: { config: SettingsFormConfig }) {
  const [imageName, setImageName] = useState('')
  const [fileName, setFileName] = useState('')
  const { dirty, setDirty, submitted, setSubmitted, errors, setErrors, onSuccess } = useSettingsFormState(config.successMessage)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const nextErrors: Record<string, string> = {}

    config.fields.forEach((field) => {
      if (!field.required) return
      if (!requiredValue(data.get(field.name))) {
        nextErrors[field.name] = `${field.label} is required`
      }
    })

    if (config.requiredChecks?.includes('email')) {
      const emailField = config.fields.find((field) => field.type === 'email')
      if (emailField && !validEmail(data.get(emailField.name))) {
        nextErrors[emailField.name] = 'Enter a valid email address'
      }
    }

    if (config.requiredChecks?.includes('phone')) {
      const phoneField = config.fields.find((field) => field.type === 'tel')
      if (phoneField && !validPhone(data.get(phoneField.name))) {
        nextErrors[phoneField.name] = 'Enter a valid phone number'
      }
    }

    if (config.requiredChecks?.includes('image')) {
      const imageField = config.fields.find((field) => field.type === 'image')
      if (imageField && !atLeastOneFile(data.get(imageField.name))) {
        nextErrors[imageField.name] = 'Image upload is required'
      }
    }

    if (config.requiredChecks?.includes('file')) {
      const fileField = config.fields.find((field) => field.type === 'file' && field.required)
      if (fileField && !atLeastOneFile(data.get(fileField.name))) {
        nextErrors[fileField.name] = 'File upload is required'
      }
    }

    if (config.requiredChecks?.includes('start-before-end')) {
      const start = String(data.get('startDate') ?? '')
      const end = String(data.get('endDate') ?? '')
      if (start && end && start > end) {
        nextErrors.endDate = 'End date must be after start date'
      }
    }

    setErrors(nextErrors)
    setSubmitted(false)

    if (Object.keys(nextErrors).length === 0) {
      onSuccess()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{config.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit} onChange={() => setDirty(true)}>
          {config.fields.map((field) => {
            const error = errors[field.name]

            if (field.type === 'select') {
              return (
                <label key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
                  <span className="mb-1 block text-sm font-medium">{field.label}{field.required ? ' *' : ''}</span>
                  <Select name={field.name} defaultValue="">
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option) => <option key={option} value={option}>{option}</option>)}
                  </Select>
                  {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
                </label>
              )
            }

            if (field.type === 'textarea') {
              return (
                <label key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
                  <span className="mb-1 block text-sm font-medium">{field.label}{field.required ? ' *' : ''}</span>
                  <textarea
                    className="min-h-24 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
                    name={field.name}
                    placeholder={field.placeholder}
                  />
                  {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
                </label>
              )
            }

            if (field.type === 'image') {
              return (
                <label key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
                  <span className="mb-1 block text-sm font-medium">{field.label}{field.required ? ' *' : ''}</span>
                  <div className="flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-border p-4">
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{imageName || 'Upload image file'}</span>
                    <Input
                      className="h-auto border-none p-0 shadow-none"
                      name={field.name}
                      type="file"
                      accept="image/*"
                      onChange={(event) => setImageName(event.target.files?.[0]?.name ?? '')}
                    />
                  </div>
                  {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
                </label>
              )
            }

            if (field.type === 'file') {
              return (
                <label key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
                  <span className="mb-1 block text-sm font-medium">{field.label}{field.required ? ' *' : ''}</span>
                  <div className="flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-border p-4">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{fileName || 'Upload attachment'}</span>
                    <Input
                      className="h-auto border-none p-0 shadow-none"
                      name={field.name}
                      type="file"
                      onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')}
                    />
                  </div>
                  {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
                </label>
              )
            }

            return (
              <label key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
                <span className="mb-1 block text-sm font-medium">{field.label}{field.required ? ' *' : ''}</span>
                <Input name={field.name} type={field.type === 'date' ? 'date' : field.type} placeholder={field.placeholder} />
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
                setSubmitted(false)
                setDirty(false)
              }}
            >
              Reset
            </SecondaryButton>
            <button className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground" type="submit">
              Save {config.title}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
