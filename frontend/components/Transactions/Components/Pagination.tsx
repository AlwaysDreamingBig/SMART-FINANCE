import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Showing {currentPage} to {totalPages} of 250 transactions
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => onPageChange(currentPage - 1)}>
          Previous
        </Button>
        <Button variant="outline" onClick={() => onPageChange(currentPage + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
