import { useState, useMemo } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Transaction } from '../TransactionsPage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SmartSearchProps {
  transactions: Transaction[];
  onFilteredTransactions: (filtered: Transaction[]) => void;
}

export function SmartSearch({ transactions, onFilteredTransactions }: SmartSearchProps) {
  const [smartSearch, setSmartSearch] = useState('');

  const filteredTransactions = useMemo(() => {
    if (!smartSearch) return transactions;
    
    const lowerSearch = smartSearch.toLowerCase();
    const amountMatch = lowerSearch.match(/(over|above|under|below) (\$?\d+)/);
    const dateMatch = lowerSearch.match(/(today|yesterday|last week|this month)/);
    
    // Implement actual filter logic based on parsed terms
    const filtered = transactions.filter(t => 
      t.description.toLowerCase().includes(lowerSearch) ||
      t.category.toLowerCase().includes(lowerSearch)
    );

    onFilteredTransactions(filtered);
    return filtered;
  }, [transactions, smartSearch]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input 
        placeholder="Try 'Food expenses last week' or 'Income over $5000'..." 
        className="pl-8 pr-20" 
        value={smartSearch}
        onChange={(e) => setSmartSearch(e.target.value)}
      />
      <Button variant="ghost" size="sm" className="absolute right-2 top-2">
        <Sparkles className="h-4 w-4 mr-2" />
        AI Analyze
      </Button>
    </div>
  );
}