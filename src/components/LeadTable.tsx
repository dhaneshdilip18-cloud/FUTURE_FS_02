import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiTrash2, FiEye, FiChevronLeft, FiChevronRight, FiUser } from 'react-icons/fi';
import { Lead } from '../utils/localStorage';

interface LeadTableProps {
  leads: Lead[];
  onView: (lead: Lead) => void;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

const ITEMS_PER_PAGE = 5;

const statusColors: Record<string, string> = {
  New: 'bg-primary/20 text-primary',
  Contacted: 'bg-warning/20 text-warning',
  Qualified: 'bg-accent/20 text-accent',
  Converted: 'bg-success/20 text-success',
  Lost: 'bg-error/20 text-error',
};

export const LeadTable = ({ leads, onView, onEdit, onDelete }: LeadTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(leads.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedLeads = leads.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (leads.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
          <FiUser className="w-10 h-10 text-secondary/50" />
        </div>
        <h3 className="text-xl font-semibold text-text mb-2">No leads found</h3>
        <p className="text-secondary">Try adjusting your filters or add a new lead.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
      style={{
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider hidden lg:table-cell">Phone</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider hidden xl:table-cell">Company</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Source</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-secondary uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <AnimatePresence mode="wait">
              {paginatedLeads.map((lead, index) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-medium text-sm">
                        {lead.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-text font-medium">{lead.name}</p>
                        <p className="text-secondary text-sm lg:hidden">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-secondary hidden lg:table-cell">{lead.email}</td>
                  <td className="px-6 py-4 text-secondary hidden lg:table-cell">{lead.phone}</td>
                  <td className="px-6 py-4 text-secondary hidden xl:table-cell">{lead.company}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-white/5 rounded-lg text-secondary text-sm">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onView(lead)}
                        className="p-2 rounded-lg bg-white/5 text-secondary hover:text-text hover:bg-white/10 transition-all"
                      >
                        <FiEye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onEdit(lead)}
                        className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onDelete(lead)}
                        className="p-2 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-all"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
          <p className="text-secondary text-sm">
            Showing {startIndex + 1} - {Math.min(startIndex + ITEMS_PER_PAGE, leads.length)} of {leads.length}
          </p>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/5 text-secondary hover:text-text hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <FiChevronLeft className="w-4 h-4" />
            </motion.button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'bg-white/5 text-secondary hover:text-text hover:bg-white/10'
                }`}
              >
                {page}
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/5 text-secondary hover:text-text hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <FiChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
};
