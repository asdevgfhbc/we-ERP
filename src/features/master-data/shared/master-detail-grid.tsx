import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'

export function MasterDetailGrid({
  title,
  details,
}: {
  title: string
  details: Array<{ label: string; value: string | number }>
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {details.map((detail) => (
          <div key={detail.label} className="rounded-xl border border-border p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{detail.label}</p>
            <p className="mt-1 font-medium">{detail.value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
