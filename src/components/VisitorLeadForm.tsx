import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiBriefcase, FiFileText, FiSend, FiCheck, FiArrowRight } from 'react-icons/fi';
import { LoadingSpinner } from './LoadingSpinner';

interface VisitorLeadFormProps {
  onSubmit: (data: { name: string; email: string; phone: string; company: string; notes: string }) => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
}

export const VisitorLeadForm = ({ onSubmit, isLoading }: VisitorLeadFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.company.trim()) newErrors.company = 'Company is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = await onSubmit(formData);
    if (result.success) {
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', company: '', notes: '' });
      setTimeout(() => setSuccess(false), 3000);
    }
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
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto"
    >
      <div
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-glass"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-14 h-14 rounded-full bg-success/20 flex items-center justify-center mb-3"
              >
                <FiCheck className="w-7 h-7 text-success" />
              </motion.div>
              <p className="text-text font-medium text-center">Lead Submitted!</p>
              <p className="text-secondary text-sm mt-1 text-center">We'll be in touch soon.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-text">Get Started Today</h2>
                <p className="text-secondary text-sm mt-1">Submit your info and we'll contact you</p>
              </div>

              <div className="space-y-3">
                {/* Full Name */}
                <div>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`w-full pl-12 pr-4 py-2.5 bg-white/5 border ${
                        errors.name ? 'border-error' : 'border-white/10'
                      } rounded-xl text-text placeholder-secondary/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-sm`}
                      placeholder="Full Name *"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`w-full pl-12 pr-4 py-2.5 bg-white/5 border ${
                        errors.email ? 'border-error' : 'border-white/10'
                      } rounded-xl text-text placeholder-secondary/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-sm`}
                      placeholder="Email Address *"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={`w-full pl-12 pr-4 py-2.5 bg-white/5 border ${
                        errors.phone ? 'border-error' : 'border-white/10'
                      } rounded-xl text-text placeholder-secondary/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-sm`}
                      placeholder="Phone Number *"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.phone && <p className="text-error text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Company */}
                <div>
                  <div className="relative">
                    <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                      className={`w-full pl-12 pr-4 py-2.5 bg-white/5 border ${
                        errors.company ? 'border-error' : 'border-white/10'
                      } rounded-xl text-text placeholder-secondary/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-sm`}
                      placeholder="Company Name *"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.company && <p className="text-error text-xs mt-1">{errors.company}</p>}
                </div>

                {/* Notes */}
                <div>
                  <div className="relative">
                    <FiFileText className="absolute left-4 top-3 text-secondary" />
                    <textarea
                      value={formData.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                      rows={2}
                      className="w-full pl-12 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-text placeholder-secondary/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none text-sm"
                      placeholder="Tell us about your needs..."
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 bg-gradient-to-r from-success to-primary rounded-xl text-white font-semibold shadow-lg shadow-success/25 hover:shadow-success/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="border-white border-t-transparent" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    <span>Submit Lead</span>
                    <FiArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
