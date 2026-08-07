import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'
import { customsDutyRows } from '@/features/purchasing/data/purchasing-data'
import { ImportDocumentViewer } from '@/features/purchasing/components/import-document-viewer'
import { PurchaseTable } from '@/features/purchasing/components/purchase-table'

export function CustomsDutyPage() {
  return (
    <div className="space-y-4">
      <PurchaseTable
        title="Customs & Duty"
        rows={customsDutyRows}
        columns={[
          { key: 'reference', label: 'Record No' },
          { key: 'shipment', label: 'Shipment' },
          { key: 'broker', label: 'Broker' },
          { key: 'dutyAmount', label: 'Duty Amount', align: 'right' },
          { key: 'vat', label: 'VAT', align: 'right' },
          { key: 'taxes', label: 'Taxes', align: 'right' },
          { key: 'status', label: 'Customs Clearance' },
        ]}
      />
      <Card>
        <CardHeader><CardTitle>Customs Summary</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Broker</p><p className="font-medium">Alpine Brokers</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Documents</p><p className="font-medium">8 submitted</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Customs Clearance</p><p className="font-medium">In Progress</p></div>
        </CardContent>
      </Card>
      <ImportDocumentViewer title="Customs Documents" documents={['Bill of Lading', 'Commercial Invoice', 'Packing List', 'Certificate of Origin']} />
    </div>
  )
}
