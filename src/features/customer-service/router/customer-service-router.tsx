import { useMemo, useState } from 'react'
import type { PageDefinition } from '@/app/pages'
import { SecondaryButton } from '@/components/ui/primitives'
import { CustomerServiceDashboardPage } from '@/features/customer-service/pages/customer-service-dashboard-page'
import { ComplaintsPage } from '@/features/customer-service/pages/complaints-page'
import { ComplaintDetailsPage } from '@/features/customer-service/pages/complaint-details-page'
import { ReturnsPage } from '@/features/customer-service/pages/returns-page'
import { WarrantyClaimsPage } from '@/features/customer-service/pages/warranty-claims-page'
import { ServiceRequestsPage } from '@/features/customer-service/pages/service-requests-page'
import { CustomerTimelinePage } from '@/features/customer-service/pages/customer-timeline-page'

function normalizeTitle(title: string) {
  return title.toLowerCase().trim()
}

const MATCHED_KEYS = [
  'customer service dashboard',
  'complaints',
  'complaint details',
  'returns',
  'warranty claims',
  'service requests',
  'customer timeline',
]

export function CustomerServiceRouter({ page }: { page: PageDefinition }) {
  const [selectedId, setSelectedId] = useState('CMP-0001')
  const key = useMemo(() => normalizeTitle(page.title), [page.title])

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">{page.title}</h1>
          <p className="text-sm text-muted-foreground">{page.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <SecondaryButton>Export</SecondaryButton>
          <SecondaryButton>Print</SecondaryButton>
          <button className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground" type="button">
            Add New
          </button>
        </div>
      </div>

      {key === 'customer service dashboard' ? <CustomerServiceDashboardPage /> : null}
      {key === 'complaints' ? <ComplaintsPage onView={setSelectedId} /> : null}
      {key === 'complaint details' ? <ComplaintDetailsPage id={selectedId} /> : null}
      {key === 'returns' ? <ReturnsPage /> : null}
      {key === 'warranty claims' ? <WarrantyClaimsPage /> : null}
      {key === 'service requests' ? <ServiceRequestsPage /> : null}
      {key === 'customer timeline' ? <CustomerTimelinePage id={selectedId} /> : null}

      {MATCHED_KEYS.includes(key) ? null : <CustomerServiceDashboardPage />}
    </div>
  )
}
