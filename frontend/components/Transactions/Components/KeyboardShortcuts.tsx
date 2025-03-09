import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from "@/components/ui/dialog";


export function KeyboardShortcuts() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="fixed bottom-4 right-4">
          ⌘K
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Keyboard Shortcuts</DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-muted rounded">⌘</kbd> + 
            <kbd className="px-2 py-1 bg-muted rounded">N</kbd>
            <span>New Transaction</span>
          </div>
          {/* Add more shortcuts */}
        </div>
      </DialogContent>
    </Dialog>
  );
}