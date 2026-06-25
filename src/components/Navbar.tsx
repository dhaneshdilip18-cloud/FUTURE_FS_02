import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiBell, FiUser, FiChevronDown, FiSettings, FiLogOut } from 'react-icons/fi';

interface NavbarProps {
  pageTitle?: string;
  user?: { email: string; name: string } | null;
  onLogout: () => void;
  onSearch: (query: string) => void;
}

const pageNames: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/leads': 'Leads',
  '/add-lead': 'Add Lead',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
};

export const Navbar = ({ user, onLogout, onSearch }: NavbarProps) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasNotification] = useState(true);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-16 bg-card/60 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30"
      style={{
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left - Page Title */}
        <h1 className="text-xl font-semibold text-text">
          {pageNames[location.pathname] || 'Dashboard'}
        </h1>

        {/* Right - Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search leads..."
              className="w-64 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-text placeholder-secondary/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all"
          >
            <FiBell className="w-5 h-5 text-secondary hover:text-text transition-colors" />
            {hasNotification && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-card animate-pulse" />
            )}
          </motion.button>

          {/* User Dropdown */}
          <div className="relative">
            <motion.button
              onClick={() => setShowDropdown(!showDropdown)}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <FiUser className="w-4 h-4 text-white" />
              </div>
              <span className="text-text text-sm font-medium hidden lg:block">
                {user?.name || 'Admin'}
              </span>
              <FiChevronDown className={`w-4 h-4 text-secondary transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-card backdrop-blur-xl border border-white/10 rounded-xl shadow-glass overflow-hidden"
                >
                  <div className="p-3 border-b border-white/5">
                    <p className="text-text font-medium">{user?.name || 'Admin'}</p>
                    <p className="text-secondary text-sm">{user?.email || 'admin@crm.com'}</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => setShowDropdown(false)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-secondary hover:bg-white/5 hover:text-text transition-colors"
                    >
                      <FiSettings className="w-4 h-4" />
                      <span className="text-sm">Settings</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-secondary hover:bg-error/10 hover:text-error transition-colors"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
