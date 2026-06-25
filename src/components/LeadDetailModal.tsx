import { motion } from 'framer-motion';
import { FiX, FiMail, FiPhone, FiCalendar, FiFileText } from 'react-icons/fi';
import { Lead } from '../utils/localStorage';

interface LeadDetailModalProps {
  lead: Lead;
  onClose: () => void;
  onEdit: () => void;
}

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  New: { bg: 'bg-primary/20', text: 'text-primary', border: 'border-primary/30' },
  Contacted: { bg: 'bg-warning/20', text: 'text-warning', border: 'border-warning/30' },
  Qualified: { bg: 'bg-accent/20', text: 'text-accent', border: 'border-accent/30' },
  Converted: { bg: 'bg-success/20', text: 'text-success', border: 'border-success/30' },
  Lost: { bg: 'bg-error/20', text: 'text-error', border: 'border-error/30' },
};

export const LeadDetailModal = ({ lead, onClose, onEdit }: LeadDetailModalProps) => {
  const colors = statusColors[lead.status];
  const initials = lead.name.split(' ').map((n) => n[0]).join('');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg backdrop-blur-xl bg-card border border-white/10 rounded-2xl overflow-hidden"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Header */}
        <div className="relative p-6 pb-24 bg-gradient-to-br from-primary/20 to-accent/20 border-b border-white/10">
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <FiX className="w-5 h-5" />
          </motion.button>

          <div className="flex items-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} border ${colors.border}`}>
              {lead.status}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-secondary">
              {lead.source}
            </span>
          </div>

          <div className="absolute -bottom-12 left-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-primary/30">
              {initials}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pt-16 pb-6">
          <h2 className="text-2xl font-bold text-text mb-1">{lead.name}</h2>
          <p className="text-secondary mb-6">{lead.company}</p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-secondary hover:text-text transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <FiMail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-secondary/70">Email</p>
                <p className="text-text">{lead.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-secondary hover:text-text transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <FiPhone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-secondary/70">Phone</p>
                <p className="text-text">{lead.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-secondary hover:text-text transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <FiCalendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-secondary/70">Created</p>
                <p className="text-text">{new Date(lead.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {lead.notes && (
              <div className="flex items-start gap-3 text-secondary hover:text-text transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <FiFileText className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-secondary/70">Notes</p>
                  <p className="text-text">{lead.notes}</p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <motion.button
              onClick={onEdit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
            >
              Edit Lead
            </motion.button>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-secondary hover:text-text hover:bg-white/10 transition-all"
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
