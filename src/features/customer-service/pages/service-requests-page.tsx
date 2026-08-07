import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { serviceRequestRows } from '@/features/customer-service/data/customer-service-data'

export function ServiceRequestsPage() {
  return (
    <PurchaseTable
      title="Service Requests"
      rows={serviceRequestRows}
      columns={[
        { key: 'reference', label: 'Request No' },
        { key: 'customer', label: 'Customer' },
        { key: 'serviceType', label: 'Service Type' },
        { key: 'date', label: 'Date' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
