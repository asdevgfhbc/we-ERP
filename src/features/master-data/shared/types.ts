import type { PageDefinition } from '@/app/pages'

export type MasterEntity = 'product' | 'category' | 'brand' | 'unit' | 'customer' | 'supplier' | 'warehouse'

export type MasterRow = Record<string, string | number>

export type TimelineEvent = {
  id: string
  date: string
  actor: string
  action: string
  description: string
  status: string
}

export type MasterField = {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'number' | 'date' | 'select' | 'textarea' | 'image' | 'file'
  required?: boolean
  options?: string[]
  placeholder?: string
}

export type MasterConfig = {
  entity: MasterEntity
  singularLabel: string
  pluralLabel: string
  listTitle: string
  columns: Array<{ key: string; label: string; align?: 'left' | 'center' | 'right' }>
  formFields: MasterField[]
}

export type MasterEntityPageProps = {
  page: PageDefinition
  entity: MasterEntity
}
