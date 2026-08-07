import { Card, CardContent, CardHeader, CardTitle, SecondaryButton } from '@/components/ui/primitives'
import { formatCurrency } from '@/lib/utils'
import { purchaseOrderDetail, topSuppliers } from '@/features/purchasing/data/purchasing-data'
import { ApprovalTimeline } from '@/features/purchasing/components/approval-timeline'
import { PurchaseTimeline } from '@/features/purchasing/components/purchase-timeline'
import { ImportDocumentViewer } from '@/features/purchasing/components/import-document-viewer'
import { ShipmentTimeline } from '@/features/purchasing/components/shipment-timeline'
import { SupplierSummaryCard } from '@/features/purchasing/components/supplier-summary-card'

export function PurchaseOrderDetailsPage({ id }: { id: string }) {
  const detail = purchaseOrderDetail(id)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Purchase Order Details</CardTitle>
          <div className="flex flex-wrap gap-2">
            <SecondaryButton>Edit</SecondaryButton>
            <SecondaryButton onClick={() => window.confirm('Delete this purchase order?')}>Delete Confirmation</SecondaryButton>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">PO Number</p><p className="font-medium">{detail.number}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Approval Status</p><p className="font-medium">{detail.approvalStatus}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Status</p><p className="font-medium">{detail.status}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Supplier Information</p><p className="font-medium">{detail.supplier}</p><p className="text-xs text-muted-foreground">{detail.supplierInformation.contact}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Shipment Information</p><p className="font-medium">{detail.shipmentInformation.containerNumber}</p><p className="text-xs text-muted-foreground">ETA {detail.shipmentInformation.eta}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Payment Information</p><p className="font-medium">Outstanding {formatCurrency(detail.paymentInformation.outstandingBalance)}</p><p className="text-xs text-muted-foreground">{detail.paymentInformation.paymentMethod}</p></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Purchase Items / Taxes / Discounts</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {detail.items.map((item) => (
            <div key={item.item} className="flex items-center justify-between rounded-xl border border-border p-3">
              <p className="font-medium">{item.item}</p>
              <p className="text-sm text-muted-foreground">{item.qty} x {formatCurrency(item.unitPrice)}</p>
            </div>
          ))}
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Subtotal</p><p className="font-medium">{formatCurrency(detail.subtotal)}</p></div>
            <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Discount</p><p className="font-medium">{formatCurrency(detail.discount)}</p></div>
            <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Taxes</p><p className="font-medium">{formatCurrency(detail.taxes)}</p></div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <ApprovalTimeline items={detail.approvalHistory} />
        <PurchaseTimeline steps={detail.activityTimeline} />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <ImportDocumentViewer title="Attachments" documents={detail.attachments} />
        <ShipmentTimeline timeline={[
          { title: 'Approval', date: detail.date, status: detail.approvalStatus },
          { title: 'Shipment Planned', date: detail.shipmentInformation.etd, status: detail.shipmentInformation.currentStatus },
          { title: 'Delivery ETA', date: detail.shipmentInformation.eta, status: detail.shipmentInformation.currentStatus },
        ]} />
      </div>

      <SupplierSummaryCard
        supplier={detail.supplier}
        leadTime={topSuppliers[0].leadTime}
        rating={`${topSuppliers[0].rating}/5`}
        outstanding={formatCurrency(detail.paymentInformation.outstandingBalance)}
      />
    </div>
  )
}
