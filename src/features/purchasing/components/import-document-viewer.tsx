import { Card, CardContent, CardHeader, CardTitle, SecondaryButton } from '@/components/ui/primitives'

export function ImportDocumentViewer({
  title,
  documents,
}: {
  title: string
  documents: string[]
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <SecondaryButton>Upload New</SecondaryButton>
      </CardHeader>
      <CardContent className="space-y-2">
        {documents.map((doc) => (
          <div key={doc} className="flex items-center justify-between rounded-xl border border-border p-3 text-sm">
            <span>{doc}</span>
            <SecondaryButton className="h-8 px-3">View</SecondaryButton>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
