import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LeadForm } from '../components/LeadForm';
import { Lead, addLead } from '../utils/localStorage';

export const AddLead = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsSaving(true);
    addLead(data);
    setIsSaving(false);
    setTimeout(() => {
      navigate('/leads');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Add New Lead</h1>
        <p className="text-secondary mt-1">Fill in the details below to add a new lead to your CRM.</p>
      </div>

      <LeadForm onSubmit={handleSubmit} isLoading={isSaving} />
    </motion.div>
  );
};
