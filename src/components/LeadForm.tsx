import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiBriefcase, FiFileText, FiSave, FiRotateCcw, FiX } from 'react-icons/fi';
import { Lead } from '../utils/localStorage';
import { LoadingSpinner } from './LoadingSpinner';

interface LeadFormProps {
  initialData?: Lead | null;
  onSubmit: (data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void> | void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const sources = ['Website', 'Facebook', 'Instagram', 'Google Ads', 'Referral', 'LinkedIn'];
const statuses = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'];

export const LeadForm = ({ initialData, onSubmit, onCancel, isLoading = false }: LeadFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    source: 'Website',
    status: 'New',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        company: initialData.company,
        source: initialData.source,
        status: initialData.status,
        notes: initialData.notes,
      });
    }
  }, [initialData]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (formData.notes.length > 500) newErrors.notes = 'Notes must be under 500 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await onSubmit(formData);
    setSuccess(true);
    setTimeout(() => {
      handleReset();
      setSuccess(false);
    }, 1500);
  };

  const handleReset = () => {
    if (!initialData) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        source: 'Website',
        status: 'New',
        notes: '',
      });
    }
    setErrors({});
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
      style={{
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text">
          {initialData ? 'Edit Lead' : 'Add New Lead'}
        </h2>
        {onCancel && (
          <motion.button
            onClick={onCancel}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg bg-white/5 text-secondary hover:text-text transition-colors"
          >
            <FiX className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 p-3 bg-success/10 border border-success/30 rounded-xl text-success text-center"
        >
          {initialData ? 'Lead updated successfully!' : 'Lead added successfully!'}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">Full Name *</label>
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/70" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                errors.name ? 'border-error' : 'border-white/10'
              } rounded-xl text-text placeholder-secondary/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all`}
              placeholder="John Doe"
              disabled={isLoading}
            />
          </div>
          {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">Email Address *</label>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/70" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                errors.email ? 'border-error' : 'border-white/10'
              } rounded-xl text-text placeholder-secondary/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all`}
              placeholder="john@company.com"
              disabled={isLoading}
            />
          </div>
          {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">Phone Number *</label>
          <div className="relative">
            <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/70" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                errors.phone ? 'border-error' : 'border-white/10'
              } rounded-xl text-text placeholder-secondary/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all`}
              placeholder="(555) 123-4567"
              disabled={isLoading}
            />
          </div>
          {errors.phone && <p className="text-error text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">Company Name *</label>
          <div className="relative">
            <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/70" />
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                errors.company ? 'border-error' : 'border-white/10'
              } rounded-xl text-text placeholder-secondary/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all`}
              placeholder="Tech Corp Inc"
              disabled={isLoading}
            />
          </div>
          {errors.company && <p className="text-error text-xs mt-1">{errors.company}</p>}
        </div>

        {/* Lead Source */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">Lead Source</label>
          <select
            value={formData.source}
            onChange={(e) => handleChange('source', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
            disabled={isLoading}
          >
            {sources.map((source) => (
              <option key={source} value={source} className="bg-card">
                {source}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
            disabled={isLoading}
          >
            {statuses.map((status) => (
              <option key={status} value={status} className="bg-card">
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">Notes</label>
          <div className="relative">
            <FiFileText className="absolute left-4 top-4 text-secondary/70" />
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
              className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                errors.notes ? 'border-error' : 'border-white/10'
              } rounded-xl text-text placeholder-secondary/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none`}
              placeholder="Additional notes about this lead..."
              disabled={isLoading}
            />
          </div>
          {errors.notes && <p className="text-error text-xs mt-1">{errors.notes}</p>}
          <p className="text-xs text-secondary/70 mt-1">{formData.notes.length}/500</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="border-white border-t-transparent" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <FiSave className="w-4 h-4" />
                <span>{initialData ? 'Update Lead' : 'Save Lead'}</span>
              </>
            )}
          </motion.button>

          <motion.button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-secondary hover:text-text hover:bg-white/10 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <FiRotateCcw className="w-4 h-4" />
            Reset
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};
