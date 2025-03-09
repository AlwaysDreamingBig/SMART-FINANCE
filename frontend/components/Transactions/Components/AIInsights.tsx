import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AIInsights() {

  return (
    <div className="p-6 bg-background rounded-xl border shadow-sm">
      <h2 className="text-xl font-semibold mb-4">AI Insights</h2>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>Top Spending Category</span>
          <Badge variant="outline">Food & Dining</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span>Unusual Spending Detected</span>
          <Button variant="link" size="sm">
            Review
          </Button>
        </div>
      </div>
    </div>
  );
}