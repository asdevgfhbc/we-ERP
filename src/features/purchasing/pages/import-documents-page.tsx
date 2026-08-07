import { importDocumentRows } from '@/features/purchasing/data/purchasing-data'
import { ImportDocumentViewer } from '@/features/purchasing/components/import-document-viewer'
import { PurchaseTable } from '@/features/purchasing/components/purchase-table'

export function ImportDocumentsPage() {
  return (
    <div className="space-y-4">
      <ImportDocumentViewer
        title="Import Documents"
        documents={['Bill of Lading', 'Commercial Invoice', 'Packing List', 'Certificate of Origin', 'Insurance Documents']}
      />
      <PurchaseTable
        title="Import Document Register"
        rows={importDocumentRows}
        columns={[
          { key: 'reference', label: 'Reference' },
          { key: 'documentType', label: 'Document Type' },
          { key: 'container', label: 'Container Number' },
          { key: 'shipment', label: 'Shipment' },
          { key: 'status', label: 'Status' },
        ]}
      />
    </div>
  )
}
