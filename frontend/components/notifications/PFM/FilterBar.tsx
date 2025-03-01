import { FunnelIcon } from "@heroicons/react/24/outline";

export const FilterBar = ({
  selectedCategory,
  setSelectedCategory,
  dateFilter,
  setDateFilter,
  searchQuery,
  setSearchQuery,
}: {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}) => {
  return (
    <div className="mb-6 flex items-center gap-6 rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <FunnelIcon className="size-5 text-gray-500" />
        <select
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="budget">Budget Alerts</option>
          <option value="investment">Investments</option>
          <option value="bill">Bills & Payments</option>
          <option value="security">Security</option>
        </select>

        <select
          className="filter-select"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="all">All Time</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <div className="max-w-md flex-1">
        <input
          type="text"
          placeholder="Search notifications..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};
