import type { PageDefinition } from '@/app/pages'

export type SalesPageProps = {
  page: PageDefinition
}

export type SalesRow = Record<string, string | number>

export type SalesKpi = {
  label: string
  value: string | number
  hint: string
}
