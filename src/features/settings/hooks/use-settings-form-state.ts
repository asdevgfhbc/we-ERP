import { useState } from 'react'
import { toast } from 'sonner'
import { useUnsavedChangesWarning } from '@/features/master-data/shared/use-unsaved-changes-warning'

export function useSettingsFormState(successMessage: string) {
  const [dirty, setDirty] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useUnsavedChangesWarning(dirty)

  const onSuccess = () => {
    setSubmitted(true)
    setDirty(false)
    toast.success(successMessage)
  }

  return {
    dirty,
    setDirty,
    submitted,
    setSubmitted,
    errors,
    setErrors,
    onSuccess,
  }
}
