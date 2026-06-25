import { motion } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';

interface DeleteConfirmModalProps {
  leadName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal = ({ leadName, onConfirm, onCancel }: DeleteConfirmModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm backdrop-blur-xl bg-card border border-white/10 rounded-2xl overflow-hidden"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div className="p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-error/20 flex items-center justify-center mx-auto mb-4">
            <FiAlertTriangle className="w-8 h-8 text-error" />
          </div>

          <h3 className="text-xl font-semibold text-text mb-2">Delete Lead?</h3>
          <p className="text-secondary mb-6">
            Are you sure you want to delete <span className="text-text font-medium">{leadName}</span>? This action cannot be undone.
          </p>

          <div className="flex gap-3">
            <motion.button
              onClick={onCancel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-secondary hover:text-text hover:bg-white/10 transition-all"
            >
              Cancel
            </motion.button>
            <motion.button
              onClick={onConfirm}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 bg-error rounded-xl text-white font-semibold hover:bg-error/90 transition-all"
            >
              Delete
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
