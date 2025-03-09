// components/QuickActions.tsx
import { FaFileImport } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { QrCode, Repeat, Tags } from "lucide-react";

export function QuickActions() {
  return (
    <div className="rounded-xl border bg-background p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline">
          <Repeat className="mr-2 size-4" />
          Create Recurring
        </Button>
        <Button variant="outline">
          <Tags className="mr-2 size-4" />
          Manage Tags
        </Button>
        <Button variant="outline">
          <FaFileImport className="mr-2 size-4" />
          Import CSV
        </Button>
        <Button variant="outline">
          <QrCode className="mr-2 size-4" />
          Scan Receipt
        </Button>
      </div>
    </div>
  );
}
