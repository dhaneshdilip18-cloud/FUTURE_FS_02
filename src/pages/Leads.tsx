import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LeadTable } from '../components/LeadTable';
import { LeadForm } from '../components/LeadForm';
import { SearchFilter } from '../components/SearchFilter';
import { LeadDetailModal } from '../components/LeadDetailModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { Lead, updateLead, deleteLead } from '../utils/localStorage';

interface LeadsProps {
  leads: Lead[];
  refreshLeads: () => void;
}

export const Leads = ({ leads, refreshLeads }: LeadsProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        lead.name.toLowerCase().includes(searchLower) ||
        lead.email.toLowerCase().includes(searchLower) ||
        lead.company.toLowerCase().includes(searchLower) ||
        lead.phone.includes(searchQuery);
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      const matchesSource = sourceFilter === 'All' || lead.source === sourceFilter;

      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [leads, searchQuery, statusFilter, sourceFilter]);

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(null);
    setEditingLead(lead);
  };

  const handleDeleteLead = (lead: Lead) => {
    setLeadToDelete(lead);
  };

  const confirmDelete = () => {
    if (leadToDelete) {
      deleteLead(leadToDelete.id);
      setLeadToDelete(null);
      refreshLeads();
    }
  };

  const handleUpdateLead = async (data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingLead) {
      setIsSaving(true);
      updateLead(editingLead.id, data);
      setIsSaving(false);
      setEditingLead(null);
      refreshLeads();
    }
  };

  return (
    <div className="space-y-6">
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sourceFilter={sourceFilter}
        onSourceChange={setSourceFilter}
      />

      {editingLead ? (
        <div className="max-w-2xl">
          <LeadForm
            initialData={editingLead}
            onSubmit={handleUpdateLead}
            onCancel={() => setEditingLead(null)}
            isLoading={isSaving}
          />
        </div>
      ) : (
        <LeadTable
          leads={filteredLeads}
          onView={handleViewLead}
          onEdit={handleEditLead}
          onDelete={handleDeleteLead}
        />
      )}

      <AnimatePresence>
        {selectedLead && (
          <LeadDetailModal
            lead={selectedLead}
            onClose={() => setSelectedLead(null)}
            onEdit={() => handleEditLead(selectedLead)}
          />
        )}
        {leadToDelete && (
          <DeleteConfirmModal
            leadName={leadToDelete.name}
            onConfirm={confirmDelete}
            onCancel={() => setLeadToDelete(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
