import { ShieldCheck, SlidersHorizontal, BellRing, Building2, Save } from 'lucide-react'
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Input, SecondaryButton, Select } from '@/components/ui/primitives'

type ModuleSettingsPageProps = {
  moduleName: string
}

export function ModuleSettingsPage({ moduleName }: ModuleSettingsPageProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="inline-flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            {moduleName} Settings
          </CardTitle>
          <Badge>Department-level Configuration</Badge>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              Branch Scope
            </span>
            <Select defaultValue="all-branches">
              <option value="all-branches">All Branches</option>
              <option value="head-office">Head Office</option>
              <option value="branch-a">Branch A</option>
              <option value="branch-b">Branch B</option>
            </Select>
          </label>

          <label className="space-y-2 text-sm">
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <BellRing className="h-4 w-4" />
              Alert Level
            </span>
            <Select defaultValue="standard">
              <option value="minimal">Minimal</option>
              <option value="standard">Standard</option>
              <option value="strict">Strict</option>
            </Select>
          </label>

          <label className="space-y-2 text-sm md:col-span-2">
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="h-4 w-4" />
              Approval Rule
            </span>
            <Input placeholder={`${moduleName} approval threshold / workflow rule`} />
          </label>

          <div className="flex flex-wrap gap-2 md:col-span-2">
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Settings
            </Button>
            <SecondaryButton>Reset</SecondaryButton>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
