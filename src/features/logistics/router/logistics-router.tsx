import { useMemo, useState } from 'react'
import type { PageDefinition } from '@/app/pages'
import { SecondaryButton } from '@/components/ui/primitives'
import { LogisticsDashboardPage } from '@/features/logistics/pages/logistics-dashboard-page'
import { VehiclesPage } from '@/features/logistics/pages/vehicles-page'
import { VehicleDetailsPage } from '@/features/logistics/pages/vehicle-details-page'
import { DriversPage } from '@/features/logistics/pages/drivers-page'
import { DriverDetailsPage } from '@/features/logistics/pages/driver-details-page'
import { RoutePlanningPage } from '@/features/logistics/pages/route-planning-page'
import { DeliveriesPage } from '@/features/logistics/pages/deliveries-page'
import { DeliverySchedulingPage } from '@/features/logistics/pages/delivery-scheduling-page'
import { DeliveryStatusPage } from '@/features/logistics/pages/delivery-status-page'
import { VehicleMaintenancePage } from '@/features/logistics/pages/vehicle-maintenance-page'
import { FuelRecordsPage } from '@/features/logistics/pages/fuel-records-page'
import { TripHistoryPage } from '@/features/logistics/pages/trip-history-page'

function normalizeTitle(title: string) {
  return title.toLowerCase().trim()
}

const MATCHED_KEYS = [
  'logistics dashboard',
  'vehicles',
  'vehicle details',
  'drivers',
  'driver details',
  'route planning',
  'deliveries',
  'delivery scheduling',
  'delivery status',
  'vehicle maintenance',
  'fuel records',
  'trip history',
]

export function LogisticsRouter({ page }: { page: PageDefinition }) {
  const [selectedVehicleId, setSelectedVehicleId] = useState('VEH-0001')
  const [selectedDriverId, setSelectedDriverId] = useState('DRV-0001')
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

      {key === 'logistics dashboard' ? <LogisticsDashboardPage /> : null}
      {key === 'vehicles' ? <VehiclesPage onView={setSelectedVehicleId} /> : null}
      {key === 'vehicle details' ? <VehicleDetailsPage id={selectedVehicleId} /> : null}
      {key === 'drivers' ? <DriversPage onView={setSelectedDriverId} /> : null}
      {key === 'driver details' ? <DriverDetailsPage id={selectedDriverId} /> : null}
      {key === 'route planning' ? <RoutePlanningPage /> : null}
      {key === 'deliveries' ? <DeliveriesPage /> : null}
      {key === 'delivery scheduling' ? <DeliverySchedulingPage /> : null}
      {key === 'delivery status' ? <DeliveryStatusPage /> : null}
      {key === 'vehicle maintenance' ? <VehicleMaintenancePage /> : null}
      {key === 'fuel records' ? <FuelRecordsPage /> : null}
      {key === 'trip history' ? <TripHistoryPage /> : null}

      {MATCHED_KEYS.includes(key) ? null : <LogisticsDashboardPage />}
    </div>
  )
}
