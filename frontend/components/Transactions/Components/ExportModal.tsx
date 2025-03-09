import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface ExportModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  formats: string[];
  onExport: (format: string) => void;
  dateRange?: { start: Date; end: Date };
  columns?: Record<string, boolean>;
}

export function ExportModal({
  open,
  onOpenChange,
  formats,
  onExport,
  dateRange,
  columns,
}: ExportModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Transactions</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>File Format</Label>
            <div className="grid grid-cols-2 gap-2">
              {formats.map((format) => (
                <Button
                  key={format}
                  variant="outline"
                  onClick={() => onExport(format)}
                >
                  {format}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox id="includeAttachments" />
              <Label htmlFor="includeAttachments">
                Include Receipt Attachments
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="formatNumbers" defaultChecked />
              <Label htmlFor="formatNumbers">Format Numbers</Label>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
