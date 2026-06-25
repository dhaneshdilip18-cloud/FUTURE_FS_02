import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  sourceFilter: string;
  onSourceChange: (source: string) => void;
}

const sources = ['All', 'Website', 'Facebook', 'Instagram', 'Google Ads', 'Referral', 'LinkedIn'];
const statuses = ['All', 'New', 'Contacted', 'Qualified', 'Converted', 'Lost'];

export const SearchFilter = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sourceFilter,
  onSourceChange,
}: SearchFilterProps) => {
  const hasFilters = statusFilter !== 'All' || sourceFilter !== 'All';

  const clearFilters = () => {
    onStatusChange('All');
    onSourceChange('All');
    onSearchChange('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row gap-4 mb-6"
    >
      {/* Search */}
      <div className="relative flex-1">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, email, or company..."
          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text placeholder-secondary/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-text transition-colors"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Status Filter */}
      <div className="relative">
        <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="pl-12 pr-8 py-3 bg-white/5 border border-white/10 rounded-xl text-text focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer min-w-[140px]"
        >
          {statuses.map((status) => (
            <option key={status} value={status} className="bg-card">
              {status}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <FiFilter className="w-4 h-4 text-secondary rotate-90" />
        </div>
      </div>

      {/* Source Filter */}
      <div className="relative">
        <select
          value={sourceFilter}
          onChange={(e) => onSourceChange(e.target.value)}
          className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer min-w-[140px]"
        >
          {sources.map((source) => (
            <option key={source} value={source} className="bg-card">
              {source}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters */}
      {hasFilters && (
        <motion.button
          onClick={clearFilters}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-3 bg-error/10 border border-error/30 rounded-xl text-error hover:bg-error/20 transition-colors flex items-center gap-2"
        >
          <FiX className="w-4 h-4" />
          Clear
        </motion.button>
      )}
    </motion.div>
  );
};
